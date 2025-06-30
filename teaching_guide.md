```markdown
# জাভাস্ক্রিপ্ট এবং রিয়্যাক্ট এর গুরুত্বপূর্ণ বিষয়সমূহ

## ১. var, let, const

**বিষয়টি কী?**

JavaScript এ ভ্যারিয়েবল ঘোষণা করার জন্য `var`, `let`, এবং `const` হলো কীওয়ার্ড। এদের মধ্যে প্রধান পার্থক্য হলো তাদের স্কোপ (scope) এবং পরিবর্তনযোগ্যতা (mutability)।

*   `var`: ফাংশন-স্কোপড (function-scoped) অথবা গ্লোবাল-স্কোপড (globally-scoped) হয়। এর মান পুনরায় এসাইন করা যায় এবং একই স্কোপে পুনরায় ডিক্লেয়ার করা যায়। হোস্টিং (hoisting) এর শিকার হয়।
*   `let`: ব্লক-স্কোপড (block-scoped) হয় (`{}` এর মধ্যে সীমাবদ্ধ)। এর মান পুনরায় এসাইন করা যায় কিন্তু একই স্কোপে পুনরায় ডিক্লেয়ার করা যায় না। হোস্টিং হয় কিন্তু uninitialized অবস্থায় থাকে।
*   `const`: ব্লক-স্কোপড (block-scoped) হয়। এর মান একবার এসাইন করার পর আর পরিবর্তন করা যায় না (immutable)। তবে অবজেক্ট বা অ্যারের ক্ষেত্রে, তাদের প্রোপার্টি বা এলিমেন্ট পরিবর্তন করা যেতে পারে, কিন্তু ভ্যারিয়েবলটি অন্য কোনো অবজেক্ট বা অ্যারের দিকে নির্দেশ করতে পারবে না। `let` এর মতো হোস্টিং হয় কিন্তু uninitialized অবস্থায় থাকে।

**কেন ব্যবহার করা হয়?**

*   **স্কোপ নিয়ন্ত্রণ:** `let` এবং `const` ব্লক স্কোপিংয়ের সুবিধা দেয়, যা কোডকে আরও অনুমানযোগ্য (predictable) করে তোলে এবং বাগ কমায়। `var` এর ফাংশন স্কোপ অনেক সময় अनपेक्षित আচরণ করতে পারে, বিশেষ করে লুপ বা কন্ডিশনাল ব্লকের মধ্যে।
*   **Immutability (অপরিবর্তনশীলতা):** `const` ব্যবহার করে আমরা নিশ্চিত করতে পারি যে একটি ভ্যারিয়েবলের মান ভুলবশত পরিবর্তন হবে না। এটি কোডের রিডেবিলিটি বাড়ায় এবং ডিবাগিং সহজ করে। React এ state এবং props এর অপরিবর্তনীয়তা একটি গুরুত্বপূর্ণ ধারণা, তাই `const` প্রায়শই ব্যবহৃত হয়।
*   **ত্রুটি প্রতিরোধ:** `let` এবং `const` একই স্কোপে পুনরায় ডিক্লেয়ার করা যায় না, যা `var` এর একটি সাধারণ সমস্যা ছিল এবং এটি ডিবাগ করা কঠিন করে তুলত।

**কীভাবে ব্যবহার করা হয়?**

```javascript
// var এর উদাহরণ
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // আউটপুট: 10 (ফাংশন স্কোপড)
  var x = 20; // পুনরায় ডিক্লেয়ার করা যায়
  console.log(x); // আউটপুট: 20
}
varExample();

// let এর উদাহরণ
function letExample() {
  if (true) {
    let y = 20;
    console.log(y); // আউটপুট: 20 (ব্লকের মধ্যে অ্যাক্সেসযোগ্য)
    // let y = 30; // SyntaxError: Identifier 'y' has already been declared
  }
  // console.log(y); // ReferenceError: y is not defined (ব্লকের বাইরে অ্যাক্সেসযোগ্য নয়)

  let z = 100;
  z = 150; // পুনরায় এসাইন করা যায়
  console.log(z); // আউটপুট: 150
}
letExample();

// const এর উদাহরণ
function constExample() {
  if (true) {
    const z = 30;
    console.log(z); // আউটপুট: 30
    // z = 40; // TypeError: Assignment to constant variable.
    // const z = 50; // SyntaxError: Identifier 'z' has already been declared
  }
  // console.log(z); // ReferenceError: z is not defined

  const person = { name: "Alice" };
  person.name = "Bob"; // এটি সম্ভব, কারণ অবজেক্টের প্রোপার্টি পরিবর্তন করা হচ্ছে
  console.log(person.name); // আউটপুট: Bob
  // person = { name: "Charlie" }; // TypeError: Assignment to constant variable.
}
constExample();
```

**বাস্তব জীবনের উদাহরণ:**

*   **`var`:** ধরুন, একটি পুরনো দিনের রান্নাঘরের মতো যেখানে মশলার কৌটাগুলো যেকোনো শেলফে রাখা যেত এবং মাঝে মাঝে একই নামের দুটো কৌটা তৈরি হয়ে যেত, যা বিভ্রান্তি তৈরি করত।
*   **`let`:** একটি আধুনিক লাইব্রেরির মতো, যেখানে একটি নির্দিষ্ট সেকশনের বই শুধু সেই সেকশনেই পাওয়া যায়। আপনি চাইলে একটি বইয়ের জায়গায় অন্য বই রাখতে পারেন (মান পরিবর্তন)।
*   **`const`:** আপনার জন্ম তারিখের মতো, যা একবার নির্দিষ্ট হয়ে গেলে আর পরিবর্তন করা যায় না। অথবা, একটি বাড়ির ঠিকানা – আপনি বাড়ির ভেতরের জিনিসপত্র পরিবর্তন করতে পারেন (অবজেক্টের প্রোপার্টি), কিন্তু বাড়ির মূল ঠিকানাটি (ভ্যারিয়েবলের রেফারেন্স) পরিবর্তন করতে পারবেন না।

**React এ ব্যবহার:**

```javascript
import React, { useState } from 'react';

function Counter() {
  // count ভ্যারিয়েবলের মান সরাসরি পরিবর্তন করা হয় না, setCount ব্যবহার করা হয়
  // তাই count কে const হিসাবে ডিক্লেয়ার করা নিরাপদ এবং সঠিক
  const [count, setCount] = useState(0);
  const componentName = "CounterComponent"; // এটিও পরিবর্তন হবে না

  let message = "Current count is: " + count; // এই মেসেজটি বিভিন্ন হতে পারে

  // ...
  return (
    <div>
      <p>{componentName}</p>
      <p>{message}</p>
      {/* ... */}
    </div>
  );
}
```
`useState` হুক থেকে প্রাপ্ত `count` ভ্যারিয়েবলটি `const` দিয়ে ডিক্লেয়ার করা হয় কারণ আমরা সরাসরি `count = count + 1` এভাবে এর মান পরিবর্তন করি না। এর পরিবর্তে, আমরা `setCount` ফাংশন ব্যবহার করি, যা React কে state আপডেট করার নির্দেশ দেয় এবং কম্পোনেন্ট রি-রেন্ডার করে।

---

## ২. Arrow Functions (অ্যারো ফাংশন)

**বিষয়টি কী?**

অ্যারো ফাংশন (Arrow Function) হলো ES6 এ প্রবর্তিত ফাংশন লেখার একটি সংক্ষিপ্ত এবং আধুনিক সিনট্যাক্স। এটি সাধারণ ফাংশনের (function keyword দিয়ে লেখা) তুলনায় কিছু গুরুত্বপূর্ণ পার্থক্য নিয়ে আসে, বিশেষ করে `this` কীওয়ার্ডের আচরণের ক্ষেত্রে।

**কেন ব্যবহার করা হয়?**

*   **সংক্ষিপ্ত সিনট্যাক্স (Concise Syntax):** কোড কম লিখতে হয়, যা ফাংশনটিকে আরও পঠনযোগ্য করে তোলে, বিশেষ করে ছোট এবং এক লাইনের ফাংশনের ক্ষেত্রে।
*   **`this` এর লেক্সিক্যাল বাইন্ডিং (Lexical `this` Binding):** অ্যারো ফাংশনের নিজস্ব `this` কনটেক্সট থাকে না। এটি তার প্যারেন্ট বা আউটার স্কোপের `this` ভ্যালুকে ইনহেরিট (inherit) করে। এটি সাধারণ ফাংশনের `this` বাইন্ডিং জনিত অনেক কনফিউশন দূর করে, বিশেষ করে কলব্যাক ফাংশন এবং ক্লাস মেথডের মধ্যে।
*   **`arguments` অবজেক্ট নেই:** অ্যারো ফাংশনের নিজস্ব `arguments` অবজেক্ট নেই। যদি আর্গুমেন্টস অ্যাক্সেস করার প্রয়োজন হয়, তাহলে রেস্ট প্যারামিটার (`...args`) ব্যবহার করতে হয়।
*   **`new` কীওয়ার্ড দিয়ে কল করা যায় না:** অ্যারো ফাংশন কনস্ট্রাক্টর ফাংশন হিসেবে ব্যবহার করা যায় না।

**কীভাবে ব্যবহার করা হয়?**

```javascript
// সাধারণ ফাংশন
function addRegular(a, b) {
  return a + b;
}

// অ্যারো ফাংশন (বেসিক)
const addArrowBasic = (a, b) => {
  return a + b;
};

// অ্যারো ফাংশন (এক লাইনের রিটার্ন - implicit return)
const addArrowImplicit = (a, b) => a + b;

// অ্যারো ফাংশন (একটি প্যারামিটার থাকলে ব্র্যাকেট ঐচ্ছিক)
const square = x => x * x;

// অ্যারো ফাংশন (কোনো প্যারামিটার না থাকলে)
const greet = () => console.log("Hello!");

// অবজেক্ট লিটারাল রিটার্ন করার সময় ব্র্যাকেট () ব্যবহার করতে হয়
const createPerson = (name, age) => ({ name: name, age: age });

// `this` এর আচরণ
function NormalFunctionExample() {
  this.value = 1;
  setTimeout(function() {
    // এখানে `this` window/global অবজেক্টকে নির্দেশ করে (strict mode এ undefined)
    // console.log(this.value); // NaN বা undefined
  }, 100);

  setTimeout(() => {
    // অ্যারো ফাংশন `this` কে NormalFunctionExample এর স্কোপ থেকে নেয়
    console.log("Arrow function this.value:", this.value); // আউটপুট: Arrow function this.value: 1
  }, 200);
}
const normalObj = new NormalFunctionExample();


class Counter {
    constructor() {
        this.count = 0;
    }

    incrementRegular() {
        // সাধারণ ফাংশনে this বাইন্ড করতে হয় বা অন্য ভেরিয়েবলে রাখতে হয়
        // setTimeout(function() { console.log(this.count++); }, 100); // এখানে this কাজ করবে না
    }

    incrementArrow() {
        setTimeout(() => {
            // অ্যারো ফাংশন ক্লাস এর this কে ব্যবহার করে
            console.log("Count (from arrow):", ++this.count);
        }, 100);
    }
}
const myCounter = new Counter();
myCounter.incrementArrow(); // Count (from arrow): 1
myCounter.incrementArrow(); // Count (from arrow): 2
```

**বাস্তব জীবনের উদাহরণ:**

*   **সংক্ষিপ্ততা:** ধরুন, আপনি কাউকে একটি ছোট নোট লিখছেন। অ্যারো ফাংশন হলো একটি পোস্ট-ইট নোটের মতো – সংক্ষিপ্ত এবং সোজাসাপ্টা। সাধারণ ফাংশন একটি পূর্ণ চিঠির মতো হতে পারে।
*   **`this` এর আচরণ:** মনে করুন, আপনি একটি রেস্টুরেন্টে আছেন (আউটার স্কোপ)। আপনি যদি ওয়েটারকে (অ্যারো ফাংশন) কিছু অর্ডার দেন, ওয়েটার জানবে যে "আপনি" (আউটার স্কোপের `this`) অর্ডারটি করেছেন। কিন্তু যদি অন্য কেউ (সাধারণ ফাংশনের নিজস্ব `this`) আপনার টেবিলের অর্ডার নিতে আসে যে আপনাকে চেনে না, সে বিভ্রান্ত হতে পারে।

**React এ ব্যবহার:**

React এ অ্যারো ফাংশন ব্যাপকভাবে ব্যবহৃত হয়, বিশেষ করে ফাংশনাল কম্পোনেন্ট এবং ইভেন্ট হ্যান্ডলারের জন্য।

```javascript
import React, { useState } from 'react';

// ফাংশনাল কম্পোনেন্ট একটি অ্যারো ফাংশন হিসেবে
const MyButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

