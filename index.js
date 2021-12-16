const fs = require('fs');
const inquirer = require('inquirer');
const showReadme = require('./src/page-template.js');
// const { writeFile, copyFile } = require('./utils/generateMarkdown');



const promptUser = () => {
  return inquirer.prompt([
    {
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
    { //checkbox that allows license choice
      type: 'checkbox',
      name: 'license',
      message: 'Please choose a license.',
      choices: [ 'MIT License', 'GNU GPLv3',
         'Apache License 2.0', 
       ],
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please select a license.');
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
var portfolioData = []

const promptProject = portfolioData => {


  // If there's no 'projects' array property, create one
  if (!portfolioData) {
    portfolioData = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is Github username?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter your Github username!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address',
        validate: emailAddressInput => {
          if (emailAddressInput) {
            return true;
          } else {
            console.log('You need to enter a email address!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'ProjectName',
        message: 'What is your projects name?)',
        validate: linkInput => {
          if (linkInput) {
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
        message: 'Please write a short description of your project',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter short description of your project');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'license',
        message: 'What kind of license should your project have?',
        choices: ['MIT License', 'GNU GPLv3', 'Apache License']
      },
      {
        type: 'input',
        name: 'install',
        message: 'What command should run to install dependencies?',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter install dependencies');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'run',
        message: 'What command should run to run test?',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter run command');
            return false;
          }
        }
      },

      {
        type: 'input',
        name: 'usingRepo',
        message: 'What does the user need to know about to using the repo?',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to need to know user');
            return false;
          }
        }
        
      },

      {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter about contributing');
            return false;
          }
        }
      },

      {
        type: 'input',
        name: 'questions',
        message: 'Do you have any questions?',
      }

  
    ])
    .then(projectData => {
      portfolioData.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// writing files
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/readme.md', fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  });
};

// copying file
const copyFile = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile('./src/style.css', './dist/style.css', err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Stylesheet created!'
      });
    });
  });
};

// module.exports = { writeFile, copyFile };


promptProject()
  .then(portfolioData => {
    var pageHTML = generatePage(portfolioData);
    return writeFile(pageHTML);
  })
  
