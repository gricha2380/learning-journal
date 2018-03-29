This article introduces the concepts of behavior driven development. Together we will configure a very basic Mocha test using the Chai framework.

Basic Vocabulary
As I first began to dive into this field, I noticed several closely related terms and tools which pop up frequently in reference material:

Test Driven Development (TDD) - This is the approach of  developing tests prior to writing production-ready code. With this philosophy code begins with the minimal viable functions required to produce the intended output and refactoring into production-ready code occurs later.

Behavior Driven Development (BDD) - Combines the general techniques of TDD and uses natural language constructs (English-like sentences) to express the behavior and expected outcomes of tests.

Mocha.js - A flexible Node.js based testing framework. Mocha is a popular choice for unit and integration testing in the console and the browser. Learn More.

Chai.js - A Mocha compatible assertion library, allowing for expect(), assert() and should-style assertions. Learn More.

Setting Up
Install both Mocha and Chai and add them into our package.json file:
npm install --save-dev mocha chai
It may also be worth installing mocha globally:
npm install --global mocha
If performing npm init, use this as an opportunity to set test command to mocha. Otherwise, manually add it to the scripts object in package.json. Also, set the watch condition to allow Mocha to run tests whenever files in our root directory are modified:
"scripts": {
"test": "mocha",
"test:watch": "mocha --watch ./test ./"
}
With Mocha set to the test trigger, we can now use the command npm run to run all tests in our test directory. With test:watch, we gain the ability for Mocha to automatically run our tests for us as soon as we save modify any file in our project.

You may notice we don't yet have a test directory. We'll make one now in our project root:

Inside that we'll make a new file called core_tests.js

Testing 101
Tests describe expected behavior without worrying how the function does it. Each test is contained within a spec. A spec is...
Each spec should be responsible for just one aspect of the code's behavior. Example:
put a spec here

Chai test suites

A test suite is a block of unit tests that are closely related. typically test the same function or similar part of our codebase.
Example of tst suite
Within a test suite are one or more individual unit tests, sometimes refers to as specs. These specs are accessed using mocha's describe() method.
Example of spec and describe within

In Mocha/chai, each test suite is encapsulated inside a describe() method call. describe() takes two arguments; a description string and an anonymous function. When used within the describe method, each spec should be wrapped in a method called it(), which also takes two arguments, one for a description of the intended behavior, and the second for a function continuing the state condition for the test.

Common assertion styles

Assert
assert.typeOf()
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal()
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.length()
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
Expect
expect().to.be.a()
expect(foo).to.be.a('string');
expect().to.be.ok
validates on any truthly response
expect().to.equal()
expect(foo).to.equal('bar');
expect().to.have.lengthOf()
expect(foo).to.have.lengthOf(3);
Writing a test, finally.
For our first example we'll write a very basic test to serve as a sanity check. This will help us confirm that the basic connection works. Open the `core_tests.js` file. To prepare for our first test suite we'll need to import `expect` to leverage Chai's assertion abilities.

let expect = require('chai').expect;
For our sanity check, we can verify with an always-true statement:

// sanity check test
describe('Mocha sanity check suite'),function(){
    it('should run our test via npm', function(){
        expect(true).to.be.ok;
    })
}
If all works as expected, our console should now show that we've successfully passed our first test!