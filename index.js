const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "Project title"
    },
    {
        type: "input",
        name: "description",
        message: "Project description"
    },
    {
        type: "input",
        name: "installation",
        message: "Project installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Usage information"
    },
    {
        type: "input",
        name: "license",
        message: "License"
    },
    {
        type: "input",
        name: "contributing",
        message: "Contribution guidelines"
    },
    {
        type: "input",
        name: "test",
        message: "Test instructions"
    }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, (err) =>
            err ? console.error(err) : console.log('Commit logged!')
    );
}

// function to initialize program
function init() {
    inquirer
        .prompt(
            /* Pass your questions in here */
            questions
        )
        .then((answers) => {
            // Use user feedback for... whatever!!
            console.log(answers);

            let objSize = Object.objsize(answers);

            // Write the Title of my project
            writeToFile('README.md', `# ${answers.title}\n\n`);

            // Project Description
            writeToFile('README.md', '## Description\n');
            writeToFile('README.md', `${answers.description}\n\n`);

            // Table of Content
            //writeToFile('README.md', `# ${answers.title}\n\n`);

            // Installation instructions
            writeToFile('README.md', '## Installation\n');
            writeToFile('README.md', `${answers.installation}\n\n`);

            // Usage
            writeToFile('README.md', '## Usage\n');
            writeToFile('README.md', `${answers.usage}\n\n`);
        });
}

// function call to initialize program
init();
