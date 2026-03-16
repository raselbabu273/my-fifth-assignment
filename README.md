- 1️⃣ What is the difference between var, let, and const?
==> Answer:
1. var
(i) It is function-scoped or globally scoped.
(ii) Reassigning values is allowed.
(iii) It is hoisted and initialized with undefined.
(iv) Initialization is optional.
(v) It is usually avoided in modern JavaScript.

2. let
(i) It is block-scoped ({}).
(ii) Reassigning values is allowed.
(iii) It is hoisted but not initialized.
(iv) Initialization is optional.
(v) Use it when the value will change.

3. const 
(i) It is block-scoped ({}).
(ii) Reassigning values is not allowed.
(iii) It is hoisted but not initialized.
(iv) It must be initialized when declared.
(v) Use it when the value should not be reassigned.


- 2️⃣ What is the spread operator (...)?
==> Answer:
The spread operator (...), introduced in ES6, is a JavaScript feature that expands iterables (like arrays, strings, or objects) into individual elements or properties.


- 3️⃣ What is the difference between map(), filter(), and forEach()?
==> Answer:
1. map()
(i) It is used to transform each element of an array.
(ii) It returns a new array with the transformed values.
(iii) The new array has the same length as the original array.
(iv) It does not modify the original array.
(v) Use it when you need to convert data from one form to another.

2. filter()
(i) It is used to select elements based on a condition.
(ii) It returns a new array with only the elements that pass the test.
(iii) The new array can be shorter or equal in length to the original array.
(iv) It does not modify the original array.
(v) Use it when you need to remove unwanted elements.

3. forEach()
(i) It is used to execute a function for each array element.
(ii) It does not return a new array.
(iii) It always returns undefined.
(iv) It is commonly used for side effects (e.g., logging, updating UI, modifying external variables).
(v) Use it when you only need to run code for each element without creating a new array.


- 4️⃣ What is an arrow function?
An arrow function is a concise alternative syntax in JavaScript for writing function expressions, using the => symbol.


- 5️⃣ What are template literals?
Template literals are a special type of string literal in JavaScript that are enclosed by backtick (``) characters instead of single or double quotes. They provide enhanced functionality for working with strings, such as string interpolation and multi-line strings.