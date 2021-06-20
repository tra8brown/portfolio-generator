// 9.2.4 new version from 9.1
module.exports = templateData => {
    console.log(templateData);

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
    <h1>${templateData.name}</h1>
    <h2><a href="https://github.com/${templateData.github}">Github</a></h2>
    </body>
    </html>
    `;
};
module.exports = generatePage; //module.exports makes it available to other files. and use generatePage() = require('file path') on the other page.