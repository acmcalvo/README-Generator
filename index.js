

// require modules 
const fs = require('fs'); 
const inquirer = require('inquirer'); 

// linking to page where the README is developed 
const generatePage = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = () => {
  // using inquirer to prompt questions to user 
  return inquirer.prompt([
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
        name: 'projectName',
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
        message: ('What does the user need to know about contributing to the repo?'),
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter about contributing');
            return false;
          }
        }
      },

    
  
    ])
 
};



// function to write README file using file system 
const writeFile = data => {
  // fs.writeFile('./dist/README.md', data, err => {
    fs.writeFile('README.md', data, err => {
      // if there is an error 
      if (err) {
          console.log(err);
          return;
      // when the README has been created 
      } else {
          console.log("Your README has been successfully created!")
      }
  })
}; 

// function call to initialize program
questions()
// getting user answers 
.then(answers => {
  return generatePage(answers);
})
// using data to display on page 
.then(data => {
  return writeFile(data);
})
// catching errors 
.catch(err => {
  console.log(err)
})
  
