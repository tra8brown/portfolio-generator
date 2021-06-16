const fs = require('fs');
const generatePage = require('./src/page-template.js'); //module.exports is reassigned to this variable (generatePage)
const profileDataArgs = process.argv.slice(2, process.argv.length); //holds the user command-line arguements

const [name, github] = profileDataArgs; //replace above with this one(assignment destructuring) //



fs.writeFile('index.html', generatePage(name, github), err => { //
    if (err) throw err; //

    console.log('Portfolio complete! Check out index.html to see the output!') //
});