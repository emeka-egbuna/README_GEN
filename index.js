//const fs = require("fs");
import { open, close, appendFile } from 'node:fs';
//const path = require('path');
//const inquirer = require("inquirer");
import inquirer from 'inquirer';
//const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "Project title"
    },
    {
        type: "editor",
        name: "description",
        message: "Project description"
    },
    {
        type: "editor",
        name: "toc",
        message: "Table of Contents"
    },
    {
        type: "editor",
        name: "installation",
        message: "Project installation instructions"
    },
    {
        type: "editor",
        name: "usage",
        message: "Usage information"
    },
    {
        type: "list",
        name: "license",
        message: "License",
        choices: ['Apache', 'GPL', 'LGPL', 'ISC', 'BSD', 'MIT', 'CC', 'Eclipse', 'Unlicense', 'Zlib']
    },
    {
        type: "editor",
        name: "contributing",
        message: "Contribution guidelines"
    },
    {
        type: "editor",
        name: "test",
        message: "Test instructions"
    },
    {
        type: "input",
        name: "questions",
        message: "Enter your GitHub username"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email ID"
    }
];

function closeFd(fd) {
    close(fd, (err) => {
      if (err) throw err;
    });
}

// function to write README file
const writeToFile = (file, data) => {
    open(file, 'a', (err, fd) => {
        if (err) throw err;
      
        try {
          appendFile(fd, data, 'utf8', (err) => {
            closeFd(fd);
            if (err) throw err;
          });
        } catch (err) {
          closeFd(fd);
          throw err;
        }
      });

    //    fs.appendFile(file, data, (err) =>
//            err ? console.error(err) : console.log('Commit logged!')
//    );
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
            //console.log(answers);

            //let objSize = Object.objsize(answers);

            // Write the Title of my project
            writeToFile('README.md', `# ${answers.title}\n\n`);

            // License badges
            licenseChooser(answers.license);

            // Project Description
            writeToFile('README.md', '## Description\n');
            writeToFile('README.md', `${answers.description}\n\n`);

            // Table of Contents
            writeToFile('README.md', '## Table of Contents\n');
            writeToFile('README.md', `${answers.toc}\n\n`);

            // Installation instructions
            writeToFile('README.md', '## Installation\n');
            writeToFile('README.md', `${answers.installation}\n\n`);

            // Usage
            writeToFile('README.md', '## Usage\n');
            writeToFile('README.md', `${answers.usage}\n\n`);

            // License notice
            licenseNotice(answers.license);

            // Contributing
            writeToFile('README.md', '## How to Contribute\n');
            writeToFile('README.md', `${answers.contributing}\n\n`);

            // Tests
            writeToFile('README.md', '## Tests\n');
            writeToFile('README.md', `${answers.test}\n\n`);

            // Questions
            writeToFile('README.md', '## Questions\n');
            writeToFile('README.md', `https://www.github.com/${answers.questions}\n\n`);

            // Questions email
            writeToFile('README.md', `${answers.email}\n\n`);
        });
}

/*
 * Function explains which license the application is covered under
 */
const licenseChooser = (license) => {
    writeToFile('README.md', '## Badges\n');
                    
    switch(license) {
        case 'Apache': writeToFile('README.md', '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n');
                    break;
        case 'GPL': writeToFile('README.md', '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n');
                    break;
        case 'LGPL': writeToFile('README.md', '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)\n\n');
                    break;
        case 'ISC': writeToFile('README.md', '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)\n\n');
                    break;
        case 'BSD': writeToFile('README.md', '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)\n\n');
                    break;
        case 'MIT': writeToFile('README.md', '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n');
                    break;
        case 'CC': writeToFile('README.md', '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)\n\n');
                    break;
        case 'Eclipse': writeToFile('README.md', '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)\n\n');
                    break;
        case 'Unlicense': writeToFile('README.md', '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)\n\n');
                    break;
        case 'Zlib': writeToFile('README.md', '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)\n\n');
                    break;
        default: break;
    }
}

/*
 * Function explains which license the application is covered under
 */
