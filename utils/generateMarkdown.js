// function to generate markdown for README
function renderbadge(license, github, projectName){
  if (license) {
    return `<img src='https://img.shields.io/github/license/${github}/${projectName}' >`
  }
}




const generateMarkdown = data => {
  return `
${renderbadge(data.license, data.name, data.projectName )}

  # ${data.projectName}

 
  
  
  
  ## Table of Contents
  * [Description](#description)
  * [License](#license)
  * [Install](#install)
  * [Tests](#run)
  * [Repository](#usingRepo)
  * [Contributing](#contributing)
  
  ## Description
  ${data.description}

  
  ## License 
  This project is license under ${data.license}
 
  ## Tests
  ${data.run}

  ## Contributing 
  ${data.contributing}

  ## Questions
  If you have any questions about this projects, please contact me directly at ${data.email}. 
  You can view more of my projects at https://github.com/${data.name}.
`;
}


// use for importing Markdown in index 
module.exports = generateMarkdown;