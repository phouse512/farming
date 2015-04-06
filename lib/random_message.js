var messages = [
	'Woot',
	'Animal Crossing',
	'HM',
	'ah'
];

exports.getMessage = function() {
	var idx = Math.floor(Math.random() * messages.length),
		test = require('./test.js');

	console.log(test.test_function());
	console.log(test.another_test(3));
	return messages[idx];
};