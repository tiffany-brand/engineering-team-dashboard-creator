const containers = require('./containers');

const manager = [
	{
		type: 'input',
		message: "What is your manager's name?",
		name: 'name'
	},
	{
		type: 'input',
		message: "What is your manager's ID?",
		name: 'id'
	},
	{
		type: 'input',
		message: "What is your manager's email?",
		name: 'email'
	},
	{
		type: 'input',
		message: "What is your manager's office number?",
		name: 'officeNumber'
	}
];

const engineer = [
	{
		type: 'input',
		message: "What is your engineer's name?",
		name: 'name'
	},
	{
		type: 'input',
		message: "What is your engineer's ID?",
		name: 'id',
		validate: (input) => {
			if (containers.ids.includes(input)) {
				return "Duplicate ID - please enter a different ID";
			}
			return true;
		}
	},
	{
		type: 'input',
		message: "What is your engineer's email?",
		name: 'email'
	},
	{
		type: 'input',
		message: "What is your engineer's GitHub username?",
		name: 'github'
	}
];

const intern = [
	{
		type: 'input',
		message: "What is your intern's name?",
		name: 'name'
	},
	{
		type: 'input',
		message: "What is your intern's ID?",
		name: 'id',
		validate: (input) => {
			if (containers.ids.includes(input)) {
				return "Duplicate ID - please enter a different ID";
			}
			return true;
		},
	},
	{
		type: 'input',
		message: "What is your intern's email?",
		name: 'email'
	},
	{
		type: 'input',
		message: "What is your intern's school?",
		name: 'school'
	}
];

const nextEmp = [
	{
		type: 'list',
		message: 'What employee would you like to add next?',
		name: 'role',
		choices: ['Engineer', 'Intern', 'I am finished entering employees']
	}
];

module.exports = { manager, engineer, intern, nextEmp };
