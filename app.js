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
			console.log('All done with new team members');
			console.log(employees);
			const htmlPg = render(employees);
			writeOutput(htmlPg);
			console.log(htmlPg);
		}
	});
};


// function to begin building team by asking for manager info and creating the manager object
const buildTeam = () => {
	return promptUser('manager').then((emp) => {
		const newEmp = new Manager(emp.name, emp.id, emp.email, emp.officeNumber);
		employees.push(newEmp);
		containers.ids.push(emp.id);
		// console.log(employees.filter((emp) => emp.getId() === "1"));
		askForNext();
	});
};

// starts app
buildTeam();


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