function App() {
  const [message, setMessage] = useState("Click me");

  // ইভেন্ট হ্যান্ডলার হিসেবে অ্যারো ফাংশন
  // এটি নিশ্চিত করে যে `this` (যদি ক্লাসে ব্যবহৃত হতো) বা স্কোপ সঠিকভাবে কাজ করে
  const handleClick = () => {
    setMessage("Button Clicked!");
    console.log("Button was clicked");
  };

  const items = ["Apple", "Banana", "Cherry"];

  return (
    <div>
      <MyButton onClick={handleClick}>{message}</MyButton>
      <ul>
        {/* map এর মধ্যে অ্যারো ফাংশন */}
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
React এ ক্লাস কম্পোনেন্টে (যদিও এখন কম ব্যবহৃত) মেথড বাইন্ডিংয়ের ঝামেলা এড়াতেও অ্যারো ফাংশন ব্যবহার করা হতো। ফাংশনাল কম্পোনেন্টে `this` এর তেমন কোনো ইস্যু না থাকলেও, সংক্ষিপ্ততা এবং কলব্যাকের সহজবোধ্যতার জন্য অ্যারো ফাংশন জনপ্রিয়।

---

## ৩. `this` কীওয়ার্ড

**বিষয়টি কী?**

JavaScript এ `this` একটি বিশেষ কীওয়ার্ড যা একটি ফাংশন কল হওয়ার সময় তার এক্সিকিউশন কনটেক্সটকে (execution context) নির্দেশ করে। অর্থাৎ, ফাংশনটি কীভাবে কল করা হয়েছে তার উপর নির্ভর করে `this` এর মান পরিবর্তিত হয়। এটি অবজেক্ট-অরিয়েন্টেড প্রোগ্রামিংয়ের একটি গুরুত্বপূর্ণ ধারণা, যেখানে এটি বর্তমান অবজেক্টের ইনস্ট্যান্সকে নির্দেশ করে।

**`this` এর মান যেভাবে নির্ধারিত হয়:**

1.  **গ্লোবাল কনটেক্সট (Global Context):** কোনো ফাংশনের বাইরে `this` গ্লোবাল অবজেক্টকে নির্দেশ করে (ব্রাউজারে `window`, Node.js এ `global`)। Strict mode এ এটি `undefined` হয়।
2.  **ফাংশন কনটেক্সট (Function Context - Simple Call):** একটি সাধারণ ফাংশন সরাসরি কল করা হলে (যেমন `myFunction()`), `this` গ্লোবাল অবজেক্টকে নির্দেশ করে। Strict mode এ এটি `undefined` হয়।
3.  **মেথড হিসেবে (As a Method):** যখন একটি ফাংশন কোনো অবজেক্টের মেথড হিসেবে কল করা হয় (যেমন `obj.myMethod()`), তখন `this` সেই অবজেক্টকে (`obj`) নির্দেশ করে।
4.  **কনস্ট্রাক্টর হিসেবে (As a Constructor):** যখন একটি ফাংশন `new` কীওয়ার্ড দিয়ে কল করা হয় (যেমন `new MyConstructor()`), তখন `this` নতুন তৈরি হওয়া ইনস্ট্যান্সকে নির্দেশ করে।
5.  **অ্যারো ফাংশনে (Arrow Functions):** অ্যারো ফাংশনের নিজস্ব `this` বাইন্ডিং নেই। এটি তার লেক্সিক্যাল (lexical) বা প্যারেন্ট স্কোপের `this` ভ্যালুকে গ্রহণ করে।
6.  **`apply`, `call`, `bind` মেথড:** এই মেথডগুলো ব্যবহার করে `this` এর মান স্পষ্টভাবে সেট করা যায়।
    *   `call(thisArg, arg1, arg2, ...)`: ফাংশনটি কল করে এবং `this` এর মান `thisArg` এ সেট করে। আর্গুমেন্টগুলো কমা দিয়ে আলাদাভাবে পাস করা হয়।
    *   `apply(thisArg, [argsArray])`: `call` এর মতোই, কিন্তু আর্গুমেন্টগুলো একটি অ্যারে হিসেবে পাস করা হয়।
    *   `bind(thisArg)`: একটি নতুন ফাংশন রিটার্ন করে যেখানে `this` এর মান স্থায়ীভাবে `thisArg` এ সেট করা থাকে। মূল ফাংশনটি কল হয় না।

**কেন ব্যবহার করা হয়?**

*   **অবজেক্টের ডেটা অ্যাক্সেস:** অবজেক্টের মেথডের ভেতর থেকে সেই অবজেক্টের প্রোপার্টি এবং অন্যান্য মেথড অ্যাক্সেস করার জন্য `this` ব্যবহৃত হয়।
*   **পুনরায় ব্যবহারযোগ্য ফাংশন তৈরি:** এমন ফাংশন তৈরি করা যায় যা বিভিন্ন অবজেক্টের কনটেক্সটে কাজ করতে পারে।
*   **ইভেন্ট হ্যান্ডলিং:** DOM ইভেন্ট হ্যান্ডলারের মধ্যে, `this` সাধারণত সেই DOM এলিমেন্টকে নির্দেশ করে যা ইভেন্টটি ট্রিগার করেছে (অ্যারো ফাংশন না হলে)।

**কীভাবে ব্যবহার করা হয়?**

```javascript
// 1. গ্লোবাল কনটেক্সট
// console.log(this); // ব্রাউজারে window অবজেক্ট, Node.js এ global অবজেক্ট

// 2. ফাংশন কনটেক্সট (Simple Call)
function showThisSimple() {
  // "use strict"; // Strict mode এ uncomment করলে নিচের লাইনে this হবে undefined
  console.log("Simple call 'this':", this); // ব্রাউজারে window, Node.js এ global (strict mode ছাড়া)
}
// showThisSimple();

// 3. মেথড হিসেবে
const myObject = {
  name: "My Object",
  logName: function() {
    console.log("Method call 'this'.name:", this.name); // this.name হলো myObject.name
  }
};
// myObject.logName(); // আউটপুট: Method call 'this'.name: My Object

// 4. কনস্ট্রাক্টর হিসেবে
function Person(name) {
  this.name = name;
  console.log("Constructor call 'this':", this); // this নতুন Person ইনস্ট্যান্সকে নির্দেশ করে
}
// const person1 = new Person("Alice"); // আউটপুট: Constructor call 'this': Person { name: 'Alice' }
// console.log(person1.name); // আউটপুট: Alice

// 5. অ্যারো ফাংশনে
const myArrowObject = {
  value: 10,
  getValueRegular: function() {
    setTimeout(function() {
      // console.log("Regular fn in setTimeout 'this':", this); // window বা undefined
    }, 100);
  },
  getValueArrow: function() {
    setTimeout(() => {
      console.log("Arrow fn in setTimeout 'this'.value:", this.value); // this.value হলো myArrowObject.value
    }, 100);
  }
};
// myArrowObject.getValueRegular();
// myArrowObject.getValueArrow(); // আউটপুট: Arrow fn in setTimeout 'this'.value: 10

// 6. call, apply, bind
const anotherObject = {
  name: "Another Object"
};

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

// greet.call(myObject, "Hello", "!");        // আউটপুট: Hello, My Object!
// greet.call(anotherObject, "Hi", ".");    // আউটপুট: Hi, Another Object.

// greet.apply(myObject, ["Good morning", "!!"]); // আউটপুট: Good morning, My Object!!

const boundGreetMyObject = greet.bind(myObject);
// boundGreetMyObject("Hey", "..."); // আউটপুট: Hey, My Object...

const boundGreetAnotherObject = greet.bind(anotherObject, "Hola");
// boundGreetAnotherObject("!!!"); // আউটপুট: Hola, Another Object!!!
```

**বাস্তব জীবনের উদাহরণ:**

ধরুন, আপনি একটি রেসিপি বই (অবজেক্ট) পড়ছেন। বইয়ের প্রতিটি রেসিপির (মেথড) মধ্যে যদি লেখা থাকে "এই রেসিপির জন্য ডিম ব্যবহার করুন", তাহলে "এই রেসিপি" (`this`) সেই নির্দিষ্ট রেসিপিকেই নির্দেশ করে যার কথা বলা হচ্ছে। আপনি যদি অন্য রেসিপি পড়েন, তাহলে "এই রেসিপি" তখন সেই অন্য রেসিপিকে নির্দেশ করবে।

অ্যারো ফাংশনের ক্ষেত্রে, যদি একজন শেফ (আউটার ফাংশন) তার সহকারীকে (অ্যারো ফাংশন) বলেন, "আমার (`this`) জন্য উপকরণগুলো নিয়ে এসো", সহকারী জানবে যে শেফের উপকরণ আনতে হবে, নিজের (সহকারীর) নয়।

**React এ ব্যবহার:**

React এর ক্লাস কম্পোনেন্টগুলোতে `this` খুবই গুরুত্বপূর্ণ ছিল। মেথড এবং ইভেন্ট হ্যান্ডলারের মধ্যে কম্পোনেন্টের state, props, এবং অন্যান্য মেথড অ্যাক্সেস করার জন্য `this` ব্যবহৃত হতো।

```javascript
import React from 'react';

// ক্লাস কম্পোনেন্ট (React এর পুরনো পদ্ধতি, এখন ফাংশনাল কম্পোনেন্ট বেশি জনপ্রিয়)
class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello from Class Component!"
    };
    // ইভেন্ট হ্যান্ডলারকে `this` এর সাথে বাইন্ড করা প্রয়োজন হতো (যদি অ্যারো ফাংশন না হয়)
    // this.handleClick = this.handleClick.bind(this);
  }

  //handleClick() {
  //  console.log(this.state.message); // বাইন্ড না করলে `this` undefined হতো
  //  this.setState({ message: "Clicked!" });
  //}

  // অ্যারো ফাংশন হিসেবে ইভেন্ট হ্যান্ডলার লিখলে বাইন্ডিংয়ের প্রয়োজন হয় না
  handleClick = () => {
    console.log(this.state.message); // `this` সঠিকভাবে ক্লাস ইনস্ট্যান্সকে নির্দেশ করে
    this.setState({ message: "Class component button clicked!" });
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <p>Prop: {this.props.name}</p>
        <button onClick={this.handleClick}>Click Me (Class)</button>
      </div>
    );
  }
}

// export default MyClassComponent;

// ফাংশনাল কম্পোনেন্টে `this` এর ব্যবহার নেই
// function FunctionalComponent() {
//   const [message, setMessage] = useState("Hello from Functional Component!");
//   // এখানে `this` এর কোনো ধারণা নেই
//   const handleClick = () => {
//     setMessage("Functional component button clicked!");
//   };
//   return <button onClick={handleClick}>{message}</button>;
// }
```
ফাংশনাল কম্পোনেন্ট এবং হুকস (Hooks) এর আগমনের পর, `this` এর জটিলতা এবং বাইন্ডিংয়ের প্রয়োজনীয়তা React এ অনেক কমে গেছে, কারণ ফাংশনাল কম্পোনেন্টের নিজস্ব `this` কনটেক্সট থাকে না। তবে JavaScript এর মূল ধারণা হিসেবে `this` বোঝা এখনও গুরুত্বপূর্ণ।

---

## ৪. Template Literals (টেমপ্লেট লিটারাল)

**বিষয়টি কী?**

টেমপ্লেট লিটারাল (Template Literals) হলো ES6 এ প্রবর্তিত স্ট্রিং লেখার একটি উন্নত পদ্ধতি। এগুলো ব্যাক-টিক (`` ` ``) অক্ষর দিয়ে আবদ্ধ থাকে, সাধারণ স্ট্রিংয়ের মতো সিঙ্গেল (`'`) বা ডাবল কোট (`"`) দিয়ে নয়। টেমপ্লেট লিটারাল স্ট্রিং ইন্টারপোলেশন (string interpolation), মাল্টি-লাইন স্ট্রিং (multi-line strings) এবং ট্যাগড টেমপ্লেট (tagged templates) এর মতো সুবিধা প্রদান করে।

**বৈশিষ্ট্য:**

*   **স্ট্রিং ইন্টারপোলেশন (String Interpolation):** `${expression}` সিনট্যাক্স ব্যবহার করে স্ট্রিংয়ের মধ্যে ভ্যারিয়েবল বা এক্সপ্রেশন সরাসরি এম্বেড করা যায়।
*   **মাল্টি-লাইন স্ট্রিং (Multi-line Strings):** নতুন লাইন তৈরি করার জন্য `\n` ব্যবহারের প্রয়োজন হয় না; সরাসরি এন্টার চেপে নতুন লাইন তৈরি করা যায়।
*   **ট্যাগড টেমপ্লেট (Tagged Templates):** একটি বিশেষ ধরনের ফাংশন কল যা টেমপ্লেট লিটারালকে পার্স এবং ম্যানিপুলেট করতে সাহায্য করে। (এটি একটি অ্যাডভান্সড টপিক)

**কেন ব্যবহার করা হয়?**

*   **পঠনযোগ্যতা (Readability):** ভ্যারিয়েবল এবং স্ট্রিং যুক্ত করার (`+` অপারেটর দিয়ে) গতানুগতিক পদ্ধতির চেয়ে টেমপ্লেট লিটারাল অনেক বেশি সহজবোধ্য এবং পরিষ্কার কোড লিখতে সাহায্য করে।
*   **সহজ মাল্টি-লাইন:** দীর্ঘ টেক্সট বা HTML স্নিপেট লেখার সময় কোড ফরম্যাটিং সুন্দর থাকে।
*   **ডায়নামিক স্ট্রিং তৈরি:** বিশেষ করে যখন স্ট্রিংয়ের বিভিন্ন অংশ বিভিন্ন ভ্যারিয়েবল বা এক্সপ্রেশনের মানের উপর নির্ভরশীল, তখন এটি খুবই কার্যকর।

**কীভাবে ব্যবহার করা হয়?**

```javascript
const name = "Alice";
const age = 30;

// সাধারণ স্ট্রিং কনক্যাটেনেশন
const greetingOld = "Hello, my name is " + name + " and I am " + age + " years old.";
console.log("Old way:", greetingOld);

// টেমপ্লেট লিটারাল ব্যবহার করে স্ট্রিং ইন্টারপোলেশন
const greetingNew = `Hello, my name is ${name} and I am ${age} years old.`;
console.log("New way:", greetingNew);

// এক্সপ্রেশন ব্যবহার
const a = 5;
const b = 10;
const sumMessage = `The sum of ${a} and ${b} is ${a + b}.`;
console.log(sumMessage); // আউটপুট: The sum of 5 and 10 is 15.

// মাল্টি-লাইন স্ট্রিং
const multiLineOld = "This is the first line.\n" +
                   "This is the second line.";
console.log("Old multi-line:\n", multiLineOld);

const multiLineNew = `This is the first line.
This is the second line.`;
console.log("New multi-line:\n", multiLineNew);

// ফাংশন কলও করা যায়
function getFramework() {
  return "React";
}
const frameworkMessage = `I am learning ${getFramework()}!`;
console.log(frameworkMessage); // আউটপুট: I am learning React!
```

**বাস্তব জীবনের উদাহরণ:**

ধরুন, আপনি একটি চিঠি লিখছেন যেখানে কিছু খালি জায়গা (blank space) পূরণ করতে হবে।

*   **পুরানো পদ্ধতি (স্ট্রিং কনক্যাটেনেশন):** যেন আপনি চিঠির প্রতিটি অংশ আলাদা কাগজে লিখে তারপর আঠা দিয়ে জোড়া লাগাচ্ছেন। যেমন: "প্রিয়" + [নাম] + ", আপনার জন্য শুভকামনা।"
*   **নতুন পদ্ধতি (টেমপ্লেট লিটারাল):** যেন আপনার কাছে একটি ফর্ম চিঠি আছে যেখানে নির্দিষ্ট জায়গায় `${নাম}` লেখা আছে, এবং আপনি শুধু সেই নামটি বসিয়ে দিলেই পূর্ণাঙ্গ চিঠি তৈরি হয়ে যায়। যেমন: `` `প্রিয় ${নাম}, আপনার জন্য শুভকামনা।` ``

মাল্টি-লাইন স্ট্রিংয়ের ক্ষেত্রে, পুরনো পদ্ধতিতে একটি দীর্ঘ কবিতা লিখতে হলে প্রতি লাইনের শেষে `\n` এবং `+` দিতে হতো, যা দেখতে অগোছালো। টেমপ্লেট লিটারাল দিয়ে আপনি স্বাভাবিকভাবেই কবিতাটি লিখতে পারবেন।

**React এ ব্যবহার:**

React এর JSX এর মধ্যে ডায়নামিক স্ট্রিং তৈরি করতে টেমপ্লেট লিটারাল খুবই উপযোগী।

```javascript
import React from 'react';

function UserProfile({ user }) {
  // user অবজেক্ট: { firstName: "John", lastName: "Doe", city: "New York" }
  if (!user) {
    return <p>Loading user data...</p>;
  }

  const profileLink = `/profile/${user.id}`;
  const location = `${user.city}, ${user.country || 'Unknown'}`; // Optional Chaining এর সাথেও ব্যবহার করা যায়

  return (
    <div className={`user-profile theme-${user.theme || 'light'}`}>
      {/* h1 ট্যাগের টেক্সট টেমপ্লেট লিটারাল দিয়ে তৈরি */}
      <h1>{`Welcome, ${user.firstName} ${user.lastName}!`}</h1>
      <p>{`Age: ${user.age}`}</p>
      <p>{`Lives in: ${location}`}</p>
      <p>
        View profile: <a href={profileLink}>{`${user.firstName}'s Profile`}</a>
      </p>
      <img
        src={`/images/users/${user.id}.jpg`}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <div style={{ backgroundColor: `${user.preferredColor || 'transparent'}` }}>
        User's preferred color box.
      </div>
    </div>
  );
}

// কাল্পনিক ব্যবহার
// const loggedInUser = {
//   id: 123,
//   firstName: "Jane",
//   lastName: "Doe",
//   age: 28,
//   city: "London",
//   theme: "dark",
//   preferredColor: "blue"
// };

// <UserProfile user={loggedInUser} />
```
JSX এর মধ্যে `{}` কার্লি ব্রেসের ভেতরে যেকোনো JavaScript এক্সপ্রেশন লেখা যায়, এবং টেমপ্লেট লিটারাল যেহেতু একটি এক্সপ্রেশন, তাই এটি সরাসরি ব্যবহার করা যায়। এটি ক্লাস নেইম, স্টাইল, অ্যাট্রিবিউট ভ্যালু ইত্যাদি ডায়নামিকভাবে সেট করতে খুব সাহায্য করে।

---

## ৫. Destructuring (ডিস্ট্রাকচারিং)

**বিষয়টি কী?**

ডিস্ট্রাকচারিং (Destructuring Assignment) হলো ES6 এ প্রবর্তিত একটি JavaScript এক্সপ্রেশন যা অ্যারে (array) থেকে মান অথবা অবজেক্ট (object) থেকে প্রোপার্টিগুলোকে সহজে বের করে এনে স্বতন্ত্র ভ্যারিয়েবলে এসাইন করার একটি সংক্ষিপ্ত পদ্ধতি। এটি কোডকে আরও পঠনযোগ্য এবং সংক্ষিপ্ত করে।

**দুই ধরনের ডিস্ট্রাকচারিং আছে:**

1.  **অবজেক্ট ডিস্ট্রাকচারিং (Object Destructuring):** অবজেক্টের প্রোপার্টিগুলোকে ভ্যারিয়েবলে এসাইন করা হয়।
2.  **অ্যারে ডিস্ট্রাকচারিং (Array Destructuring):** অ্যারের এলিমেন্টগুলোকে তাদের পজিশন অনুযায়ী ভ্যারিয়েবলে এসাইন করা হয়।

**কেন ব্যবহার করা হয়?**

*   **সংক্ষিপ্ততা ও পঠনযোগ্যতা:** অবজেক্টের প্রোপার্টি বা অ্যারের এলিমেন্ট অ্যাক্সেস করার জন্য বারবার `object.property` বা `array[index]` লেখার চেয়ে ডিস্ট্রাকচারিং অনেক পরিচ্ছন্ন কোড দেয়।
*   **সহজ ভ্যালু এক্সট্রাকশন:** নেস্টেড (nested) অবজেক্ট বা অ্যারে থেকেও সহজে ভ্যালু বের করা যায়।
*   **ফাংশন প্যারামিটার:** ফাংশনে অবজেক্ট প্যারামিটার পাস করার সময়, ফাংশনের সিগনেচারে সরাসরি ডিস্ট্রাকচার করে প্রয়োজনীয় প্রোপার্টিগুলো নেওয়া যায়।
*   **ভ্যারিয়েবল সোয়াপিং (Swapping variables):** দুটি ভ্যারিয়েবলের মান সহজে অদলবদল করা যায় (অ্যারে ডিস্ট্রাকচারিং দিয়ে)।
*   **ডিফল্ট ভ্যালু সেট করা:** যদি কোনো প্রোপার্টি বা এলিমেন্ট অবজেক্ট বা অ্যারেতে না থাকে, তাহলে তার জন্য একটি ডিফল্ট ভ্যালু সেট করা যায়।

**কীভাবে ব্যবহার করা হয়?**

**অবজেক্ট ডিস্ট্রাকচারিং:**

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  address: {
    city: "New York",
    country: "USA"
  }
};

// বেসিক অবজেক্ট ডিস্ট্রাকচারিং
const { firstName, lastName } = person;
console.log(firstName); // "John"
console.log(lastName);  // "Doe"

// নতুন ভ্যারিয়েবল নামে এসাইন করা
const { firstName: fName, age: personAge } = person;
console.log(fName);     // "John"
console.log(personAge); // 30

// ডিফল্ট ভ্যালু
const { gender = "Male" } = person; // person অবজেক্টে gender নেই
console.log(gender); // "Male"

// নেস্টেড অবজেক্ট ডিস্ট্রাকচারিং
const { address: { city, country } } = person;
console.log(city);    // "New York"
console.log(country); // "USA"

// ফাংশন প্যারামিটারে ডিস্ট্রাকচারিং
function printUserDetails({ firstName, age, address: { city } }) {
  console.log(`${firstName} is ${age} years old and lives in ${city}.`);
}
printUserDetails(person); // "John is 30 years old and lives in New York."

// ডাইনামিক প্রোপার্টি নেইম (কম ব্যবহৃত)
// let propName = "firstName";
// const { [propName]: nameValue } = person;
// console.log(nameValue); // "John"
```

**অ্যারে ডিস্ট্রাকচারিং:**

```javascript
const numbers = [10, 20, 30, 40, 50];

// বেসিক অ্যারে ডিস্ট্রাকচারিং
const [first, second] = numbers;
console.log(first);  // 10
console.log(second); // 20

// কিছু এলিমেন্ট স্কিপ করা
const [, , third, , fifth] = numbers;
console.log(third); // 30
console.log(fifth); // 50

// রেস্ট সিনট্যাক্স (Rest Syntax) এর সাথে ব্যবহার
const [a, b, ...rest] = numbers;
console.log(a);    // 10
console.log(b);    // 20
console.log(rest); // [30, 40, 50]

// ডিফল্ট ভ্যালু
const colors = ["Red", "Green"];
const [primary, secondary, tertiary = "Blue"] = colors;
console.log(primary);   // "Red"
console.log(secondary); // "Green"
console.log(tertiary);  // "Blue" (ডিফল্ট ভ্যালু ব্যবহৃত হয়েছে)

// ভ্যারিয়েবল সোয়াপিং
let x = 5;
let y = 7;
[x, y] = [y, x]; // সোয়াপিং
console.log(x); // 7
console.log(y); // 5

// ফাংশন থেকে একাধিক মান রিটার্ন
function getCoordinates() {
  return [10.5, 20.3];
}
const [latitude, longitude] = getCoordinates();
console.log(latitude, longitude); // 10.5 20.3
```

**বাস্তব জীবনের উদাহরণ:**

*   **অবজেক্ট ডিস্ট্রাকচারিং:** ধরুন, আপনার কাছে একটি পরিচয়পত্র (অবজেক্ট) আছে যেখানে নাম, ঠিকানা, বয়স ইত্যাদি লেখা আছে। ডিস্ট্রাকচারিং হলো সেই পরিচয়পত্র থেকে নির্দিষ্ট তথ্যগুলো (যেমন শুধু নাম এবং বয়স) বের করে আলাদা কার্ডে লিখে নেওয়ার মতো। "আমার পরিচয়পত্রের `নাম` এবং `বয়স` দাও" না বলে, আপনি সরাসরি বলছেন "{নাম, বয়স} = পরিচয়পত্র"।
*   **অ্যারে ডিস্ট্রাকচারিং:** একটি ফলের ঝুড়ি (অ্যারে) থেকে প্রথম ও দ্বিতীয় ফলটি বের করে নেওয়ার মতো। "ঝুড়ির ০ নম্বর এবং ১ নম্বর ফল দাও" না বলে, আপনি বলছেন "[প্রথমফল, দ্বিতীয়ফল] = ঝুড়ি"।

**React এ ব্যবহার:**

React এ ডিস্ট্রাকচারিং খুবই ব্যাপকভাবে ব্যবহৃত হয়, বিশেষ করে props এবং state থেকে ভ্যালু সহজে বের করার জন্য।

```javascript
import React, { useState } from 'react';

// 1. Props ডিস্ট্রাকচারিং (ফাংশন প্যারামিটারে)
function UserCard({ user: { name, age, email }, company }) {
  // এখানে props.user.name এর পরিবর্তে সরাসরি name ব্যবহার করা যাচ্ছে
  // props.company এর পরিবর্তে company
  if (!name) {
    return <p>User data not available.</p>;
  }
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email || 'N/A'}</p>
      <p>Company: {company}</p>
    </div>
  );
}

// 2. State ডিস্ট্রাকচারিং (useState হুক থেকে)
function Counter() {
  // useState একটি অ্যারে রিটার্ন করে: [currentState, stateUpdaterFunction]
  const [count, setCount] = useState(0); // অ্যারে ডিস্ট্রাকচারিং

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>Decrement</button>
    </div>
  );
}

// 3. ইম্পোর্টের সময় ডিস্ট্রাকচারিং (Named exports)
// import { useState, useEffect } from 'react'; // এখানে useState এবং useEffect হলো react মডিউলের named export

function App() {
  const userData = { name: "Jane Doe", age: 28, email: "jane@example.com" };
  const companyName = "Tech Solutions Inc.";

  return (
    <div>
      <UserCard user={userData} company={companyName} />
      <Counter />
    </div>
  );
}

export default App;
```
ডিস্ট্রাকচারিং React কোডকে অনেক বেশি ক্লিন এবং মেইনটেইনেবল করে তোলে। এটি কম্পোনেন্টের props এবং state এর সাথে কাজ করাকে সহজ করে দেয়।

---

## ৬. Spread & Rest Operators (`...`) (স্প্রেড ও রেস্ট অপারেটর)

**বিষয়টি কী?**

স্প্রেড (`...`) এবং রেস্ট (`...`) অপারেটর দেখতে একই রকম হলেও, তারা ভিন্ন ভিন্ন কাজ করে এবং ভিন্ন ভিন্ন প্রেক্ষাপটে ব্যবহৃত হয়। দুটোই ES6 এ প্রবর্তিত হয়েছে।

*   **স্প্রেড অপারেটর (Spread Operator):** এটি একটি ইটারেবল (iterable) যেমন অ্যারে বা স্ট্রিং, অথবা একটি অবজেক্টকে তার স্বতন্ত্র এলিমেন্ট বা প্রোপার্টিতে "বিস্তার" (spread out) করে। অর্থাৎ, অ্যারের এলিমেন্টগুলোকে কমা দ্বারা পৃথক করা মানের একটি সিরিজে পরিণত করে অথবা অবজেক্টের প্রোপার্টিগুলোকে অন্য অবজেক্টে কপি করে।
    *   **ব্যবহারের স্থান:** ফাংশন কলে আর্গুমেন্ট হিসেবে, অ্যারে লিটারেলের মধ্যে, অবজেক্ট লিটারেলের মধ্যে।

*   **রেস্ট অপারেটর (Rest Operator):** এটি একাধিক এলিমেন্ট বা প্রোপার্টিকে একটি একক অ্যারে বা অবজেক্টে "সংগ্রহ" (collect) করে। এটি ফাংশন প্যারামিটারে ব্যবহৃত হলে, ফাংশনে পাস করা অতিরিক্ত আর্গুমেন্টগুলোকে একটি অ্যারেতে একত্রিত করে। অবজেক্ট ডিস্ট্রাকচারিংয়ে ব্যবহৃত হলে, বাকি প্রোপার্টিগুলোকে একটি নতুন অবজেক্টে একত্রিত করে।
    *   **ব্যবহারের স্থান:** ফাংশন প্যারামিটারের তালিকায় (সবসময় শেষের প্যারামিটার হিসেবে), অ্যারে ডিস্ট্রাকচারিংয়ে, অবজেক্ট ডিস্ট্রাকচারিংয়ে।

**কেন ব্যবহার করা হয়?**

**স্প্রেড অপারেটর:**

*   **অ্যারে ও অবজেক্টের কপি তৈরি (Shallow copy):** মূল অ্যারে বা অবজেক্ট পরিবর্তন না করে তার একটি নতুন কপি তৈরি করা যায়।
*   **অ্যারে ও অবজেক্ট মার্জ করা:** একাধিক অ্যারে বা অবজেক্টকে সহজে একটি নতুন অ্যারে বা অবজেক্টে একত্রিত করা যায়।
*   **ফাংশনে আর্গুমেন্ট পাস করা:** একটি অ্যারের এলিমেন্টগুলোকে ফাংশনের আর্গুমেন্ট হিসেবে সহজে পাস করা যায়।
*   **স্ট্রিংকে ক্যারেক্টার অ্যারেতে রূপান্তর:** একটি স্ট্রিংকে তার প্রতিটি ক্যারেক্টারের অ্যারেতে পরিণত করা যায়।
*   **Immutability বজায় রাখা:** React এবং Redux এ state আপডেট করার সময়, মূল state অবজেক্ট বা অ্যারের পরিবর্তন না করে নতুন একটি তৈরি করতে স্প্রেড অপারেটর খুব কার্যকর।

**রেস্ট অপারেটর:**

*   **ভেরিয়েবল সংখ্যক আর্গুমেন্ট হ্যান্ডেল করা (Variadic functions):** এমন ফাংশন তৈরি করা যায় যা যেকোনো সংখ্যক আর্গুমেন্ট গ্রহণ করতে পারে।
*   **ডিস্ট্রাকচারিংয়ে বাকি অংশ সংগ্রহ করা:** অবজেক্ট বা অ্যারে ডিস্ট্রাকচার করার সময়, নির্দিষ্ট কিছু ভ্যালু নেওয়ার পর বাকি ভ্যালুগুলোকে একটি একক ভ্যারিয়েবলে (অ্যারে বা অবজেক্ট) সংগ্রহ করা যায়।

**কীভাবে ব্যবহার করা হয়?**

**স্প্রেড অপারেটর (`...`)**

```javascript
// অ্যারের সাথে স্প্রেড
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinedArray = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
console.log("Combined Array:", combinedArray);

const arrCopy = [...arr1]; // [1, 2, 3] (shallow copy)
arrCopy.push(4);
console.log("Original arr1:", arr1); // [1, 2, 3] (পরিবর্তিত হয়নি)
console.log("Copied arrCopy:", arrCopy); // [1, 2, 3, 4]

function sum(x, y, z) {
  return x + y + z;
}
const numbers = [10, 20, 30];
console.log("Sum with spread:", sum(...numbers)); // 60 (sum(10, 20, 30) এর মতো)

// অবজেক্টের সাথে স্প্রেড (ES2018)
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const mergedObject = { ...obj1, ...obj2, e: 5 }; // { a: 1, b: 2, c: 3, d: 4, e: 5 }
console.log("Merged Object:", mergedObject);

const objCopy = { ...obj1, b: 20 }; // প্রোপার্টি ওভাররাইডও করা যায়
console.log("Object Copy with override:", objCopy); // { a: 1, b: 20 }

// স্ট্রিং এর সাথে স্প্রেড
const str = "hello";
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']
console.log("String to chars:", chars);
```

**রেস্ট অপারেটর (`...`)**

```javascript
// ফাংশন প্যারামিটারে রেস্ট
function sumAll(...args) { // args একটি অ্যারেতে সব আর্গুমেন্ট সংগ্রহ করবে
  let total = 0;
  for (const arg of args) {
    total += arg;
  }
  return total;
}
console.log("Sum All (rest):", sumAll(1, 2, 3)); // 6
console.log("Sum All (rest):", sumAll(10, 20, 30, 40)); // 100

function printUser(firstName, lastName, ...details) { // details হবে একটি অ্যারে
  console.log(`Name: ${firstName} ${lastName}`);
  console.log("Details:", details); // details এ থাকবে age এবং city
}
// printUser("John", "Doe", 30, "New York");
// আউটপুট:
// Name: John Doe
// Details: [ 30, 'New York' ]

// অ্যারে ডিস্ট্রাকচারিংয়ে রেস্ট
const letters = ['a', 'b', 'c', 'd', 'e'];
const [firstLetter, secondLetter, ...remainingLetters] = letters;
console.log("First Letter:", firstLetter); // 'a'
console.log("Second Letter:", secondLetter); // 'b'
console.log("Remaining Letters:", remainingLetters); // ['c', 'd', 'e']

// অবজেক্ট ডিস্ট্রাকচারিংয়ে রেস্ট (ES2018)
const person = {
  name: "Alice",
  age: 25,
  city: "London",
  country: "UK"
};
const { name, age, ...addressInfo } = person;
console.log("Name:", name); // "Alice"
console.log("Age:", age); // 25
console.log("Address Info (rest object):", addressInfo); // { city: "London", country: "UK" }
```

**বাস্তব জীবনের উদাহরণ:**

*   **স্প্রেড অপারেটর:**
    *   **অ্যারে/অবজেক্ট কপি:** একটি পুরনো রেসিপি কার্ড (মূল অ্যারে/অবজেক্ট) থেকে হাতে লিখে একটি নতুন কার্ড তৈরি করা, যাতে মূল কার্ডটি অক্ষত থাকে।
    *   **মার্জ করা:** দুটি ভিন্ন শপিং লিস্টের (দুটি অ্যারে) সব আইটেম একটি বড় লিস্টে একত্রিত করা। অথবা, আপনার এবং আপনার বন্ধুর কন্টাক্ট লিস্ট (দুটি অবজেক্ট) মার্জ করে একটি নতুন কন্টাক্ট লিস্ট তৈরি করা।
    *   **ফাংশনে আর্গুমেন্ট:** আপনার কাছে একটি বাক্সে (অ্যারে) তিনটি মার্বেল আছে। আপনি যদি কাউকে বলেন "এই বাক্স থেকে মার্বেলগুলো নাও (`...বাক্স`)", সে তিনটি আলাদা মার্বেল পাবে।

*   **রেস্ট অপারেটর:**
    *   **ফাংশনে আর্গুমেন্ট:** একটি পার্টিতে আপনি প্রথম দু'জন অতিথিকে (নির্দিষ্ট প্যারামিটার) নামে ডাকলেন, আর বাকি সবাইকে ("আপনারা সবাই" - রেস্ট প্যারামিটার) একসাথে মঞ্চে আসতে বললেন।
    *   **ডিস্ট্রাকচারিং:** একটি ফলের ঝুড়ি থেকে আপেল ও কমলা (নির্দিষ্ট ভ্যারিয়েবল) নেওয়ার পর, বাকি সব ফল (রেস্ট ভ্যারিয়েবল) অন্য একটি পাত্রে রাখা।

**React এ ব্যবহার:**

**স্প্রেড অপারেটর:**

*   **State আপডেট (Immutability):** React এ state অবজেক্ট বা অ্যারে সরাসরি পরিবর্তন না করে, তার একটি কপি তৈরি করে পরিবর্তন করা হয়।
    ```javascript
    // অবজেক্ট state আপডেট
    // this.setState(prevState => ({
    //   user: { ...prevState.user, city: "New City" }
    // }));

    // ফাংশনাল কম্পোনেন্টে useState এর সাথে
    // const [form, setForm] = useState({ name: "", email: "" });
    // const handleChange = (e) => {
    //   setForm(prevForm => ({
    //     ...prevForm,
    //     [e.target.name]: e.target.value
    //   }));
    // };

    // অ্যারে state আপডেট (নতুন আইটেম যোগ করা)
    // setItems(prevItems => [...prevItems, newItem]);
    ```
*   **Props ফরওয়ার্ডিং (Props Forwarding):** একটি কম্পোনেন্টের পাওয়া সব props বা কিছু props অন্য একটি চাইল্ড কম্পোনেন্টে পাস করে দেওয়া।
    ```javascript
    function CustomButton(props) {
      // এখানে style বা className props আলাদা করে বাকি props গুলো নেটিভ বাটনে পাস করা হচ্ছে
      const { style, className, ...otherProps } = props;
      return (
        <button style={style} className={`custom-btn ${className || ''}`} {...otherProps}>
          {props.children}
        </button>
      );
    }
    // ব্যবহার: <CustomButton onClick={handleClick} data-id="123">Click Me</CustomButton>
    // onClick এবং data-id {...otherProps} এর মাধ্যমে <button> এ চলে যাবে।
    ```
*   **কম্পোনেন্টে props পাস করা:**
    ```javascript
    // const userProps = { name: "John", age: 30 };
    // <UserProfile {...userProps} city="New York" />
    // এটি <UserProfile name="John" age={30} city="New York" /> এর সমতুল্য
    ```

**রেস্ট অপারেটর:**

*   **Props থেকে নির্দিষ্ট কিছু বাদ দিয়ে বাকিগুলো সংগ্রহ:** উপরের `CustomButton` উদাহরণে `...otherProps` রেস্ট অপারেটরের একটি ভালো উদাহরণ, যেখানে `style` এবং `className` ছাড়া বাকি সব props `otherProps` অবজেক্টে সংগ্রহ করা হচ্ছে।

স্প্রেড এবং রেস্ট অপারেটর আধুনিক JavaScript এবং React ডেভেলপমেন্টের অপরিহার্য অংশ, যা কোডকে আরও সংক্ষিপ্ত, পঠনযোগ্য এবং শক্তিশালী করে।

---

## ৭. Array Methods: `map()`, `filter()`, `find()` (অ্যারে মেথড)

**বিষয়টি কী?**

JavaScript এ অ্যারের সাথে কাজ করার জন্য অনেক বিল্ট-ইন মেথড রয়েছে। `map()`, `filter()`, এবং `find()` হলো তিনটি খুবই গুরুত্বপূর্ণ এবং বহুল ব্যবহৃত হাইয়ার-অর্ডার ফাংশন (higher-order functions), যা অ্যারের প্রতিটি এলিমেন্টের উপর নির্দিষ্ট অপারেশন চালাতে এবং ফলাফল হিসেবে নতুন অ্যারে বা এলিমেন্ট রিটার্ন করতে সাহায্য করে। এরা মূল অ্যারেটিকে পরিবর্তন করে না (immutable operations)।

*   **`map()`:** একটি অ্যারের প্রতিটি এলিমেন্টের উপর একটি প্রদত্ত ফাংশন (কলব্যাক ফাংশন) প্রয়োগ করে এবং সেই ফাংশনের রিটার্ন করা মানগুলো নিয়ে একটি **নতুন অ্যারে** তৈরি করে। নতুন অ্যারের দৈর্ঘ্য মূল অ্যারের সমান হয়।
*   **`filter()`:** একটি অ্যারের প্রতিটি এলিমেন্টের উপর একটি প্রদত্ত ফাংশন (কলব্যাক ফাংশন, যা `true` বা `false` রিটার্ন করে) প্রয়োগ করে। যে এলিমেন্টগুলোর জন্য কলব্যাক ফাংশন `true` রিটার্ন করে, শুধুমাত্র সেই এলিমেন্টগুলো নিয়ে একটি **নতুন অ্যারে** তৈরি করে। নতুন অ্যারের দৈর্ঘ্য মূল অ্যারের সমান বা কম হতে পারে।
*   **`find()`:** একটি অ্যারের প্রতিটি এলিমেন্টের উপর একটি প্রদত্ত ফাংশন (কলব্যাক ফাংশন, যা `true` বা `false` রিটার্ন করে) প্রয়োগ করে। যে **প্রথম** এলিমেন্টের জন্য কলব্যাক ফাংশন `true` রিটার্ন করে, সেই **এলিমেন্টটিকেই** রিটার্ন করে। যদি কোনো এলিমেন্ট শর্ত পূরণ না করে, তাহলে `undefined` রিটার্ন করে।

**কেন ব্যবহার করা হয়?**

*   **পঠনযোগ্য এবং ঘোষণামূলক কোড (Declarative Code):** লুপ (যেমন `for` লুপ) ব্যবহার করে ম্যানুয়ালি অ্যারে পুনরাবৃত্তি এবং শর্ত পরীক্ষার চেয়ে এই মেথডগুলো অনেক বেশি সংক্ষিপ্ত এবং কী করা হচ্ছে তা স্পষ্টভাবে বোঝায়।
*   **Immutability:** এরা মূল অ্যারে পরিবর্তন করে না, বরং নতুন অ্যারে (বা `find` এর ক্ষেত্রে এলিমেন্ট) রিটার্ন করে। এটি ফাংশনাল প্রোগ্রামিংয়ের একটি গুরুত্বপূর্ণ নীতি এবং React এর মতো লাইব্রেরিতে state ব্যবস্থাপনার জন্য অপরিহার্য।
*   **চেইনেবিলিটি (Chainability):** এই মেথডগুলো একটির পর একটি চেইন করে ব্যবহার করা যায় (যেমন, `array.filter(...).map(...)`), যা জটিল ডেটা ট্রান্সফরমেশনকে সহজ করে।
*   **কম বাগ:** লুপের চেয়ে কম কোড লিখতে হয় বলে ভুলের সম্ভাবনা কমে।

**কীভাবে ব্যবহার করা হয়?**

প্রতিটি মেথড একটি কলব্যাক ফাংশন গ্রহণ করে। এই কলব্যাক ফাংশনটি তিনটি আর্গুমেন্ট পেতে পারে:
1.  `currentValue`: অ্যারের বর্তমান এলিমেন্ট যা প্রসেস করা হচ্ছে।
2.  `index` (ঐচ্ছিক): বর্তমান এলিমেন্টের ইনডেক্স।
3.  `array` (ঐচ্ছিক): যে অ্যারের উপর মেথডটি কল করা হয়েছে।

**`map()` উদাহরণ:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// প্রতিটি সংখ্যাকে দ্বিগুণ করা
const doubledNumbers = numbers.map(function(number) {
  return number * 2;
});
// অ্যারো ফাংশন দিয়ে সংক্ষিপ্ত রূপে:
// const doubledNumbers = numbers.map(number => number * 2);
console.log("Doubled Numbers (map):", doubledNumbers); // আউটপুট: [2, 4, 6, 8, 10]
console.log("Original Numbers:", numbers); // আউটপুট: [1, 2, 3, 4, 5] (পরিবর্তিত হয়নি)

const users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 }
];

