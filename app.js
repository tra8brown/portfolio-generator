const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);
//notice the lack of parentheses around the 'profileDataArr' paramenter?
const printProfileData = profileDataArr => {
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }
};

printProfileData(profileDataArgs);