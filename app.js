const fs = require('fs');
//module.exports is reassigned to this variable (generatePage)
const generatePage = require('./src/page-template.js');
//holds the user command-line arguements
const profileDataArgs = process.argv.slice(2, process.argv.length);
//replace above with this one(assignment destructuring) //
const [name, github] = profileDataArgs;

//const pageHTML = generatePage(name, github);
//fs.writeFile('./index.html', pageHTML, err => {
//if (err) throw err;

fs.writeFile('index.html', generatePage(name, github), err => { //
    if (err) throw err; //

    console.log('Portfolio complete! Check out index.html to see the output!') //
});