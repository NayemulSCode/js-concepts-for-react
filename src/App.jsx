import React, { useState } from 'react';
import './App.css'; // Assuming you have some basic styles here

// Import utility functions
import {
  createUserGreeting,
  processNumbers,
  getNestedProperty,
  wait,
  summarizeOrder,
  thisTestObject
} from './utils'; // .js extension is often optional with build tools

// Import React components
import UserProfile from './components/UserProfile';
import TodoList from './components/TodoList';
import AsyncDataFetcher from './components/AsyncDataFetcher';

function App() {
  // State for AsyncDataFetcher example
  const [currentUserId, setCurrentUserId] = useState(1);

  // --- Examples for Utility Functions ---
  const handleUtilExamples = () => {
    console.log("--- Running Utility Function Examples ---");

    // 1. createUserGreeting
    console.log("\n1. createUserGreeting:");
    console.log(createUserGreeting({ name: "Jules Verne", age: 77, location: "Amiens" }));
    console.log(createUserGreeting({ name: "Captain Nemo", age: 150 })); // Location will be 'Unknown'

    // 2. processNumbers
    console.log("\n2. processNumbers:");
    const processed = processNumbers(3, 10, 20, 'thirty', 40, 55);
    console.log("Processed Numbers:", processed);

    // 3. getNestedProperty
    console.log("\n3. getNestedProperty:");
    const objWithProps = {
      id: 'obj1',
      address: { street: "Baker Street", number: "221B" },
      friends: [{ name: "Watson" }, { name: "Adler" }],
      getCustomData: () => "Secret Data from Method"
    };
    const objWithoutSomeProps = { id: 'obj2', address: null };
    console.log("With all props:", getNestedProperty(objWithProps));
    console.log("With missing props:", getNestedProperty(objWithoutSomeProps));

    // 4. wait (async function)
    console.log("\n4. wait (Async):");
    (async () => {
      try {
        console.log("Starting wait...");
        const waitResult = await wait(500); // Reduced time for quick demo
        console.log(waitResult);
      } catch (e) {
        console.error("Wait function error:", e.message);
      }
    })();

    // 5. summarizeOrder
    console.log("\n5. summarizeOrder:");
    const order = {
      items: [
        { name: "Spaceship Model", price: 199.99 },
        { name: "Anti-gravity Boots", price: 750.50 },
        { name: "Laser Pen", price: 45.00 }
      ],
      user: { id: "usr_007", name: "Commander Ada" }
    };
    console.log(summarizeOrder(order));
    console.log(summarizeOrder({ items: [{ name: "Mystery Box" }] })); // User will be Guest, price 0

    // 6. thisTestObject
    console.log("\n6. thisTestObject:");
    console.log("Regular function 'this':", thisTestObject.getValueRegular()); // "ObjectValue"
    // The behavior of 'this' in arrow functions at the object literal level is lexical.
    // If utils.js is treated as a standard ES module, 'this' at its top level is undefined.
    // Thus, thisTestObject.getValueArrow() will likely reflect that lexical 'this'.
    console.log("Arrow function 'this':", thisTestObject.getValueArrow());
    // In Node.js running a module, top-level 'this' is undefined.
    // If this code were in a browser <script type="module">, top-level 'this' is also undefined.

    console.log("--- Utility Function Examples End ---");
  };

  // --- Data for UserProfile component ---
  const sampleUser1 = {
    name: "Alice Wonderland",
    age: 28,
    email: "alice.w@example.com",
    roles: ["Admin", "Editor"],
    profile: {
      bio: "Curiouser and curiouser!",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      socialLinks: {
        twitter: "https://twitter.com/alice",
        linkedin: "https://linkedin.com/in/alice"
      }
    }
  };

  const sampleUser2 = {
    name: "Bob The Builder",
    age: 35,
    // No email
    roles: ["Contributor"],
    profile: {
      // No bio
      // No avatarUrl (will use default)
      socialLinks: { twitter: "https://twitter.com/bob" }
    }
  };

  const guestUser = undefined; // To test default prop


  return (
    <div className="App">
      <header className="App-header">
        <h1>React & JavaScript Concepts Demo</h1>
        <p>Open the console to see utility function outputs.</p>
        <button onClick={handleUtilExamples} style={{margin: '10px', padding: '8px'}}>Run Utility Examples</button>
      </header>

      <hr style={{margin: '20px 0'}} />

      <section>
        <h2>UserProfile Component Examples</h2>
        <UserProfile user={sampleUser1} showFullProfile={true} />
        <UserProfile user={sampleUser2} showFullProfile={false} />
        <UserProfile user={guestUser} /> {/* This will use the default user prop in UserProfile */}
      </section>

      <hr style={{margin: '20px 0'}} />

      <section>
        <h2>TodoList Component Example</h2>
        <TodoList />
      </section>

      <hr style={{margin: '20px 0'}} />

      <section>
        <h2>AsyncDataFetcher Component Example</h2>
        <p>Fetches data from jsonplaceholder.typicode.com</p>
        <div>
          Current User ID to Fetch: {currentUserId}
          <button onClick={() => setCurrentUserId(id => (id % 10) + 1)} style={{marginLeft: '10px'}}>
            Fetch Next User (1-10)
          </button>
        </div>
        <AsyncDataFetcher userId={currentUserId} />
      </section>

      <footer style={{marginTop: '30px', padding: '15px', textAlign: 'center', borderTop: '1px solid #eee'}}>
        <p>End of Demo</p>
      </footer>
    </div>
  );
}

export default App;
