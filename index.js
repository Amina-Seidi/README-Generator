const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util")
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
  return inquirer.prompt([
      {
          type: "input",
          name: "title",
          message: "What's the name of the project?"
      },
      {
          type: "input",
          name: "description",
          message: "Please describe the project."
      },
      {
          type: "input",
          name : "installation",
          message: "What are the installation instructions for this project? If NONE write instructions"
      },
      {
          type: "input",
          name: "usage",
          message: "How would you like your application to be used?"
      },
      {
          type: "checkbox",
          name: "license",
          message: "Select the license for your project?",
          choices: [
              "apache-2.0",
              "gpl-3.0",
              "mit",
              "mpl-2.0",
              "osl-3.0",
              "unlicense"
          ]
      },
      {
          type: "input",
          name:"contribution",
          message: "Who contributed to your project?"
      },
      {
          type: "input",
          name: "tests",
          message: "How should your project be tested?"
      },
      {
          type: "input",
          name: "username",
          message: "What's your GitHub username?"
      },
      {
          type: "input",
          name: "email",
          message: "What is your GitHub email for questions and feedback? "
      }
  ])
}


function generateMarkdown(response){
  return `
 # ${response.title}

 # Table of Contents

 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Contributions](#contribution)
 - [Test](#test)
 - [Credits](#credits)
 - [License](#license)
 - [Questions](#questions)

 ## Description:
 ![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")

  ${response.description}
 ## Installation:
    ${response.installation}
 ## Usage:
    ${response.usage}
 ## Contributions:
    ${response.contribution}
 ## Test:
    ${response.test}
 ## Credits:
    ${response.credits}
 ## License:
  For more innformation about the License, click on the link below.

- [License](https://opensource.org/licenses/${response.license})

## Questions:
    For questions about the Generator you can go to my Github page at the following Link:

- [Github Profile](https:github.com/${response.username})

For additional questions please reach out to my email at: ${response.email}.`; 
}

//Initialize program 
async function init(){
    try {
      const response = await promptUser();

      const readMe = generateMarkdown(response);

      await writeFileAsync("README.md", readMe);
      console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

init();