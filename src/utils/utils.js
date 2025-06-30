/**
 * Utility functions demonstrating various JavaScript concepts.
 */

// Demonstrates: const, arrow functions, spread operator for objects, template literals
export const createUserGreeting = (user) => {
    if (!user || typeof user.name !== 'string' || typeof user.age !== 'number') {
      return "Invalid user object provided.";
    }
    // Default properties using spread and default assignment
    const defaultUser = { location: "Unknown", ...user };
    return `Hello, ${defaultUser.name}! You are ${defaultUser.age} years old and live in ${defaultUser.location}.`;
  };
  
  // Demonstrates: let, arrow functions, array map(), array filter(), rest operator for function arguments
  export const processNumbers = (multiplier, ...numbers) => {
    if (typeof multiplier !== 'number') {
      return { error: "Multiplier must be a number." };
    }
    if (numbers.length === 0) {
      return { original: [], multiplied: [], evens: [] };
    }
  
    const multipliedNumbers = numbers.map(num => {
      if (typeof num !== 'number') return 0; // Handle non-numeric values in array
      return num * multiplier;
    });
  
    const evenNumbers = multipliedNumbers.filter(num => num % 2 === 0);
  
    return {
      original: numbers,
      multiplied: multipliedNumbers,
      evens: evenNumbers,
    };
  };
  
  // Demonstrates: optional chaining (?.) and nullish coalescing operator (??)
  export const getNestedProperty = (obj) => {
    // Safely access nested properties
    const street = obj?.address?.street ?? "Street not available";
    const firstFriendName = obj?.friends?.[0]?.name ?? "No friends listed or first friend has no name";
  
    // Safely call a nested method
    const customData = obj?.getCustomData?.() ?? "No custom data method";
  
    return {
      street,
      firstFriendName,
      customData,
    };
  };
  
  // Demonstrates: Promise, async/await, try...catch for a simple delay function
  export const wait = async (milliseconds) => {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      throw new Error("Invalid milliseconds value for wait function.");
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Waited for ${milliseconds}ms`);
      }, milliseconds);
    });
  };
  
  // Example of a more complex function using various concepts
  // Demonstrates: object destructuring for parameters, default parameter values
  export const summarizeOrder = ({ items = [], user = { id: null, name: "Guest" } }) => {
    if (!Array.isArray(items)) {
      return "Items must be an array.";
    }
  
    const totalItems = items.length;
    const totalPrice = items.reduce((sum, item) => {
      // Using optional chaining and nullish coalescing for item price
      const price = item?.price ?? 0;
      return sum + price;
    }, 0);
  
    // Using find() method
    const mostExpensiveItem = items.length > 0 
      ? items.reduce((max, item) => ((item?.price ?? 0) > (max?.price ?? 0) ? item : max), items[0]) 
      : null;
  
    return `Order for ${user.name} (ID: ${user.id ?? 'N/A'}):
      Total Items: ${totalItems}
      Total Price: $${totalPrice.toFixed(2)}
      Most Expensive Item: ${mostExpensiveItem?.name ?? 'N/A'} (Price: $${mostExpensiveItem?.price?.toFixed(2) ?? 'N/A'})`;
  };
  // ES Module related 'this' keyword behavior is usually observed in classes or specific function call patterns
  // For 'this' keyword in simple functions in modules:
  // In ES modules, 'this' at the top level of a module is undefined.
  // console.log("Top level 'this' in module:", this); // undefined
  
  export const thisTestObject = {
    value: "ObjectValue",
    getValueRegular: function() {
      // 'this' refers to thisTestObject
      return this.value;
    },
    getValueArrow: () => {
      // 'this' in an arrow function is lexically scoped. 
      // If this module is run in Node, 'this' might be the module's exports object or global.
      // In a browser (global script, not module), it would be 'window'.
      // In a module context, it's often 'undefined' at the top level.
      // This behavior can be tricky and depends on where the arrow function is defined and called.
      // For instance, if getValueArrow was defined inside a method of a class, 'this' would refer to the class instance.
      return this?.value ?? "Lexical this not pointing to object value";
    },
    getThis: function() { return this; }
  };
  
  
 