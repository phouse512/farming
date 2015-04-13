var messages = [
	'Woot',
	'Animal Crossing',
	'HM',
	'ah'
];

exports.getMessage = function() {
	var idx = Math.floor(Math.random() * messages.length),
		test = require('./test.js');
	return messages[idx];
};