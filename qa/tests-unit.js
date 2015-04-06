var message = require('../lib/random_message.js');
var expect = require('chai').expect;


suite('Random message tests', function(){
	test('getMessage() should return a message', function(){
		expect(typeof message.getMessage() === 'string');
	});
});