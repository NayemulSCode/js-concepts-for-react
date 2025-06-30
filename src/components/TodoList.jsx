import React, { useState } from 'react';

// Demonstrates: useState hook, Array map() for rendering lists,
// Arrow functions for event handlers, Spread operator for array updates (immutability),
// Destructuring from useState, Conditional styling based on state.
function TodoList() {
  // useState for managing the list of todos and the input field value
  // Destructuring: `todos` is the state, `setTodos` is the updater function
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Basics', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Explore Advanced React', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Arrow function for handling input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Arrow function for adding a new todo
  const handleAddTodo = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    if (inputValue.trim() === '') return; // Do not add empty todos

    const newTodo = {
      id: Date.now(), // Simple unique ID using timestamp
      text: inputValue,
      completed: false,
    };
    // Spread operator to add new todo immutably
    setTodos([...todos, newTodo]);
    setInputValue(''); // Clear input field
  };

  // Arrow function for toggling todo completion status
  const toggleTodoCompletion = (id) => {
    setTodos(
      // Array map() to create a new array with the updated todo
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Spread operator for object update
      )
    );
  };

  // Arrow function for deleting a todo
  const handleDeleteTodo = (id) => {
    // Array filter() to create a new array without the deleted todo
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos based on the current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });


  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px' }}>Add Todo</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        Filter:
        <button onClick={() => setFilter('all')} style={{ marginLeft: '5px', background: filter === 'all' ? 'lightblue' : 'white' }}>All</button>
        <button onClick={() => setFilter('active')} style={{ marginLeft: '5px', background: filter === 'active' ? 'lightblue' : 'white' }}>Active</button>
        <button onClick={() => setFilter('completed')} style={{ marginLeft: '5px', background: filter === 'completed' ? 'lightblue' : 'white' }}>Completed</button>
      </div>

      <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '15px' }}>
        {/* Array map() to render the list of todos */}
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: '8px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // Conditional styling based on todo.completed
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#000',
            }}
          >
            <span onClick={() => toggleTodoCompletion(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '3px 6px', borderRadius: '3px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && <p>No todos to display for this filter.</p>}
    </div>
  );
}

export default TodoList;
