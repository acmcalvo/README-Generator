const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generateMarkdown');



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

const promptProject = portfolioData => {


  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
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

promptProject()
  .then(portfolioData => {
    var pageHTML = generatePage(portfolioData);
    return writeFile(pageHTML);
  })
  
