// 9.2.4 new version from 9.1
const generatePage = (name, github) => {
    return `
    <!DOCTYPE html>
    <hmtl lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv-"X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    </head>

    <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};
module.exports = generatePage; //module.exports makes it available to other files. and use generatePage() = require('file path') on the other page.