// শুধুমাত্র ব্যবহারকারীদের নাম নিয়ে একটি নতুন অ্যারে তৈরি করা
const userNames = users.map(user => user.name);
console.log("User Names (map):", userNames); // আউটপুট: ["Alice", "Bob", "Charlie"]

// প্রতিটি ইউজারের জন্য একটি স্ট্রিং তৈরি করা
const userGreetings = users.map(user => `Hello, ${user.name}! You are ${user.age}.`);
console.log("User Greetings (map):", userGreetings);
/*
আউটপুট:
[
  "Hello, Alice! You are 30.",
  "Hello, Bob! You are 25.",
  "Hello, Charlie! You are 35."
]
*/
```

**`filter()` উদাহরণ:**

```javascript
const numbersList = [10, 15, 20, 25, 30, 35, 40];

// শুধুমাত্র জোড় সংখ্যাগুলো ফিল্টার করা
const evenNumbers = numbersList.filter(function(number) {
  return number % 2 === 0;
});
// অ্যারো ফাংশন দিয়ে:
// const evenNumbers = numbersList.filter(number => number % 2 === 0);
console.log("Even Numbers (filter):", evenNumbers); // আউটপুট: [10, 20, 30, 40]

const products = [
  { id: 'a1', name: "Laptop", price: 1200, inStock: true },
  { id: 'b2', name: "Mouse", price: 25, inStock: false },
  { id: 'c3', name: "Keyboard", price: 75, inStock: true },
  { id: 'd4', name: "Monitor", price: 300, inStock: true }
];

