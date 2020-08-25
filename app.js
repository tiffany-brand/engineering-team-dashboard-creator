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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];
// const ids = [];

// function to prompt user - returns answers object
const promptUser = (type) => {
	return inquirer.prompt(questions[type]);
};

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
			console.log('All done with new team members');
			console.log(employees);
			const htmlPg = render(employees);
			console.log(htmlPg);


		}
	});
};

const buildTeam = () => {
	return promptUser('manager').then((emp) => {
		const newEmp = new Manager(emp.name, emp.id, emp.email, emp.officeNumber);
		employees.push(newEmp);
		containers.ids.push(emp.id);
		// console.log(employees.filter((emp) => emp.getId() === "1"));
		askForNext();
	});
};

buildTeam();

// const init = async () => {
// 	try {
// 		await buildTeam();
// 		const htmlPg = render(employees);
// 		console.log(htmlPg);
// 	} catch (err) {
// 		console.log(err);
// 	}

// }

// init();

// prompt for manager questions
// push Manager onto array
//ask for next employee
// if engineer, prompt for engineer questions
// if intern, prompt for intern questions
// if done, render html
// write html file - check for output folder and if no folder, create it
// other things to do:
// validate id so it is unique

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
