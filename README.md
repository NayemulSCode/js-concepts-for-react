✅ 1. var, let, const
📌 কেন দরকার:
Scope (ব্লক বা ফাংশনের মধ্যে ভ্যারিয়েবল কাজ করবে কিনা) বোঝার জন্য।

React-এ Immutability মেনে চলতে হয়, const অনেক বেশি ব্যবহৃত হয়।

📦 উদাহরণ:
js
Copy
Edit
function demo() {
  if (true) {
    var x = 10; // function scoped
    let y = 20; // block scoped
    const z = 30; // block scoped and constant
  }
  console.log(x); // ✅
  console.log(y); // ❌ ReferenceError
}
🧠 React-এ:
js
Copy
Edit
const [count, setCount] = useState(0); // const is used because we don’t reassign count
✅ 2. Arrow Functions
📌 কেন দরকার:
Concise syntax

this automatically bind করে – especially in class components (though now less used)

📦 উদাহরণ:
js
Copy
Edit
const add = (a, b) => a + b;
🧠 React-এ:
js
Copy
Edit
const handleClick = () => {
  setCount(prev => prev + 1);
};
✅ 3. this keyword
📌 কেন দরকার:
Class components-এ context বোঝার জন্য

Arrow function vs normal function behavior

📦 উদাহরণ:
js
Copy
Edit
class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = { name: 'Nayeem' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.name); // ✅ this works because it's bound
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
✅ 4. Template Literals
📌 কেন দরকার:
JSX-এর মধ্যে ডায়নামিক string inject করার জন্য

📦 উদাহরণ:
js
Copy
Edit
const name = "Nayeem";
console.log(`Hello, ${name}!`);
🧠 React-এ:
jsx
Copy
Edit
<h1>{`Welcome, ${user.name}`}</h1>
✅ 5. Destructuring
📌 কেন দরকার:
Props ও state থেকে value সহজে বের করতে

📦 উদাহরণ:
js
Copy
Edit
const user = { name: "Nayeem", age: 28 };
const { name, age } = user;
🧠 React-এ:
js
Copy
Edit
function UserCard({ name, age }) {
  return <p>{name} is {age} years old</p>;
}
✅ 6. Spread & Rest Operators (...)
📌 কেন দরকার:
State আপডেট, Props forwarding, object merge

📦 উদাহরণ:
js
Copy
Edit
const user = { name: "Nayeem" };
const newUser = { ...user, age: 28 }; // Spread
🧠 React-এ:
js
Copy
Edit
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
✅ 7. Array Methods: map(), filter(), find()
📌 কেন দরকার:
JSX এর মধ্যে লিস্ট render করতে

📦 উদাহরণ:
js
Copy
Edit
const fruits = ['Apple', 'Banana'];
const list = fruits.map(fruit => <li>{fruit}</li>);
✅ 8. Ternary Operators & Logical &&
📌 কেন দরকার:
Conditional rendering করতে

📦 উদাহরণ:
jsx
Copy
Edit
{isLoggedIn ? <LogoutButton /> : <LoginButton />}
{user && <p>Welcome, {user.name}</p>}
✅ 9. Optional Chaining (?.)
📌 কেন দরকার:
Undefined property access করার সময় error থেকে বাঁচায়

📦 উদাহরণ:
js
Copy
Edit
const user = { profile: { name: "Nayeem" } };
console.log(user?.profile?.name); // "Nayeem"
✅ 10. null, undefined, false Handling
📌 কেন দরকার:
JSX-এ এই value render হলে কিছু দেখা যায় না

ইচ্ছাকৃত ভাবে কিছু hide/show করা যায়

🧠 React-এ:
jsx
Copy
Edit
{user?.name && <p>Hello, {user.name}</p>}
✅ 11. Promise, async/await
📌 কেন দরকার:
API calls করতে এবং asynchronous data handle করতে

📦 উদাহরণ:
js
Copy
Edit
async function fetchData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  console.log(data);
}
✅ 12. try...catch
📌 কেন দরকার:
Errors handle করতে — API call বা async কোডে

📦 উদাহরণ:
js
Copy
Edit
try {
  const res = await fetch('/api/data');
  const data = await res.json();
} catch (error) {
  console.error('Error fetching data', error);
}
✅ 13. ES Modules: import/export
📌 কেন দরকার:
Components ভাগ করে কাজ করতে

📦 উদাহরণ:
js
Copy
Edit
// file: Button.js
export default function Button() {
  return <button>Click</button>;
}

// file: App.js
import Button from './Button';