// শুধুমাত্র যে প্রোডাক্টগুলো স্টকে আছে এবং দাম ১০০ এর বেশি
const availableExpensiveProducts = products.filter(product => product.inStock && product.price > 100);
console.log("Available Expensive Products (filter):", availableExpensiveProducts);
/*
আউটপুট:
[
  { id: 'a1', name: "Laptop", price: 1200, inStock: true },
  { id: 'd4', name: "Monitor", price: 300, inStock: true }
]
*/
```

**`find()` উদাহরণ:**

```javascript
const numberSet = [11, 22, 33, 44, 55];

// প্রথম যে সংখ্যাটি ৩০ এর চেয়ে বড়, সেটি খুঁজে বের করা
const firstNumberGreaterThan30 = numberSet.find(function(number) {
  return number > 30;
});
// অ্যারো ফাংশন দিয়ে:
// const firstNumberGreaterThan30 = numberSet.find(number => number > 30);
console.log("First number > 30 (find):", firstNumberGreaterThan30); // আউটপুট: 33

const students = [
  { id: 101, name: "Eve", grade: "A" },
  { id: 102, name: "David", grade: "B" },
  { id: 103, name: "Frank", grade: "A" }
];

// নির্দিষ্ট আইডি'র ছাত্রকে খুঁজে বের করা
const studentWithId102 = students.find(student => student.id === 102);
console.log("Student with ID 102 (find):", studentWithId102);
// আউটপুট: { id: 102, name: "David", grade: "B" }

const nonExistentStudent = students.find(student => student.id === 999);
console.log("Non-existent student (find):", nonExistentStudent); // আউটপুট: undefined
```

**বাস্তব জীবনের উদাহরণ:**

*   **`map()`:**
    *   একটি ক্লাসের সব ছাত্রের (অ্যারে) পরীক্ষার নম্বরকে গ্রেডে (যেমন, ৯০+ হলে A+) রূপান্তর করে একটি নতুন লিস্ট (নতুন অ্যারে) তৈরি করা।
    *   একটি শপিং লিস্টের (অ্যারে) প্রতিটি আইটেমের নামের পাশে তার দাম যোগ করে একটি নতুন ফরম্যাটেড লিস্ট তৈরি করা।

*   **`filter()`:**
    *   একটি লাইব্রেরির সব বইয়ের (অ্যারে) তালিকা থেকে শুধুমাত্র "বিজ্ঞান কল্পকাহিনী" ক্যাটাগরির বইগুলো আলাদা করে একটি নতুন তালিকা তৈরি করা।
    *   একটি ইমেইল ইনবক্সের (অ্যারে) সব ইমেইল থেকে শুধুমাত্র অপঠিত (unread) ইমেইলগুলো খুঁজে বের করা।

*   **`find()`:**
    *   একটি ফোনবুকের (অ্যারে) কন্টাক্ট লিস্ট থেকে নির্দিষ্ট নামে প্রথম যে কন্টাক্টটি পাওয়া যায়, সেটি খুঁজে বের করা।
    *   একটি দোকানের পণ্যের তালিকা (অ্যারে) থেকে একটি নির্দিষ্ট বারকোডের পণ্যটি খুঁজে বের করা।

**React এ ব্যবহার:**

React এ, বিশেষ করে JSX এর মধ্যে লিস্ট রেন্ডার করার জন্য `map()` খুবই অপরিহার্য। `filter()` ডেটা প্রদর্শনের আগে ফিল্টার করতে এবং `find()` নির্দিষ্ট কোনো আইটেম খুঁজে বের করতে ব্যবহৃত হয়।

```javascript
import React, { useState } from 'react';

const initialTodos = [
  { id: 1, text: "Learn JavaScript", completed: true },
  { id: 2, text: "Learn React", completed: false },
  { id: 3, text: "Build a project", completed: false },
  { id: 4, text: "Deploy the project", completed: false }
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [filterType, setFilterType] = useState('all'); // 'all', 'active', 'completed'

  // map() ব্যবহার করে JSX এ লিস্ট রেন্ডার করা
  const renderedTodos = todos
    .filter(todo => { // filter() ব্যবহার করে শর্ত অনুযায়ী todo দেখানো
      if (filterType === 'active') return !todo.completed;
      if (filterType === 'completed') return todo.completed;
      return true; // 'all'
    })
    .map(todo => (
      <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
      </li>
    ));

  // find() ব্যবহার করে নির্দিষ্ট todo খুঁজে তার completed স্ট্যাটাস পরিবর্তন করা
  const toggleComplete = (idToToggle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // একটি নির্দিষ্ট todo খুঁজে তার বিস্তারিত দেখানো (কাল্পনিক উদাহরণ)
  // const specificTodo = todos.find(todo => todo.id === 2);
  // console.log("Specific todo details:", specificTodo);

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        Filter:
        <button onClick={() => setFilterType('all')}>All</button>
        <button onClick={() => setFilterType('active')}>Active</button>
        <button onClick={() => setFilterType('completed')}>Completed</button>
      </div>
      <ul>{renderedTodos}</ul>
      {/* {specificTodo && <p>Details of todo ID 2: {specificTodo.text}</p>} */}
    </div>
  );
}

export default TodoList;
```
এই মেথডগুলো ডেটা ম্যানিপুলেশন এবং UI রেন্ডারিংকে অনেক সহজ ও কার্যকর করে তোলে।

---

## ৮. Ternary Operators & Logical `&&` (টারনারি অপারেটর এবং লজিক্যাল `&&`)

**বিষয়টি কী?**

টারনারি অপারেটর এবং লজিক্যাল `&&` (AND) অপারেটর হলো JavaScript এ শর্তসাপেক্ষে (conditionally) কোড এক্সিকিউট বা মান নির্ধারণ করার সংক্ষিপ্ত পদ্ধতি। এগুলো বিশেষ করে JSX এর মধ্যে কন্ডিশনাল রেন্ডারিংয়ের জন্য খুবই জনপ্রিয়।

*   **টারনারি অপারেটর (Ternary Operator - `condition ? exprIfTrue : exprIfFalse`):** এটি JavaScript এর একমাত্র অপারেটর যা তিনটি অপারেন্ড (operand) নেয়। একটি শর্ত (condition) মূল্যায়ন করা হয়। যদি শর্তটি সত্য (`true`) হয়, তাহলে প্রথম এক্সপ্রেশন (`exprIfTrue`) এর মান রিটার্ন করা হয়; অন্যথায় (শর্তটি মিথ্যা বা `false` হলে) দ্বিতীয় এক্সপ্রেশন (`exprIfFalse`) এর মান রিটার্ন করা হয়। এটি `if-else` স্টেটমেন্টের একটি সংক্ষিপ্ত রূপ।

*   **লজিক্যাল `&&` অপারেটর (Logical AND - `condition && expression`):** এই অপারেটরটি সাধারণত দুটি বুলিয়ান মান পরীক্ষা করার জন্য ব্যবহৃত হয়, কিন্তু কন্ডিশনাল রেন্ডারিংয়ের ক্ষেত্রে এর একটি বিশেষ ব্যবহার আছে। যদি বাম পাশের `condition` টি "truthy" (সত্য হিসেবে গণ্য) হয়, তাহলে `&&` অপারেটরটি ডান পাশের `expression` কে মূল্যায়ন করে এবং তার মান রিটার্ন করে। যদি `condition` টি "falsy" (মিথ্যা হিসেবে গণ্য, যেমন `false`, `0`, `''`, `null`, `undefined`, `NaN`) হয়, তাহলে `condition` এরই মান রিটার্ন করা হয় এবং ডান পাশের `expression` টি মূল্যায়ন করা হয় না (short-circuiting)।

**কেন ব্যবহার করা হয়?**

*   **সংক্ষিপ্ততা:** `if-else` স্টেটমেন্ট বা `if` স্টেটমেন্টের চেয়ে অনেক কম কোডে একই কাজ করা যায়।
*   **ইনলাইন কন্ডিশন (Inline Conditions):** JSX এর মতো জায়গায়, যেখানে স্টেটমেন্ট (যেমন `if-else`) সরাসরি লেখা যায় না, সেখানে এক্সপ্রেশন হিসেবে টারনারি অপারেটর বা লজিক্যাল `&&` ব্যবহার করা যায়।
*   **পঠনযোগ্যতা (ছোট কন্ডিশনের জন্য):** ছোট এবং সহজ কন্ডিশনের ক্ষেত্রে এটি কোডকে আরও পঠনযোগ্য করতে পারে। তবে জটিল কন্ডিশনের জন্য এটি反而 দুর্বোধ্য হয়ে যেতে পারে।

**কীভাবে ব্যবহার করা হয়?**

**টারনারি অপারেটর:**

```javascript
const age = 20;
let message;

// if-else ব্যবহার করে
if (age >= 18) {
  message = "You are an adult.";
} else {
  message = "You are a minor.";
}
console.log("If-else message:", message);

// টারনারি অপারেটর ব্যবহার করে
const ternaryMessage = age >= 18 ? "You are an adult." : "You are a minor.";
console.log("Ternary message:", ternaryMessage); // "You are an adult."

