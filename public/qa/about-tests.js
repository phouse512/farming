suite('"About" Page Tests', function(){
	test('page should have a message', function(){
		assert($($('h1')[0]).html() === 'About the farming simulator');
	});
});