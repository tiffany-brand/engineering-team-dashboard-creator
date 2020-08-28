const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const questions = require('./lib/questions');
const containers = require('./lib/containers');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// array to store employee objects as they are created
const employees = [];

// function to prompt user - returns answers object
const promptUser = (type) => {
	return inquirer.prompt(questions[type]);
};

// function to write team html document in the output folder
const writeOutput = (page) => {
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR);
	}
	fs.writeFileSync(outputPath, page);
	console.log("Team file generated in output folder");
}

// function to ask user what employee to add next, and prompt to create that employee object
const askForNext = () => {
	return promptUser('nextEmp').then((answer) => {
		if (answer.role === 'Engineer') {
			promptUser('engineer').then((emp) => {
				const newEmp = new Engineer(emp.name, emp.id, emp.email, emp.github);
				employees.push(newEmp);
				containers.ids.push(emp.id);
				askForNext();
			});
		} else if (answer.role === 'Intern') {
			promptUser('intern').then((emp) => {
				const newEmp = new Intern(emp.name, emp.id, emp.email, emp.school);
				employees.push(newEmp);
				containers.ids.push(emp.id);
				askForNext();
			});
		} else {
			console.log('Team complete - rendering team page');
			const htmlPg = render(employees);
			writeOutput(htmlPg);
		}
	});
};


// function to begin building team by asking for manager info and creating the manager object
const buildTeam = () => {
	return promptUser('manager').then((emp) => {
		const newEmp = new Manager(emp.name, emp.id, emp.email, emp.officeNumber);
		employees.push(newEmp);
		containers.ids.push(emp.id);
		askForNext();
	});
};

// starts the app
buildTeam();

