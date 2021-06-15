const profileDataArgs = process.argv.slice(2, process.argv.length); //holds the user command-line arguements
const name = profileDataArgs[0];
const github = profileDataArgs[1];
// 9.1 reference 
// //notice the lack of parentheses around the 'profileDataArr' paramenter?
// const printProfileData = profileDataArr => {
//                                 //this.....
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('=======================');
//                                 //is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profile.Item));
// };
// printProfileData(profileDataArgs);
console.log(name, github); //9.2.4 
console.log(generatePage(name, github)); //9.2.4 with two command-line arguements
const [name, github] = profileDataArgs; //replace above with this one(assignment destructuring)

// 9.2.4 using template literals we wrap the string in `backticks` and interpolate the variables w/ ${} syntax
// const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`; //function returns a string
// console.log(generatePage('jane', 'janehub'));

// 9.2.4 new version from above
const generatePage = (userName, githubName) => {
    return `
      Name: ${userName}
      GitHub: ${githubName}
    `;
};