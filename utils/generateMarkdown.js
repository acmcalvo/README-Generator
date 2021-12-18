// function to generate markdown for README
const generateMarkdown = data => {
  return `
  # ${data.projectName}

  # ${data.license}
  ![Github license](http://img.shields.io/badge/license- ${data.license}-blue.svg)
  
  
  
  ## Description 
  ${data.description}
  ## Table of Contents
  * [Description(#description)
  * [License](#license)
  * [Install](#install)
  * [Tests](#run)
  * [Repo](#usingRepo)
  * [Contributing](#contributing)
  
  ## Description
  ${data.description}

  ## License
  ${data.license}

  ## License 
  This project is license under ${data.license}
 
  ## Tests
  ${data.run}

  ## Contributing 
  ${data.contributing}

  ## Questions
  If you have any questions about this projects, please contact me directly at ${data.email}. You can view more of my projects at https://github.com/${data.name}.
`;
}


// use for importing Markdown in index 
module.exports = generateMarkdown;