const isAuthenticated = true;
const userName = "Alice";

const greeting = isAuthenticated ? `Hello, ${userName}!` : "Hello, Guest!";
console.log(greeting); // "Hello, Alice!"

// নেস্টেড টারনারি (পঠনযোগ্যতা কমে যেতে পারে, সাবধানে ব্যবহার করুন)
const score = 75;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" : "D";
console.log("Grade:", grade); // "C"
```

**লজিক্যাল `&&` অপারেটর (কন্ডিশনাল রেন্ডারিংয়ের জন্য):**

```javascript
const isLoggedIn = true;
const userProfile = { name: "Bob" };
let welcomeMessage;

// if স্টেটমেন্ট ব্যবহার করে
if (isLoggedIn) {
  // welcomeMessage = `Welcome back, ${userProfile.name}!`; (JSX এ এভাবে লেখা যায় না)
}

// লজিক্যাল && ব্যবহার করে (JSX এ যেভাবে ব্যবহৃত হয়)
// const displayWelcome = isLoggedIn && <p>Welcome back, {userProfile.name}!</p>;
// এখানে displayWelcome একটি JSX এলিমেন্ট হবে যদি isLoggedIn সত্য হয়, নতুবা false হবে।

// সাধারণ JavaScript এ উদাহরণ
const itemsInCart = 5;
// যদি itemsInCart > 0 হয়, তাহলে "Proceed to Checkout" মেসেজ দেখাও
const checkoutButton = itemsInCart > 0 && "Proceed to Checkout";
console.log(checkoutButton); // "Proceed to Checkout"

const itemsInCartZero = 0;
const checkoutButtonZero = itemsInCartZero > 0 && "Proceed to Checkout";
console.log(checkoutButtonZero); // 0 (কারণ itemsInCartZero একটি falsy ভ্যালু)

// মনে রাখবেন: && অপারেটর বাম পাশের অপারেন্ড falsy হলে সেটিকেই রিটার্ন করে।
// React এ এটি সমস্যা করে না কারণ false, 0, null, undefined JSX এ রেন্ডার হয় না।
// কিন্তু '' (খালি স্ট্রিং) রেন্ডার হতে পারে বা সমস্যা করতে পারে।
// তাই কন্ডিশনটি বুলিয়ান (true/false) হওয়া ভালো।
// যেমন: Boolean(itemsInCartZero > 0) && "Proceed to Checkout"
```

**বাস্তব জীবনের উদাহরণ:**

*   **টারনারি অপারেটর:**
    *   একটি লাইট সুইচ: যদি সুইচ অন (`true`) থাকে, লাইট জ্বলবে (`exprIfTrue`); যদি অফ (`false`) থাকে, লাইট নিভে থাকবে (`exprIfFalse`)।
    *   একটি পরীক্ষার ফলাফল: যদি পাস নম্বর (`condition`) পায়, তাহলে "উত্তীর্ণ" (`exprIfTrue`); না পেলে "অনুত্তীর্ণ" (`exprIfFalse`)।

*   **লজিক্যাল `&&`:**
    *   গাড়ি চালানোর অনুমতি: যদি আপনার লাইসেন্স থাকে (`condition`) **এবং** আপনি সুস্থ থাকেন (`expression`), তাহলে আপনি গাড়ি চালাতে পারবেন। যদি লাইসেন্স না থাকে, দ্বিতীয় শর্ত (সুস্থতা) আর পরীক্ষাই করা হবে না। (এখানে `expression` এর পরিবর্তে একটি কাজ করা হচ্ছে)
    *   একটি বিশেষ অফার: যদি আপনি একজন প্রিমিয়াম কাস্টমার হন (`condition`), তাহলে আপনি একটি ডিসকাউন্ট পাবেন (`expression`)। সাধারণ কাস্টমার হলে ডিসকাউন্টের প্রসঙ্গই আসবে না।

**React এ ব্যবহার:**

React এ JSX এর মধ্যে কন্ডিশনালভাবে এলিমেন্ট রেন্ডার করার জন্য এই অপারেটরগুলো খুবই কার্যকর।

```javascript
import React, { useState } from 'react';

function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // user: { name: "Test User", hasNotifications: true, notificationCount: 5 }

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: "Test User", hasNotifications: true, notificationCount: 5 });
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      <h2>User Authentication</h2>
      {/* টারনারি অপারেটর: লগইন বা লগআউট বাটন দেখানো */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      {/* লজিক্যাল &&: ইউজার লগইন করা থাকলে ওয়েলকাম মেসেজ দেখানো */}
      {isLoggedIn && user && (
        <div>
          <p>Welcome, {user.name}!</p>

          {/* লজিক্যাল &&: নোটিফিকেশন থাকলে দেখানো */}
          {user.hasNotifications && user.notificationCount > 0 && (
            <p>You have {user.notificationCount} new notifications.</p>
          )}

          {/* টারনারি: নোটিফিকেশন কাউন্ট এর উপর ভিত্তি করে মেসেজ */}
          {user.hasNotifications ? (
            user.notificationCount > 0 ? (
              <span>Check them out!</span>
            ) : (
              <span>No new notifications.</span>
            )
          ) : (
            <span>Notifications are off.</span>
          )}
        </div>
      )}

      {/* একটি সাধারণ উদাহরণ: লোডিং স্টেট */}
      {/* {isLoading ? <p>Loading...</p> : <DataComponent data={data} />} */}
    </div>
  );
}

export default AuthStatus;
```
JSX এর মধ্যে `{}` ব্যবহার করে JavaScript এক্সপ্রেশন লেখা যায়। টারনারি অপারেটর এবং লজিক্যাল `&&` অপারেটর এক্সপ্রেশন রিটার্ন করে, তাই এগুলো JSX এ কন্ডিশনাল রেন্ডারিংয়ের জন্য আদর্শ।

**কখন কোনটা ব্যবহার করবেন:**

*   **টারনারি অপারেটর:** যখন আপনার একটি `if-else` ধরনের লজিক দরকার, অর্থাৎ শর্ত সত্য হলে একটি জিনিস এবং মিথ্যা হলে অন্য একটি জিনিস রেন্ডার করতে চান।
*   **লজিক্যাল `&&`:** যখন আপনার একটি `if` ধরনের লজিক দরকার, অর্থাৎ শর্ত সত্য হলেই কেবল একটি জিনিস রেন্ডার করতে চান, মিথ্যা হলে কিছু রেন্ডার করতে চান না।

সাবধানতা: `&&` অপারেটরের বাম পাশে যদি এমন কোনো falsy মান (যেমন `0` বা `NaN`) থাকে যা আপনি রেন্ডার করতে চান না, তাহলে সেটি UI তে দেখা যেতে পারে। এটি এড়াতে, বাম পাশের কন্ডিশনটিকে একটি সুস্পষ্ট বুলিয়ান মানে ( `true` বা `false`) রূপান্তর করে নেওয়া ভালো, যেমন `Boolean(condition) && ...` অথবা `!!condition && ...`। তবে React সাধারণত `0` রেন্ডার করে না, কিন্তু `NaN` বা খালি স্ট্রিং সমস্যা তৈরি করতে পারে।

---

## ৯. Optional Chaining (`?.`) (অপশনাল চেইনিং)

**বিষয়টি কী?**

অপশনাল চেইনিং (`?.`) হলো ES2020 (ES11) এ প্রবর্তিত একটি অপারেটর। এটি একটি অবজেক্টের গভীরে নেস্টেড (nested) প্রোপার্টি অ্যাক্সেস করার সময়, চেইনের কোনো একটি প্রোপার্টি `null` বা `undefined` হলে যেন ত্রুটি (TypeError) না ঘটে, তা নিশ্চিত করে। যদি চেইনের কোনো একটি অংশ `null` বা `undefined` হয়, তাহলে পুরো এক্সপ্রেশনটি সেখানেই থেমে যায় এবং `undefined` রিটার্ন করে, কোনো ত্রুটি থ্রো না করে।

এটি তিন ধরনের অপারেশনের সাথে ব্যবহার করা যায়:

1.  **অবজেক্ট প্রোপার্টি অ্যাক্সেস:** `obj?.property`
2.  **অ্যারে এলিমেন্ট অ্যাক্সেস:** `arr?.[index]`
3.  **ফাংশন বা মেথড কল:** `func?.(args)` বা `obj.method?.(args)`

**কেন ব্যবহার করা হয়?**

*   **ত্রুটি প্রতিরোধ (Error Prevention):** সবচেয়ে বড় সুবিধা হলো এটি `TypeError: Cannot read property '...' of null/undefined` ধরনের সাধারণ ত্রুটি থেকে রক্ষা করে। আগে এই ধরনের পরিস্থিতি সামলাতে লম্বা কন্ডিশনাল চেইন (`user && user.profile && user.profile.address`) বা `try...catch` ব্লক ব্যবহার করতে হতো।
*   **কোডের পঠনযোগ্যতা বৃদ্ধি (Improved Readability):** কোড অনেক সংক্ষিপ্ত এবং পরিষ্কার হয়। দীর্ঘ কন্ডিশনাল চেকের চেয়ে `user?.profile?.address?.street` অনেক সহজবোধ্য।
*   **সহজ ডেটা অ্যাক্সেস:** বিশেষ করে যখন API থেকে ডেটা আসে, যেখানে কিছু প্রোপার্টি ঐচ্ছিক (optional) হতে পারে, তখন অপশনাল চেইনিং খুবই কার্যকর।

**কীভাবে ব্যবহার করা হয়?**

```javascript
const user = {
  id: 1,
  name: "Alice",
  profile: {
    age: 30,
    address: {
      street: "123 Main St",
      city: "Wonderland"
    },
    // getBio ফাংশনটি এখানে নেই
  },
  // getPosts ফাংশনটি এখানে আছে
  getPosts: () => ["Post 1", "Post 2"]
};

const userWithoutProfile = {
  id: 2,
  name: "Bob"
  // কোনো profile অবজেক্ট নেই
};

const userWithNullAddress = {
  id: 3,
  name: "Charlie",
  profile: {
    age: 25,
    address: null // address এখানে null
  }
};

// 1. অবজেক্ট প্রোপার্টি অ্যাক্সেস
// পুরানো পদ্ধতি (ত্রুটি হতে পারে বা লম্বা চেক)
// const streetOld = user.profile.address.street; // যদি কোনো অংশ undefined হয়, TypeError দেবে
// const citySafeOld = userWithoutProfile.profile && userWithoutProfile.profile.address && userWithoutProfile.profile.address.city;

// অপশনাল চেইনিং ব্যবহার করে
const street = user?.profile?.address?.street;
console.log("Street:", street); // "123 Main St"

const city = userWithoutProfile?.profile?.address?.city;
console.log("City (userWithoutProfile):", city); // undefined (কোনো ত্রুটি নেই)

const country = userWithNullAddress?.profile?.address?.country;
console.log("Country (userWithNullAddress):", country); // undefined (কারণ address is null)

// 2. অ্যারে এলিমেন্ট অ্যাক্সেস
const firstPost = user?.posts?.[0]; // user.posts এখানে নেই, তাই undefined
console.log("First Post (user):", firstPost); // undefined

const userWithPosts = {
    posts: ["My first article", "My second journey"]
};
const firstArticle = userWithPosts?.posts?.[0];
console.log("First Article (userWithPosts):", firstArticle); // "My first article"

const noPostsArray = { posts: null };
const firstItemFromNull = noPostsArray?.posts?.[0];
console.log("First item from null posts:", firstItemFromNull); // undefined

// 3. ফাংশন বা মেথড কল
// user.profile এ getBio নামে কোনো মেথড নেই
const bio = user?.profile?.getBio?.();
console.log("Bio:", bio); // undefined

// user এ getPosts মেথড আছে
const posts = user?.getPosts?.();
console.log("Posts:", posts); // ["Post 1", "Post 2"]

const userWithoutGetPostsMethod = { name: "Dave" };
const davePosts = userWithoutGetPostsMethod?.getPosts?.();
console.log("Dave's Posts:", davePosts); // undefined


// Nullish Coalescing Operator (??) এর সাথে ব্যবহার
// যদি street undefined হয়, তাহলে "Street not available" দেখাবে
const displayStreet = userWithoutProfile?.profile?.address?.street ?? "Street not available";
console.log("Display Street:", displayStreet); // "Street not available"
```

**বাস্তব জীবনের উদাহরণ:**

ধরুন, আপনি একটি লাইব্রেরিতে একটি নির্দিষ্ট বই (`book`), তার নির্দিষ্ট অধ্যায় (`chapter`), সেই অধ্যায়ের নির্দিষ্ট প্যারাগ্রাফ (`paragraph`) এবং সেই প্যারাগ্রাফের প্রথম বাক্যটি (`firstSentence`) খুঁজছেন।

*   **অপশনাল চেইনিং ছাড়া:** আপনাকে প্রথমে দেখতে হবে বইটা আছে কিনা, তারপর অধ্যায় আছে কিনা, তারপর প্যারাগ্রাফ আছে কিনা – এর যেকোনো একটি না থাকলে প্রোগ্রাম ক্র্যাশ করতে পারে। এটা অনেকটা প্রতি ধাপে জিজ্ঞাসা করার মতো, "বইটা কি আছে? হ্যাঁ। আচ্ছা, এই অধ্যায়টা কি আছে? হ্যাঁ। এই প্যারাগ্রাফটা কি আছে? না।" – এখানেই সমস্যা!
*   **অপশনাল চেইনিং সহ (`book?.chapter?.paragraph?.firstSentence`):** আপনি সরাসরি জিজ্ঞাসা করছেন, "বইয়ের এই অধ্যায়ের এই প্যারাগ্রাফের প্রথম বাক্যটি দাও, যদি এর কোনো একটি অংশ না থাকে, তাহলে আমাকে শুধু 'নেই' (undefined) বলে দাও।" যদি বই, অধ্যায় বা প্যারাগ্রাফ কোনোটি না পাওয়া যায়, আপনি কোনো ঝামেলা ছাড়াই `undefined` পাবেন।

**React এ ব্যবহার:**

React কম্পোনেন্টে props বা state থেকে ডেটা অ্যাক্সেস করার সময় অপশনাল চেইনিং খুবই উপকারী, বিশেষ করে যখন ডেটা অ্যাসিঙ্ক্রোনাসভাবে লোড হয় অথবা ডেটা স্ট্রাকচার পরিবর্তনশীল হতে পারে।

```javascript
import React, { useState, useEffect } from 'react';

// কাল্পনিক API কল
const fetchUserData = (userId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({
          id: 1,
          name: "Samantha",
          details: {
            email: "samantha@example.com",
            preferences: {
              theme: "dark",
              notifications: {
                emailEnabled: true,
                pushEnabled: false
              }
            }
          },
          // orders property নেই
        });
      } else if (userId === 2) {
        resolve({
          id: 2,
          name: "Robert",
          // details property নেই
          orders: [
            { id: 101, item: "Book" },
            { id: 102, item: "Pen" }
          ]
        });
      } else {
        resolve(null); // ইউজার পাওয়া যায়নি
      }
    }, 1000);
  });
};

function UserDetails({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUserData(userId)
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  // userData null হতে পারে, তাই অপশনাল চেইনিং এখানেও জরুরি
  if (!userData) {
    return <p>User not found.</p>;
  }

  // অপশনাল চেইনিং ব্যবহার করে নিরাপদে ডেটা অ্যাক্সেস
  const userName = userData?.name;
  const userEmail = userData?.details?.email; // details নাও থাকতে পারে
  const themePreference = userData?.details?.preferences?.theme ?? 'light'; // Nullish Coalescing দিয়ে ডিফল্ট ভ্যালু
  const isPushEnabled = userData?.details?.preferences?.notifications?.pushEnabled;
  const firstOrder = userData?.orders?.[0]?.item; // orders এবং তার প্রথম এলিমেন্ট নাও থাকতে পারে

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userName || 'N/A'}</p>
      <p>Email: {userEmail || 'N/A'}</p>
      <p>Theme: {themePreference}</p>
      <p>Push Notifications: {isPushEnabled === undefined ? 'N/A' : isPushEnabled ? 'Enabled' : 'Disabled'}</p>
      <p>First Order Item: {firstOrder || 'No orders found'}</p>

      {/* ফাংশন কল এর সাথে অপশনাল চেইনিং (যদি userData.formatAddress একটি ফাংশন হয়) */}
      {/* <p>Address: {userData?.formatAddress?.() ?? 'Address not available'}</p> */}
    </div>
  );
}