const licenseNotice = (license) => {
    writeToFile('README.md', '## License\n');
                    
    switch(license) {
        case 'Apache': writeToFile('README.md', '**Apache 2.0 License **\n The Apache 2.0 license is a particular type of open-source, permissive software license that ensures that end-users are granted a license to any patent that is covered by the software in question. An Apache 2.0 license ensures the security and availability of safe and powerful open-source software.\n\n');
                    break;
        case 'GPL': writeToFile('README.md', '**GNU GPL v3** \n The GNU General Public License (GNU GPL or simply GPL) is a series of widely used free software licenses or copyleft that guarantee end users the four freedoms to run, study, share, and modify the software.[7] The license was the first copyleft for general use and was originally written by Richard Stallman, the founder of the Free Software Foundation (FSF), for the GNU Project. The license grants the recipients of a computer program the rights of the Free Software Definition.[8] These GPL series are all copyleft licenses, which means that any derivative work must be distributed under the same or equivalent license terms. It is more restrictive than the Lesser General Public License and even further distinct from the more widely used permissive software licenses BSD, MIT, and Apache.\n\n');
                    break;
        case 'LGPL': writeToFile('README.md', '**GNU LGPL v3** \n The GNU Lesser General Public License (LGPL) is a free-software license published by the Free Software Foundation (FSF). The license allows developers and companies to use and integrate a software component released under the LGPL into their own (even proprietary) software without being required by the terms of a strong copyleft license to release the source code of their own components. However, any developer who modifies an LGPL-covered component is required to make their modified version available under the same LGPL license. For proprietary software, code under the LGPL is usually used in the form of a shared library, so that there is a clear separation between the proprietary and LGPL components. The LGPL is primarily used for software libraries, although it is also used by some stand-alone applications.\n\n');
                    break;
        case 'ISC': writeToFile('README.md', '**ISC License (ISC)** \n The ISC license is a permissive free software license published by the Internet Software Consortium, now called Internet Systems Consortium (ISC). It is functionally equivalent to the simplified BSD and MIT licenses, but without language deemed unnecessary following the Berne Convention.\n\n');
                    break;
        case 'BSD': writeToFile('README.md', '**BSD 2-Clause License** \n The Simplified BSD (or BSD 2-clause) license is the simplest BSD license. A licensee of BSD-licensed software can: Use, copy and distribute the unmodified source or binary forms of the licensed program.\n\n');
                    break;
        case 'MIT': writeToFile('README.md', '**The MIT License** \n Users of software using an MIT License are permitted to use, copy, modify, merge publish, distribute, sublicense and sell copies of the software.\n\n');
                    break;
        case 'CC': writeToFile('README.md', '**Creative Commons** \n A Creative Commons (CC) license is one of several public copyright licenses that enable the free distribution of an otherwise copyrighted "work". A CC license is used when an author wants to give other people the right to share, use, and build upon a work that the author has created. CC provides an author flexibility (for example, they might choose to allow only non-commercial uses of a given work) and protects the people who use or redistribute an author\'s work from concerns of copyright infringement as long as they abide by the conditions that are specified in the license by which the author distributes the work.\n\n');
                    break;
        case 'Eclipse': writeToFile('README.md', '**Eclipse Public License 1.0** \n The Eclipse Public License (EPL) is a free and open source software license most notably used for the Eclipse IDE and other projects by the Eclipse Foundation. It replaces the Common Public License (CPL) and removes certain terms relating to litigations related to patents.\n\n The Eclipse Public License is designed to be a business-friendly free software license, and features weaker copyleft provisions than licenses such as the GNU General Public License (GPL). The receiver of EPL-licensed programs can use, modify, copy and distribute the work and modified versions, in some cases being obligated to release their own changes.\n\n');
                    break;
        case 'Unlicense': writeToFile('README.md', '**The Unlicense** \n The Unlicense is a public domain equivalent license for software which provides a public domain waiver with a fall-back public-domain-like license, similar to the CC Zero for cultural works. It includes language used in earlier software projects and has a focus on an anti-copyright message.\n\n');
                    break;
        case 'Zlib': writeToFile('README.md', '**The zlib/libpng License** \n The zlib license is a permissive free software license which defines the terms under which the zlib software library can be distributed. It is also used by many other free software packages. The libpng library uses a similar license sometimes referred interchangeably as zlib/libpng license.\n\n The zlib license has been approved by the Free Software Foundation (FSF) as a free software license, and by the Open Source Initiative (OSI) as an open source license. It is compatible with the GNU General Public License.\n\n');
                    break;
        default: break;
    }
}

// function call to initialize program
init();
