//const fs = require('fs');
const inquirer = require('inquirer');
//const generatePage = require('./src/page-template');

//module.exports is reassigned to this variable (generatePage)
//holds the user command-line arguements
// const profileDataArgs = process.argv.slice(2, process.argv.length);

//const pageHTML = generatePage(name, github);
//replace above with this one(assignment destructuring) //
//const [name, github] = profileDataArgs;

//fs.writeFile('./index.html', pageHTML, err => {
//if (err) throw err;

// fs.writeFile('index.html', generatePage(name, github), err => { //
//     if (err) throw err; //

//    console.log('Portfolio complete! Check out index.html to see the output!') //
//});

inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'what is your name?'
    }])
    .then(answers => console.log(answers));