// export default UserDetails;
// <UserDetails userId={1} /> অথবা <UserDetails userId={2} /> অথবা <UserDetails userId={3} />
```
অপশনাল চেইনিং কোডকে আরও শক্তিশালী (robust) এবং ত্রুটি-সহনশীল (error-tolerant) করে তোলে, যা আধুনিক ওয়েব ডেভেলপমেন্টে খুবই গুরুত্বপূর্ণ।

---

## ১০. `null`, `undefined`, `false` Handling in JSX (JSX এ `null`, `undefined`, `false` হ্যান্ডলিং)

**বিষয়টি কী?**

React এর JSX এ, কিছু নির্দিষ্ট JavaScript ভ্যালু রেন্ডার করার সময় বিশেষ আচরণ দেখা যায়। `null`, `undefined`, এবং `false` এই তিনটি ভ্যালু JSX এর মধ্যে সরাসরি ব্যবহার করা হলে, তারা DOM এ কোনো আউটপুট তৈরি করে না। অর্থাৎ, তারা "কিছুই রেন্ডার করে না"। এটি কন্ডিশনাল রেন্ডারিংয়ের জন্য খুবই সুবিধাজনক।

অন্যদিকে, `0` (শূন্য সংখ্যা), `NaN` (Not-a-Number), এবং `''` (খালি স্ট্রিং) এর মতো "falsy" ভ্যালুগুলো JSX এ রেন্ডার **হয়**।

**কেন এই আচরণ গুরুত্বপূর্ণ?**

*   **ক্লিন কন্ডিশনাল রেন্ডারিং:** এই আচরণের কারণে, লজিক্যাল `&&` অপারেটর ব্যবহার করে খুব সহজেই কন্ডিশনালভাবে কম্পোনেন্ট বা এলিমেন্ট রেন্ডার করা যায়। যদি কন্ডিশন মিথ্যা হয়, `&&` এর বাম পাশের falsy ভ্যালু (যেমন `false`) রিটার্ন হয়, এবং React সেটি রেন্ডার করে না।
    ```jsx
    {showComponent && <MyComponent />}
    // যদি showComponent false হয়, তাহলে false রিটার্ন হবে, যা রেন্ডার হবে না।
    ```
*   **অপ্রয়োজনীয় DOM এলিমেন্ট পরিহার:** যখন কোনো কিছু দেখানোর প্রয়োজন নেই, তখন `null` রিটার্ন করে সহজেই সেই অংশটুকু রেন্ডারিং থেকে বাদ দেওয়া যায়।
*   **ত্রুটিপূর্ণ রেন্ডারিং এড়ানো:** যদি কোনো ভ্যারিয়েবলের মান অনিচ্ছাকৃতভাবে `0` বা `''` হয় এবং আপনি সেটি রেন্ডার করতে না চান, তাহলে এই পার্থক্যটি বোঝা জরুরি।

**কীভাবে এটি কাজ করে এবং কীভাবে হ্যান্ডেল করতে হয়?**

**যে ভ্যালুগুলো JSX এ রেন্ডার হয় না:**

*   `null`
*   `undefined`
*   `boolean false`

```javascript
function ConditionalRenderExample() {
  const showNothing = null;
  const alsoNothing = undefined;
  const isNotVisible = false;

  return (
    <div>
      <p>Content before null: [{showNothing}]</p> {/* আউটপুট: Content before null: [] */}
      <p>Content before undefined: [{alsoNothing}]</p> {/* আউটপুট: Content before undefined: [] */}
      <p>Content before false: [{isNotVisible}]</p> {/* আউটপুট: Content before false: [] */}

      {/* কন্ডিশনাল রেন্ডারিংয়ের সাধারণ ব্যবহার */}
      {isNotVisible && <p>This will not be rendered.</p>}
      {null && <p>This also not rendered.</p>}
      {undefined && <p>And this too.</p>}
    </div>
  );
}
```

**যে "falsy" ভ্যালুগুলো JSX এ রেন্ডার হয়:**

*   `0` (সংখ্যা শূন্য)
*   `NaN` (Not-a-Number)
*   `''` (খালি স্ট্রিং - যদিও এটি টেকনিক্যালি "কিছুই না" দেখায়, এটি DOM এ একটি খালি টেক্সট নোড তৈরি করতে পারে, যা অপ্রত্যাশিত হতে পারে)

```javascript
function FalsyRenderExample() {
  const count = 0;
  const notANumber = NaN;
  const emptyString = ""; // এটি সাধারণত সমস্যা করে না, কিন্তু জানা ভালো

  return (
    <div>
      <p>Count is: {count}</p> {/* আউটপুট: Count is: 0 */}
      <p>Not a Number: {notANumber}</p> {/* আউটপুট: Not a Number: NaN */}
      <p>Empty string: [{emptyString}]</p> {/* আউটপুট: Empty string: [] (DOM এ খালি টেক্সট নোড) */}

      {/* && অপারেটরের সাথে সমস্যা হতে পারে যদি বাম পাশে 0 থাকে */}
      {/* ধরা যাক, একটি অ্যারের দৈর্ঘ্য 0, এবং আপনি মেসেজ দেখাতে চান যদি দৈর্ঘ্য > 0 হয় */}
      const messages = [];
      // return (
      //   <div>
      //     {messages.length && <p>You have messages.</p>} {/* messages.length এখানে 0, তাই 0 রেন্ডার হবে */}
      //   </div>
      // );
      // সঠিক উপায়: messages.length > 0 && <p>You have messages.</p> (এটি false রিটার্ন করবে)
      // অথবা: !!messages.length && <p>You have messages.</p>
    </div>
  );
}
```

**হ্যান্ডলিংয়ের কৌশল:**

1.  **সুস্পষ্ট বুলিয়ান কন্ডিশন ব্যবহার:** লজিক্যাল `&&` এর বাম পাশে সবসময় একটি সুস্পষ্ট বুলিয়ান (`true` বা `false`) মান ব্যবহার করা ভালো।
    ```jsx
    const messages = [];
    // না করে: {messages.length && <Notification />}
    // করুন: {messages.length > 0 && <Notification />}
    // অথবা: {Boolean(messages.length) && <Notification />}
    // অথবা: {!!messages.length && <Notification />}
    ```

2.  **টারনারি অপারেটর ব্যবহার:** যখন আপনি `0` বা অন্যান্য falsy ভ্যালু রেন্ডার করতে চান না, কিন্তু অন্য কিছু রেন্ডার করতে চান, তখন টারনারি অপারেটর একটি ভালো বিকল্প।
    ```jsx
    const itemCount = 0;
    // return <p>Items: {itemCount ? itemCount : 'None'}</p>; // Items: None
    // অথবা যদি 0 দেখাতে চান:
    // return <p>Items: {itemCount !== null && itemCount !== undefined ? itemCount : 'N/A'}</p>;
    ```

3.  **`null` রিটার্ন করা:** কোনো কম্পোনেন্ট বা তার অংশবিশেষ রেন্ডার করতে না চাইলে ফাংশন বা কম্পোনেন্ট থেকে `null` রিটার্ন করুন।
    ```javascript
    function OptionalComponent({ show }) {
      if (!show) {
        return null; // কিছুই রেন্ডার হবে না
      }
      return <div>This component is visible!</div>;
    }
    ```

4.  **স্ট্রিং-এ রূপান্তর (যদি প্রয়োজন হয়):** যদি আপনি নিশ্চিত করতে চান যে একটি সংখ্যা (যেমন `0`) স্ট্রিং হিসেবে রেন্ডার হবে, তাহলে `String(value)` বা `` `${value}` `` ব্যবহার করতে পারেন। তবে সাধারণত React সংখ্যাকে টেক্সট হিসেবেই রেন্ডার করে।

**বাস্তব জীবনের উদাহরণ:**

*   **`null`/`false` রেন্ডার না হওয়া:** ধরুন, একটি অনলাইন স্টোরে যদি কোনো ডিসকাউন্ট কুপন (`discountCoupon = null` বা `hasDiscount = false`) না থাকে, তাহলে কুপনের তথ্য দেখানোর অংশটুকু স্বয়ংক্রিয়ভাবে বাদ পড়ে যাবে।
*   **`0` রেন্ডার হওয়া:** যদি আপনার শপিং কার্টে আইটেমের সংখ্যা `0` হয় (`cartItemCount = 0`), এবং আপনি `{cartItemCount}` রেন্ডার করেন, তাহলে UI তে "0" দেখাবে, যা এক্ষেত্রে সঠিক আচরণ। কিন্তু যদি `cartItemCount && <CartIcon />` লেখেন, তাহলে `0` রেন্ডার হবে, `<CartIcon />` নয়, যা ভুল।

**React এ ব্যবহার (সারাংশ):**

```javascript
import React, { useState } from 'react';

function NotificationArea({ messages }) { // messages একটি অ্যারে
  // messages.length যদি 0 হয়, তাহলে বাম পাশের কন্ডিশন false হবে, কিছুই রেন্ডার হবে না
  // messages.length যদি 0 হয়, এবং আপনি messages.length && <p>...</p> লেখেন, তাহলে 0 রেন্ডার হবে।
  return (
    <div>
      {messages.length > 0 && (
        <div>
          <h3>You have {messages.length} new messages:</h3>
          <ul>
            {messages.map((msg, index) => <li key={index}>{msg}</li>)}
          </ul>
        </div>
      )}
      {messages.length === 0 && <p>No new messages.</p>}
    </div>
  );
}

function UserGreeting({ user }) { // user অবজেক্ট অথবা null
  if (!user) {
    return null; // যদি user না থাকে, কিছুই রেন্ডার করো না
  }
  return <p>Hello, {user.name}!</p>;
}

function App() {
  const [unreadMessages, setUnreadMessages] = useState(['Msg 1', 'Msg 2']);
  const [currentUser, setCurrentUser] = useState({ name: "Guest" });
  // const [currentUser, setCurrentUser] = useState(null); // UserGreeting null রিটার্ন করবে

  const listWithZero = [1, 0, 2]; // 0 রেন্ডার হবে
  const listWithFalse = [true, false, true]; // false রেন্ডার হবে না

  return (
    <div>
      <NotificationArea messages={unreadMessages} />
      <button onClick={() => setUnreadMessages([])}>Clear Messages</button>
      <hr />
      <UserGreeting user={currentUser} />
      <button onClick={() => setCurrentUser(null)}>Logout User</button>
      <hr />
      <div>
        List with zero: {listWithZero.map((item, i) => <span key={i}>{item} </span>)} {/* 1 0 2 */}
      </div>
      <div>
        List with false: {listWithFalse.map((item, i) => <span key={i}>{item.toString()} </span>)} {/* true false true (stringified) */}
        {/* সরাসরি item রেন্ডার করলে false বাদ যাবে: */}
        {/* {listWithFalse.map((item, i) => <span key={i}>{item && 'TrueValue'} </span>)} */}
      </div>
    </div>
  );
}

export default App;
```
JSX এ এই ভ্যালুগুলোর আচরণ বোঝা কন্ডিশনাল রেন্ডারিংকে আরও কার্যকরভাবে এবং ত্রুটিমুক্তভাবে করতে সাহায্য করে।

---

## ১১. Promise, async/await (প্রমিজ, অ্যাসিনক্রোনাস/অপেক্ষা)

**বিষয়টি কী?**

JavaScript প্রকৃতিগতভাবে একটি সিঙ্গেল-থ্রেডেড (single-threaded) ভাষা, যার মানে এটি একবারে একটি কাজই করতে পারে। কিন্তু ওয়েব অ্যাপ্লিকেশনগুলোতে অনেক সময় এমন কাজ করতে হয় যা সময়সাপেক্ষ, যেমন নেটওয়ার্ক থেকে ডেটা আনা (API কল), ফাইল পড়া, বা বড় ক্যালকুলেশন করা। এই ধরনের কাজগুলো যদি সিঙ্ক্রোনাসভাবে (synchronously) করা হয়, তাহলে পুরো অ্যাপ্লিকেশনটি সেই কাজ শেষ না হওয়া পর্যন্ত থেমে থাকবে (UI ফ্রিজ হয়ে যাবে)।

এই সমস্যা সমাধানের জন্য JavaScript এ অ্যাসিঙ্ক্রোনাস (asynchronous) প্রোগ্রামিংয়ের ধারণা আনা হয়েছে। `Promise` এবং `async/await` হলো অ্যাসিঙ্ক্রোনাস অপারেশনগুলোকে আরও সহজে এবং সুন্দরভাবে পরিচালনা করার আধুনিক পদ্ধতি।

*   **Promise (প্রমিজ):** একটি প্রমিজ হলো একটি অবজেক্ট যা একটি অ্যাসিঙ্ক্রোনাস অপারেশনের eventual completion (অথবা failure) এবং তার ফলস্বরূপ মানকে উপস্থাপন করে। একটি প্রমিজ তিনটি অবস্থায় থাকতে পারে:
    1.  **Pending (অমীমাংসিত):** প্রাথমিক অবস্থা, অপারেশন এখনও সম্পন্ন হয়নি।
    2.  **Fulfilled (সফল):** অপারেশন সফলভাবে সম্পন্ন হয়েছে, এবং প্রমিজের একটি মান আছে (resolved value)।
    3.  **Rejected (ব্যর্থ):** অপারেশন ব্যর্থ হয়েছে, এবং প্রমিজের একটি কারণ (ত্রুটি) আছে।
    প্রমিজের সাথে `.then()` (সফলতার জন্য), `.catch()` (ব্যর্থতার জন্য), এবং `.finally()` (সবসময় এক্সিকিউট হওয়ার জন্য) মেথড ব্যবহার করে তার ফলাফল বা ত্রুটি হ্যান্ডেল করা হয়।

*   **`async/await`:** এটি ES2017 (ES8) এ প্রবর্তিত সিনট্যাকটিক সুগার (syntactic sugar), যা প্রমিজ-ভিত্তিক অ্যাসিঙ্ক্রোনাস কোডকে আরও সিঙ্ক্রোনাস কোডের মতো দেখতে এবং লিখতে সাহায্য করে।
    *   `async` কীওয়ার্ডটি একটি ফাংশনের আগে ব্যবহার করা হয়। `async` ফাংশন সবসময় একটি প্রমিজ রিটার্ন করে। যদি ফাংশনটি একটি মান রিটার্ন করে, তাহলে `async` ফাংশনটি সেই মান দিয়ে রিজলভ হওয়া একটি প্রমিজ রিটার্ন করবে। যদি ফাংশনটি একটি ত্রুটি থ্রো করে, তাহলে `async` ফাংশনটি সেই ত্রুটি দিয়ে রিজেক্ট হওয়া একটি প্রমিজ রিটার্ন করবে।
    *   `await` কীওয়ার্ডটি শুধুমাত্র `async` ফাংশনের ভেতরে ব্যবহার করা যায়। এটি একটি প্রমিজের সামনে ব্যবহার করা হয় এবং এটি JavaScript কে প্রমিজটি রিজলভ বা রিজেক্ট না হওয়া পর্যন্ত ফাংশনের এক্সিকিউশনকে "বিরতি" (pause) দেয়। প্রমিজ রিজলভ হলে, `await` এক্সপ্রেশনটি প্রমিজের রিজলভড ভ্যালুটি রিটার্ন করে। প্রমিজ রিজেক্ট হলে, এটি একটি ত্রুটি থ্রো করে (যা `try...catch` দিয়ে ধরা যায়)।

**কেন ব্যবহার করা হয়?**

*   **নন-ব্লকিং অপারেশন (Non-blocking Operations):** অ্যাসিঙ্ক্রোনাস কোড অ্যাপ্লিকেশনকে রেসপন্সিভ রাখে। সময়সাপেক্ষ কাজগুলো ব্যাকগ্রাউন্ডে চলতে থাকে এবং প্রধান থ্রেড অন্যান্য কাজ (যেমন UI আপডেট, ইউজার ইনপুট) করতে পারে।
*   **কলব্যাক হেল (Callback Hell) পরিহার:** প্রমিজের আগে, অ্যাসিঙ্ক্রোনাস অপারেশনগুলো প্রায়শই নেস্টেড কলব্যাক ফাংশন দিয়ে পরিচালনা করা হতো, যা "কলব্যাক হেল" বা "পিরামিড অফ ডুম" নামে পরিচিত একটি জটিল এবং দুর্বোধ্য কোড স্ট্রাকচার তৈরি করত। প্রমিজ এবং বিশেষ করে `async/await` এই সমস্যা থেকে মুক্তি দেয়।
*   **ত্রুটি হ্যান্ডলিং উন্নত করা:** প্রমিজের `.catch()` মেথড এবং `async/await` এর সাথে `try...catch` ব্লক ব্যবহার করে অ্যাসিঙ্ক্রোনাস কোডের ত্রুটিগুলো আরও সুসংহতভাবে হ্যান্ডেল করা যায়।
*   **কোডের পঠনযোগ্যতা বৃদ্ধি:** `async/await` ব্যবহার করে অ্যাসিঙ্ক্রোনাস কোড দেখতে প্রায় সিঙ্ক্রোনাস কোডের মতোই হয়, যা বোঝা এবং রক্ষণাবেক্ষণ করা সহজ।

**কীভাবে ব্যবহার করা হয়?**

**Promise এর বেসিক ব্যবহার:**

```javascript
// একটি নতুন প্রমিজ তৈরি করা
const myFirstPromise = new Promise((resolve, reject) => {
  // অ্যাসিঙ্ক্রোনাস অপারেশন (যেমন, setTimeout)
  setTimeout(() => {
    const success = true; // ধরা যাক, অপারেশন সফল হয়েছে
    if (success) {
      resolve("Promise resolved successfully!"); // সফল হলে resolve কল করা হয়
    } else {
      reject("Promise rejected with an error."); // ব্যর্থ হলে reject কল করা হয়
    }
  }, 2000); // ২ সেকেন্ড পর
});

