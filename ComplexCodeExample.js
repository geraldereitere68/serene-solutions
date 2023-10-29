/* 
Filename: ComplexCodeExample.js
This code is a complex example demonstrating various concepts and techniques in JavaScript.
*/

// Class for creating a Person object
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Function to calculate the factorial of a number recursively
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// Module pattern for creating a module to handle math operations
const mathModule = (function() {
  const PI = 3.14159;

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  return {
    PI,
    add,
    subtract
  };
})();

// ES6 arrow function to square a number
const square = (num) => num * num;

// Promises to simulate asynchronous behavior
function simulateAsyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Success");
      } else {
        reject("Failure");
      }
    }, 2000);
  });
}

// Function to fetch data from an API
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

// An array of numbers to demonstrate array operations
const numbers = [1, 2, 3, 4, 5];

// Using array methods to perform operations
const doubledNumbers = numbers.map(num => num * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const filteredNumbers = numbers.filter(num => num > 2);

// Event handling with event listeners
document.getElementById("myButton").addEventListener("click", () => {
  console.log("Button clicked!");
});

// Object destructuring
const { name, age } = new Person("John Doe", 25);

// Regular expressions to validate email addresses
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = emailRegex.test("example@example.com");

// Exporting functions as modules
export { factorial, square, fetchData };

// Importing modules
import { factorial, square, fetchData } from "./mathModule";

// Usage of imported functions
console.log(factorial(5));
console.log(square(5));

// Closures to create private variables and functions
function counter() {
  let count = 0;

  function increment() {
    count++;
    console.log(count);
  }

  return increment;
}

const incrementCounter = counter();
incrementCounter();
incrementCounter();

// Generators to create an iterable collection
function* range(start, end, step) {
  let current = start;

  while (current <= end) {
    yield current;
    current += step;
  }
}

for (const num of range(1, 10, 2)) {
  console.log(num);
}

// Callback function example
function calculate(operation, num1, num2, callback) {
  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    default:
      result = "Invalid operation";
  }

  callback(result);
}

calculate("add", 5, 10, (result) => {
  console.log("Result:", result);
});

// Async/Await example
async function performAsyncTasks() {
  try {
    const data = await fetchData("https://api.example.com/data");
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

performAsyncTasks();