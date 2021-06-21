//const fs = require('fs'); replaced with const generateSite = require('.utils/generate-site.js'); this will import the exported object from generate-site.js, allowing us to use gerenateSite.writeFile() & gerenateSite.copyFile().
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site'); //9.5.6

const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
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

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: nameInput => {
                    if (nameInput) {
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
                validate: descriptionInput => {
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
                validate: linkInput => {
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
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};
//callback functions inside of callback functions, bottom looks much cleaner.
// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./index.html', pageHTML, err => {
//             if (err) throw new Error(err);

//             console.log('Page created! Check out index.html in this directory to see it!');
//         });
//     });
//9.5.3 refactoring current fs functionality (promise chain)
promptUser() //asking user for their info with inquirer prompts; this returns all data as an object in a promise
    .then(promptProject) //captures returning data from user
    .then(portfolioData => {
        return generatePage(portfolioData); //each project will be pushed into a projects array in the collection of portfolio information
    })
    .then(pageHTML => { //when we're done the final set of data is returned to the this .then
        return writeFile(pageHTML); //finished portfolio data object is returned as portfolioData and sent into the generatePage() fucntion, which will return the finished HTML template code into the pageHTML
    })
    .then(writeFileResponse => { //pass pageHTML into newly created writeFile() 
        console.log(writeFileResponse);
        return copyFile(); //which returns a promise. 
    })
    .then(copyFileResponse => { //promise is retunred into this .then method
        console.log(copyFileResponse); //successful file creating
    })
    .catch(err => { //promise returned by copyFile() then lets us know if the css file was copied succesfully and if so we're all done.
        console.log(err);
    });

//remove the index.html file at the root of directory since we have the full application in the dist directory. you dont need it anymore.