// প্রমিজ ব্যবহার করা
myFirstPromise
  .then((successMessage) => {
    // প্রমিজ সফলভাবে রিজলভ হলে এই ব্লক এক্সিকিউট হবে
    console.log("Success:", successMessage);
  })
  .catch((errorMessage) => {
    // প্রমিজ রিজেক্ট হলে এই ব্লক এক্সিকিউট হবে
    console.error("Error:", errorMessage);
  })
  .finally(() => {
    // এই ব্লকটি সফল বা ব্যর্থ উভয় ক্ষেত্রেই এক্সিকিউট হবে
    console.log("Promise operation finished.");
  });

console.log("Promise has been set up. Waiting for it to complete...");

// fetch API (যা একটি প্রমিজ রিটার্ন করে)
fetch('https://jsonplaceholder.typicode.com/todos/1') // একটি API এন্ডপয়েন্ট
  .then(response => {
    if (!response.ok) { // response.ok চেক করে HTTP স্ট্যাটাস ঠিক আছে কিনা
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // response.json() ও একটি প্রমিজ রিটার্ন করে
  })
  .then(data => {
    console.log("Fetched data:", data);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
```

**`async/await` এর ব্যবহার:**

```javascript
// একটি প্রমিজ যা একটি নির্দিষ্ট সময় পর রিজলভ হয়
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async ফাংশন
async function myAsyncFunction() {
  console.log("Async function started...");
  try {
    await delay(1000); // ১ সেকেন্ড অপেক্ষা করবে
    console.log("After 1 second delay.");

    // একটি প্রমিজ যা রিজলভ হতে পারে
    const resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Data from async operation"), 1500);
    });

    const result = await resultPromise; // প্রমিজের ফলাফলের জন্য অপেক্ষা করবে
    console.log("Result:", result);

    // একটি প্রমিজ যা রিজেক্ট হতে পারে
    const errorPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject("Simulated error in async operation"), 1000);
    });
    // const errorResult = await errorPromise; // এটি ত্রুটি থ্রো করবে

    return "Async function completed successfully.";

  } catch (error) {
    console.error("Error in async function:", error);
    return "Async function completed with error."; // অথবা থ্রো করতে পারেন
  } finally {
    console.log("Async function's finally block.");
  }
}

// async ফাংশন কল করা (এটি একটি প্রমিজ রিটার্ন করে)
myAsyncFunction()
  .then(message => console.log("Async function .then():", message))
  .catch(err => console.error("Async function .catch():", err));

console.log("Async function has been called. Script continues...");


// fetch API এর সাথে async/await
async function fetchDataWithAsyncAwait() {
  try {
    console.log("Fetching data with async/await...");
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // response.json() ও একটি প্রমিজ রিটার্ন করে
    console.log("Fetched data (async/await):", data);
    return data;
  } catch (error) {
    console.error("Fetch error (async/await):", error);
    // এখানে ত্রুটি হ্যান্ডেল করা বা পুনরায় থ্রো করা যেতে পারে
  }
}

// fetchDataWithAsyncAwait();
```

**বাস্তব জীবনের উদাহরণ:**

*   **Promise:**
    *   আপনি একটি রেস্টুরেন্টে খাবার অর্ডার দিয়েছেন (প্রমিজ তৈরি)। রেস্টুরেন্ট আপনাকে একটি রসিদ (প্রমিজ অবজেক্ট) দিয়েছে।
        *   **Pending:** খাবার তৈরি হচ্ছে।
        *   **Fulfilled:** আপনার খাবার প্রস্তুত (প্রমিজ রিজলভ হয়েছে, মান হলো খাবার)। আপনি `.then()` করে খাবারটা নিলেন।
        *   **Rejected:** কোনো কারণে খাবারটি তৈরি করা সম্ভব হলো না (প্রমিজ রিজেক্ট হয়েছে, কারণ হলো উপাদান শেষ)। আপনি `.catch()` করে ম্যানেজারের সাথে কথা বললেন।
        *   **Finally:** আপনি বিল পরিশোধ করে রেস্টুরেন্ট ত্যাগ করলেন (সফল বা ব্যর্থ যাই হোক)।

*   **`async/await`:**
    *   আপনি একটি কফি শপে কফি অর্ডার করছেন।
        1.  `async function orderCoffee()`: আপনি কফি অর্ডার করার প্রক্রিয়া শুরু করলেন।
        2.  `console.log("Ordering coffee...");`
        3.  `const orderNumber = await takeOrder();`: আপনি অর্ডার দিলেন এবং একটি অর্ডার নম্বরের জন্য অপেক্ষা করছেন ( `await` )। এই সময় আপনি অন্য কিছু নিয়ে ভাবতে পারেন (JavaScript এর ইভেন্ট লুপ অন্য কাজ করতে পারে)।
        4.  `console.log("Got order number:", orderNumber);`
        5.  `const coffee = await prepareCoffee(orderNumber);`: অর্ডার নম্বর পাওয়ার পর আপনি কফি তৈরির জন্য অপেক্ষা করছেন ( `await` )।
        6.  `console.log("Coffee is ready!", coffee);`
        7.  `return coffee;`
    এই পুরো প্রক্রিয়াটি দেখতে সিঙ্ক্রোনাস মনে হলেও, `await` এর জায়গাগুলোতে প্রোগ্রাম "বিরতি" নেয় এবং ব্যাকগ্রাউন্ডে কাজটি সম্পন্ন হওয়ার জন্য অপেক্ষা করে, মূল থ্রেডকে ব্লক না করে।

**React এ ব্যবহার:**

React কম্পোনেন্টে (বিশেষ করে `useEffect` হুকের মধ্যে) API কল করে ডেটা আনার জন্য `async/await` খুবই জনপ্রিয়।

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffect এর কলব্যাক সরাসরি async হতে পারে না,
    // তাই ভেতরে একটি async ফাংশন ডিফাইন করে কল করতে হয়।
    const fetchUserData = async () => {
      setLoading(true);
      setError(null); // আগের error রিসেট করা
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user. Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        setUser(null); // কোনো ডেটা না থাকলে আগের ডেটা মুছে ফেলা
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }

    // Cleanup function (কম্পোনেন্ট আনমাউন্ট হলে বা userId পরিবর্তন হলে কল হতে পারে)
    return () => {
      // এখানে কোনো অ্যাসিঙ্ক্রোনাস টাস্ক ক্যানসেল করার লজিক থাকতে পারে
      // যেমন, AbortController ব্যবহার করে fetch ক্যানসেল করা
    };
  }, [userId]); // যখন userId পরিবর্তন হবে, তখন ইফেক্টটি পুনরায় রান করবে

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data.</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
}

function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  return (
    <div>
      <button onClick={() => setCurrentUserId(id => (id % 10) + 1)}>
        Load User ID: {(currentUserId % 10) + 1}
      </button>
      <UserProfile userId={currentUserId} />
    </div>
  );
}

export default App;
```
`Promise` এবং `async/await` আধুনিক JavaScript এ অ্যাসিঙ্ক্রোনাস প্রোগ্রামিংয়ের ভিত্তি, যা অ্যাপ্লিকেশনগুলোকে আরও দক্ষ এবং ব্যবহারকারী-বান্ধব করে তোলে।

---

## ১২. `try...catch` (ট্রাই...ক্যাচ)

**বিষয়টি কী?**

`try...catch` (কখনও কখনও `try...catch...finally` সহ) হলো JavaScript এ রানটাইম ত্রুটি (runtime errors) বা ব্যতিক্রম (exceptions) হ্যান্ডেল করার একটি স্টেটমেন্ট। যখন কোডের একটি অংশে ত্রুটি ঘটতে পারে বলে আশঙ্কা করা হয়, তখন সেই কোডটিকে `try` ব্লকের মধ্যে রাখা হয়। যদি `try` ব্লকের মধ্যে কোনো ত্রুটি ঘটে, তাহলে কোডের স্বাভাবিক এক্সিকিউশন থেমে যায় এবং কন্ট্রোল `catch` ব্লকে চলে যায়। `catch` ব্লক সেই ত্রুটিটিকে "ধরে" এবং সেটি হ্যান্ডেল করার সুযোগ দেয়, যাতে পুরো অ্যাপ্লিকেশন ক্র্যাশ না করে।

*   **`try` ব্লক:** এই ব্লকের মধ্যে কোড লেখা হয় যা সম্ভাব্য ত্রুটি তৈরি করতে পারে।
*   **`catch` ব্লক:** যদি `try` ব্লকের মধ্যে কোনো ত্রুটি ঘটে, তাহলে এই ব্লকটি এক্সিকিউট হয়। এটি একটি আর্গুমেন্ট (সাধারণত `error` বা `e` নামে) গ্রহণ করে, যা একটি অবজেক্ট এবং ত্রুটি সম্পর্কিত তথ্য (যেমন, `name`, `message`, `stack`) ধারণ করে।
*   **`finally` ব্লক (ঐচ্ছিক):** এই ব্লকটি `try` ব্লকের কোড এক্সিকিউশন শেষ হওয়ার পর (ত্রুটি ঘটুক বা না ঘটুক, এমনকি `return` স্টেটমেন্ট থাকলেও) সবসময় এক্সিকিউট হয়। এটি সাধারণত রিসোর্স ক্লিনআপ করার জন্য (যেমন, ফাইল বন্ধ করা, নেটওয়ার্ক কানেকশন বন্ধ করা) ব্যবহৃত হয়।

**কেন ব্যবহার করা হয়?**

*   **ত্রুটি সহনশীলতা (Error Tolerance):** অ্যাপ্লিকেশনকে অপ্রত্যাশিত ত্রুটির কারণে ক্র্যাশ করা থেকে রক্ষা করে।
*   **নিয়ন্ত্রিত ত্রুটি হ্যান্ডলিং:** ত্রুটি ঘটলে ব্যবহারকারীকে একটি অর্থপূর্ণ বার্তা দেখানো, লগ ফাইলে ত্রুটি রেকর্ড করা, অথবা বিকল্প কোনো ব্যবস্থা গ্রহণ করার সুযোগ দেয়।
*   **রিসোর্স ম্যানেজমেন্ট:** `finally` ব্লক নিশ্চিত করে যে গুরুত্বপূর্ণ রিসোর্সগুলো সঠিকভাবে মুক্ত করা হয়েছে, এমনকি যদি ত্রুটি ঘটেও।
*   **ডিবাগিং:** `catch` ব্লকে ত্রুটির তথ্য লগ করে ডিবাগিং সহজ করা যায়।

**কীভাবে ব্যবহার করা হয়?**

```javascript
// বেসিক try...catch
try {
  console.log("Starting the try block...");
  // একটি ইচ্ছাকৃত ত্রুটি তৈরি করা (undeclaredVariable এখানে ডিফাইন করা নেই)
  // let result = undeclaredVariable + 10;
  // console.log(result); // এই লাইনটি এক্সিকিউট হবে না

  // অন্য ধরনের ত্রুটি, যেমন JSON পার্সিং
  const invalidJson = "{ 'name': 'John', age: 30 }"; // JSON প্রোপার্টি নেইম ডাবল কোটে হওয়া উচিত
  // const parsedJson = JSON.parse(invalidJson); // এটি SyntaxError দেবে
  // console.log(parsedJson);

  // কাস্টম ত্রুটি থ্রো করা
  const value = -5;
  if (value < 0) {
    throw new Error("Value cannot be negative."); // কাস্টম Error অবজেক্ট থ্রো করা
  }
  console.log("Value is positive:", value);


  console.log("Try block finished successfully (if no error occurred).");
} catch (error) {
  // try ব্লকে কোনো ত্রুটি ঘটলে এই ব্লকটি এক্সিকিউট হবে
  console.error("An error occurred!");
  console.error("Error Name:", error.name);       // ত্রুটির নাম (e.g., ReferenceError, TypeError, SyntaxError)
  console.error("Error Message:", error.message); // ত্রুটির বার্তা
  // console.error("Error Stack:", error.stack);  // ত্রুটির স্ট্যাক ট্রেস (ডিবাগিংয়ের জন্য খুবই দরকারি)

  // এখানে ত্রুটি হ্যান্ডেল করার লজিক লেখা যেতে পারে
  // যেমন, ব্যবহারকারীকে একটি বার্তা দেখানো, বা ডিফল্ট ভ্যালু সেট করা
} finally {
  // এই ব্লকটি সবসময় এক্সিকিউট হবে, ত্রুটি ঘটুক বা না ঘটুক
  console.log("Finally block executed. Performing cleanup if any.");
}

console.log("Script continues after try...catch...finally.");


// উদাহরণ: একটি ফাংশন যা ত্রুটি থ্রো করতে পারে
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError("Both arguments must be numbers.");
  }
  return a / b;
}

try {
  const result1 = divide(10, 2);
  console.log("Result 1:", result1); // 5

  // const result2 = divide(10, 0); // এটি Error থ্রো করবে
  // console.log("Result 2:", result2);

  const result3 = divide("abc", 2); // এটি TypeError থ্রো করবে
  console.log("Result 3:", result3);

} catch (e) {
  console.warn("Caught an exception in division:");
  console.warn(`Type: ${e.name}, Message: ${e.message}`);
  // ব্যবহারকারীকে একটি বন্ধুত্বপূর্ণ বার্তা দেখানো যেতে পারে
  // alert(`Error: ${e.message}`);
}
```

**`throw` স্টেটমেন্ট:**

`try...catch` এর সাথে `throw` স্টেটমেন্টটি ঘনিষ্ঠভাবে সম্পর্কিত। `throw` ব্যবহার করে আপনি নিজেই কাস্টম ত্রুটি তৈরি এবং "থ্রো" করতে পারেন। এটি সাধারণত তখনই করা হয় যখন কোনো ফাংশন বা কোড ব্লকের মধ্যে একটি অপ্রত্যাশিত বা অবৈধ অবস্থা তৈরি হয়।

```javascript
function processData(data) {
  if (!data) {
    throw new ReferenceError("Data cannot be null or undefined.");
  }
  if (typeof data.value !== 'number') {
    // আপনি Error, TypeError, RangeError ইত্যাদি বিল্ট-ইন Error অবজেক্ট ব্যবহার করতে পারেন
    // অথবা কাস্টম Error ক্লাস তৈরি করতে পারেন (Error ক্লাসকে এক্সটেন্ড করে)
    throw new TypeError("Data must have a numeric 'value' property.");
  }
  console.log("Processing data value:", data.value);
  return data.value * 2;
}

try {
  // processData(null);
  processData({ value: "text" });
} catch (err) {
  console.error(`Processing failed: [${err.name}] ${err.message}`);
}
```

**বাস্তব জীবনের উদাহরণ:**

*   **গাড়ি চালানো:**
    *   **`try`:** আপনি স্বাভাবিকভাবে গাড়ি চালাচ্ছেন।
    *   **সম্ভাব্য ত্রুটি:** টায়ার পাংচার হতে পারে, ইঞ্জিন সমস্যা হতে পারে।
    *   **`catch`:** যদি টায়ার পাংচার হয় (ত্রুটি ঘটে), আপনি গাড়ি থামিয়ে টায়ার পরিবর্তন করবেন (ত্রুটি হ্যান্ডেল করা)।
    *   **`finally`:** যাত্রা শেষে (সফলভাবে বা টায়ার পরিবর্তন করার পর), আপনি গাড়ি পার্ক করে ইঞ্জিন বন্ধ করবেন (রিসোর্স ক্লিনআপ)।

