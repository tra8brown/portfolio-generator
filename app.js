const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => { //validate receives an arguement: nameInput
                if (nameInput) { //conditional
                    return true;
                } else {
                    console.log('Please enter your name!'); //if question is skipped it will trigger this response
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => { //validate recieves an arguement: githubInput
                if (githubInput) { //conditional
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm', // 9.3.6 asks the user if they'd like to add an About section
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input', //this is like the validate method but instead of passing the value entered for the above question(as a parameter) it passes an object of all the answers given so far.
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);

    // 9.3.5 If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: nameInput => { //validate receives an arguement: nameInput
                    if (nameInput) { //conditional
                        return true;
                    } else {
                        console.log('You need to enter a project name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => { //validate receives an arguement: descriptionInput
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('You need to enter a project description!');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you this project with? (Check all that apply)',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHub link to your project. (Required)',
                validate: linkInput => { //validate receives an arguement: linkInput
                    if (linkInput) {
                        return true;
                    } else {
                        console.log('You need to enter a project GitHub link!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
        ])

    .then(projectData => { //callback
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) { //condition. eval user resp if they wish to add more projects.
            return promptProject(portfolioData); //if user wishes to add more, this will evaluate to true and call this promptProject(portfolioData) function.
        } else { //if user decides to not add, this will evalute to false and trigger this statement.
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
        const pageHTML = generatePage(portfolioData);

        // fs.writeFile('./index.html', pageHTML, err => {
        //   if (err) throw new Error(err);

        //   console.log('Page created! Check out index.html in this directory to see it!');
        // });
    });
// will be uncommented in lesson 4
// const pageHTML = generatePage(portfolioData);
// });
//});