*   **অনলাইন ফর্ম সাবমিট:**
    *   **`try`:** ব্যবহারকারী ফর্ম পূরণ করে সাবমিট বাটনে ক্লিক করে। ডেটা সার্ভারে পাঠানোর চেষ্টা করা হচ্ছে।
    *   **সম্ভাব্য ত্রুটি:** ইন্টারনেট কানেকশন চলে যেতে পারে, সার্ভার ডাউন থাকতে পারে, ভুল ডেটা ফরম্যাট হতে পারে।
    *   **`catch`:** যদি কোনো ত্রুটি হয় (যেমন, ইন্টারনেট নেই), ব্যবহারকারীকে একটি বার্তা দেখানো হবে "সাবমিট ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন" (ত্রুটি হ্যান্ডেল করা)।
    *   **`finally`:** সাবমিট বাটনটি আবার সক্রিয় করা বা লোডিং ইন্ডিকেটর বন্ধ করা।

**React এ ব্যবহার (বিশেষ করে `async/await` এর সাথে):**

`async/await` এর সাথে `try...catch` ব্যবহার করা অ্যাসিঙ্ক্রোনাস অপারেশনের (যেমন API কল) ত্রুটি হ্যান্ডেল করার জন্য খুবই সাধারণ এবং কার্যকর একটি প্যাটার্ন।

```javascript
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // আগের error রিসেট
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); // সঠিক URL
      // const response = await fetch('https://non-existent-api.com/data'); // ভুল URL দিয়ে ত্রুটি সিমুলেট করতে

      if (!response.ok) {
        // HTTP ত্রুটি (যেমন 404, 500) fetch নিজে থেকে reject করে না, তাই ম্যানুয়ালি থ্রো করতে হয়
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      // এখানে নেটওয়ার্ক ত্রুটি (fetch reject হলে) বা উপরে থ্রো করা Error ধরা পড়বে
      console.error("Failed to fetch data:", err);
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData(); // কম্পোনেন্ট মাউন্ট হলে ডেটা ফেচ করুন
  // }, []); // খালি ডিপেন্ডেন্সি অ্যারে মানে শুধু মাউন্ট এবং আনমাউন্টে রান হবে

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <div>
          <h3>Fetched Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DataFetcher;
```
`try...catch` কোডকে আরও শক্তিশালী এবং ব্যবহারকারী-বান্ধব করে তোলে, কারণ এটি অপ্রত্যাশিত পরিস্থিতিগুলো সুন্দরভাবে সামলাতে সাহায্য করে।

---

## ১৩. ES Modules: `import`/`export` (ইএস মডিউল: ইম্পোর্ট/এক্সপোর্ট)

**বিষয়টি কী?**

ES Modules (ECMAScript Modules) হলো JavaScript এর জন্য একটি স্ট্যান্ডার্ড মডিউল সিস্টেম, যা ES6 (ECMAScript 2015) এ প্রবর্তিত হয়েছে। এটি কোডকে একাধিক ফাইলে ভাগ করে, সেগুলোকে পুনঃব্যবহারযোগ্য মডিউলে সংগঠিত করতে এবং তাদের মধ্যে ভ্যারিয়েবল, ফাংশন, বা ক্লাস শেয়ার করতে সাহায্য করে।

*   **`export` স্টেটমেন্ট:** একটি মডিউল থেকে এক বা একাধিক "বাইন্ডিং" (ভ্যারিয়েবল, ফাংশন, ক্লাস) অন্য মডিউলে ব্যবহারের জন্য উন্মুক্ত (expose) করে। দুই ধরনের এক্সপোর্ট আছে:
    1.  **Named Exports (নামযুক্ত এক্সপোর্ট):** একটি মডিউল থেকে একাধিক আইটেম তাদের নিজ নিজ নামে এক্সপোর্ট করা যায়।
        ```javascript
        // utils.js
        export const PI = 3.14159;
        export function add(a, b) { return a + b; }
        export class User {}
        ```
    2.  **Default Export (ডিফল্ট এক্সপোর্ট):** একটি মডিউল থেকে শুধুমাত্র একটি আইটেমকে "প্রধান" বা ডিফল্ট হিসেবে এক্সপোর্ট করা যায়। একটি ফাইলে একাধিক ডিফল্ট এক্সপোর্ট থাকতে পারে না।
        ```javascript
        // MyComponent.js
        export default function MyComponent() { /* ... */ }
        // অথবা: const MyComponent = () => { /* ... */ }; export default MyComponent;
        ```

*   **`import` স্টেটমেন্ট:** অন্য মডিউল থেকে এক্সপোর্ট করা বাইন্ডিংগুলোকে বর্তমান মডিউলে ব্যবহারের জন্য নিয়ে আসে।
    1.  **Importing Named Exports:** `{}` ব্র্যাকেটের মধ্যে নির্দিষ্ট নাম দিয়ে ইম্পোর্ট করা হয়। নামগুলো এক্সপোর্ট করা নামের সাথে মিলতে হবে (তবে `as` কীওয়ার্ড দিয়ে এলিয়াস (alias) বা অন্য নাম দেওয়া যায়)।
        ```javascript
        // main.js
        import { PI, add } from './utils.js';
        import { User as Person } from './utils.js'; // এলিয়াস দিয়ে ইম্পোর্ট
        console.log(PI);
        console.log(add(2,3));
        const p = new Person();
        ```
    2.  **Importing Default Exports:** যেকোনো নামে ইম্পোর্ট করা যায়, ব্র্যাকেটের প্রয়োজন হয় না।
        ```javascript
        // App.js
        import MyCustomComponent from './MyComponent.js'; // MyComponent.js থেকে ডিফল্ট এক্সপোর্ট
        // <MyCustomComponent />
        ```
    3.  **Importing a Mix (Named and Default):**
        ```javascript
        // module.js
        // export const version = "1.0";
        // export default function mainFunc() {}

        // main.js
        // import mainFunc, { version } from './module.js';
        ```
    4.  **Importing all Named Exports as an Object (Namespace Import):**
        ```javascript
        // main.js
        import * as utils from './utils.js'; // utils.js এর সব named export গুলো utils অবজেক্টের প্রোপার্টি হবে
        console.log(utils.PI);
        console.log(utils.add(5,5));
        ```
    5.  **Import for Side Effects Only:** কখনও কখনও একটি মডিউল ইম্পোর্ট করা হয় শুধু তার গ্লোবাল কোড এক্সিকিউট করার জন্য, কোনো বাইন্ডিং ইম্পোর্ট না করে।
        ```javascript
        // main.js
        import './polyfills.js'; // polyfills.js এর কোড রান হবে, কিন্তু কিছু ইম্পোর্ট হবে না
        ```

**কেন ব্যবহার করা হয়?**

*   **কোড সংগঠন (Code Organization):** বড় অ্যাপ্লিকেশনকে ছোট, পরিচালনাযোগ্য এবং ফোকাসড মডিউলে ভাগ করা যায়। প্রতিটি মডিউল একটি নির্দিষ্ট কার্যকারিতার জন্য দায়ী থাকে।
*   **পুনঃব্যবহারযোগ্যতা (Reusability):** মডিউলগুলো বিভিন্ন প্রজেক্টে বা একই প্রজেক্টের বিভিন্ন অংশে সহজেই পুনঃব্যবহার করা যায়।
*   **নেমস্পেসিং (Namespacing):** মডিউলগুলো তাদের নিজস্ব স্কোপ তৈরি করে, যা গ্লোবাল নেমস্পেসের দূষণ (pollution) কমায় এবং ভ্যারিয়েবলের নাম নিয়ে সংঘর্ষ (naming conflicts) এড়াতে সাহায্য করে।
*   **নির্ভরতা ব্যবস্থাপনা (Dependency Management):** কোন মডিউল কোন মডিউলের উপর নির্ভরশীল, তা `import` স্টেটমেন্টের মাধ্যমে স্পষ্টভাবে বোঝা যায়।
*   **পারফরম্যান্স অপটিমাইজেশন:** মডিউল সিস্টেম আধুনিক বিল্ড টুল (যেমন Webpack, Rollup, Parcel) দ্বারা স্ট্যাটিক অ্যানালাইসিসের (static analysis) সুযোগ দেয়। এর ফলে "ট্রি শেকিং" (tree shaking) এর মতো অপটিমাইজেশন সম্ভব হয়, যেখানে অব্যবহৃত কোড বান্ডেল থেকে বাদ দেওয়া যায়, ফলে ফাইলের আকার কমে।
*   **Strict Mode:** ES মডিউলগুলো ডিফল্টভাবে "strict mode" এ চলে, যা কিছু সাইলেন্ট জাভাস্ক্রিপ্ট ত্রুটিকে সুস্পষ্ট ত্রুটিতে পরিণত করে এবং কোডের গুণমান উন্নত করে।

**কীভাবে ব্যবহার করা হয়?**

**ফাইল স্ট্রাকচার (উদাহরণ):**

```
project-root/
├── src/
│   ├── mathUtils.js
│   ├── stringUtils.js
│   ├── components/
│   │   └── Button.js
│   └── App.js
├── index.html
└── package.json
```

**`mathUtils.js` (Named Exports):**

```javascript
// src/mathUtils.js
export const EULER_NUMBER = 2.718;

export function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

export function multiply(a, b) {
  return a * b;
}

// একটি ভ্যারিয়েবল যা এক্সপোর্ট করা হয়নি (এটি এই মডিউলের প্রাইভেট)
const internalSecret = "Cannot be imported";
```

**`stringUtils.js` (Default and Named Export):**

```javascript
// src/stringUtils.js
export function toUpperCase(str) {
  return str.toUpperCase();
}

export function toLowerCase(str) {
  return str.toLowerCase();
}

const VERSION = "1.0.1";
export { VERSION as stringUtilsVersion }; // এক্সপোর্ট করার সময় এলিয়াস দেওয়া

export default function mainStringUtil(str) {
  console.log(`Processing string: ${str} with utils v${VERSION}`);
  return `Formatted: ${toUpperCase(str)}`;
}
```

**`components/Button.js` (Default Export - React Component):**

```javascript
// src/components/Button.js
import React from 'react'; // Node modules থেকে ইম্পোর্ট (পাথ লাগে না যদি কনফিগার করা থাকে)

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding: '10px', margin: '5px' }}>
      {children || "Click Me"}
    </button>
  );
}
```

**`App.js` (সবকিছু ইম্পোর্ট করে ব্যবহার করা):**

```javascript
// src/App.js
import React from 'react'; // ডিফল্ট ইম্পোর্ট
import Button from './components/Button.js'; // ডিফল্ট ইম্পোর্ট (পাথ .js সহ বা ছাড়া হতে পারে বিল্ড টুলের উপর নির্ভর করে)

// Named import
import { EULER_NUMBER, sum as calculateSum } from './mathUtils.js'; // sum কে calculateSum নামে ইম্পোর্ট

// Default এবং named import একসাথে
import formatString, { toLowerCase, stringUtilsVersion } from './stringUtils.js';

// Namespace import
import * as math from './mathUtils.js'; // mathUtils.js এর সব named export গুলো math অবজেক্টে আসবে

function App() {
  const handleButtonClick = () => {
    alert("Button clicked!");
    console.log("Euler:", EULER_NUMBER); // 2.718
    console.log("Sum (aliased):", calculateSum(1, 2, 3, math.multiply(2,2))); // 10 (math.multiply ও ব্যবহার করা হলো)
    console.log("String util version:", stringUtilsVersion); // 1.0.1
    console.log(formatString("Hello World")); // "Processing string: Hello World with utils v1.0.1", "Formatted: HELLO WORLD"
    console.log("Lowercase:", toLowerCase("TEST")); // "test"
  };

  return (
    <div>
      <h1>My Modular App</h1>
      <p>Check console for outputs.</p>
      <Button onClick={handleButtonClick}>
        Perform Actions
      </Button>
      <Button>Another Button</Button>
    </div>
  );
}

export default App; // App.js এর প্রধান কম্পোনেন্টকে ডিফল্ট এক্সপোর্ট করা হচ্ছে
```

**ব্রাউজারে ES Modules ব্যবহার:**

HTML ফাইলে `<script>` ট্যাগে `type="module"` অ্যাট্রিবিউট যোগ করে ES Modules সরাসরি ব্রাউজারে ব্যবহার করা যায়:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ES Modules Example</title>
</head>
<body>
    <div id="root"></div>
    <!-- App.js (বা main.js) কে module হিসেবে লোড করা হচ্ছে -->
    <!-- React এবং JSX এর জন্য সাধারণত একটি বিল্ড স্টেপ (Webpack/Babel) প্রয়োজন হয় -->
    <!-- নিচের উদাহরণটি সিম্পল JavaScript মডিউলের জন্য -->
    <!-- <script type="module" src="./src/App.js"></script> -->

    <!-- একটি সাধারণ (নন-রিয়্যাক্ট) উদাহরণ: -->
    <!-- main.js -->
    <!-- import { someFunction } from './lib.js'; -->
    <!-- someFunction(); -->
    <!-- <script type="module" src="main.js"></script> -->
</body>
</html>
```
তবে, বড় অ্যাপ্লিকেশনের জন্য এবং React/JSX, TypeScript, CSS প্রিপ্রসেসিং ইত্যাদি ব্যবহারের জন্য সাধারণত Node.js এবং Webpack, Parcel, Vite, বা Rollup এর মতো মডিউল বান্ডলার (module bundlers) ও ট্রান্সপাইলার (transpilers) যেমন Babel ব্যবহার করা হয়। এই টুলগুলো মডিউলগুলোকে একত্রিত করে, অপটিমাইজ করে এবং পুরনো ব্রাউজারগুলোর জন্য সামঞ্জস্যপূর্ণ কোডে রূপান্তর করে।

**বাস্তব জীবনের উদাহরণ:**

*   **একটি রান্নাঘরের সরঞ্জাম:**
    *   প্রতিটি সরঞ্জাম (ছুরি, চামচ, প্লেট) একটি মডিউলের মতো (`export` করা)।
    *   যখন আপনি রান্না করতে যান (`App.js`), আপনি প্রয়োজনীয় সরঞ্জামগুলো (`import`) নিয়ে আসেন।
    *   `knife.js` (named export `cut`), `spoon.js` (named export `stir`), `plate.js` (default export `ServingPlate`)।
    *   `cook.js`: `import { cut } from './knife.js'; import { stir } from './spoon.js'; import MyPlate from './plate.js';`

*   **একটি কোম্পানির বিভিন্ন বিভাগ:**
    *   এইচআর, ফিনান্স, মার্কেটিং প্রতিটি একটি মডিউল।
    *   প্রতিটি বিভাগ তাদের নির্দিষ্ট ফাংশন (এক্সপোর্ট) প্রদান করে।
    *   সিইও (প্রধান অ্যাপ্লিকেশন) প্রয়োজন অনুযায়ী বিভিন্ন বিভাগ থেকে ফাংশন (ইম্পোর্ট) ব্যবহার করে কোম্পানি পরিচালনা করে।

**React এ ব্যবহার:**

React ইকোসিস্টেম ব্যাপকভাবে ES Modules এর উপর নির্ভরশীল।

*   **কম্পোনেন্ট তৈরি ও ব্যবহার:** প্রতিটি React কম্পোনেন্ট সাধারণত নিজস্ব `.js` বা `.jsx` ফাইলে লেখা হয় এবং `export default` করা হয়। তারপর অন্য কম্পোনেন্টে `import` করে ব্যবহার করা হয়।
    ```javascript
    // Greeting.jsx
    // import React from 'react';
    // export default function Greeting({ name }) { return <h1>Hello, {name}!</h1>; }

    // App.jsx
    // import React from 'react';
    // import Greeting from './Greeting.jsx';
    // export default function App() { return <Greeting name="World" />; }
    ```
*   **হুকস এবং ইউটিলিটি ফাংশন ইম্পোর্ট:** React থেকে `useState`, `useEffect` ইত্যাদি হুকস, অথবা কাস্টম ইউটিলিটি ফাংশনগুলো ইম্পোর্ট করা হয়।
    ```javascript
    import React, { useState, useEffect } from 'react'; // Named imports from 'react' package
    import { myCustomUtil } from './utils/myUtils.js'; // Custom util function
    ```
*   **থার্ড-পার্টি লাইব্রেরি ইম্পোর্ট:** `npm` বা `yarn` দিয়ে ইনস্টল করা লাইব্রেরিগুলো (যেমন `axios`, `lodash`, `date-fns`) তাদের ফাংশন বা কম্পোনেন্ট এক্সপোর্ট করে, যা আমরা `import` করে ব্যবহার করি।
    ```javascript
    import axios from 'axios'; // Default import from axios library
    import { debounce } from 'lodash'; // Named import from lodash
    ```

ES Modules আধুনিক JavaScript ডেভেলপমেন্টের একটি মৌলিক অংশ, যা কোডকে আরও সুসংগঠিত, রক্ষণাবেক্ষণযোগ্য এবং স্কেলেবল করে তোলে।

```
