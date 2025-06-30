import React, { useState, useEffect } from 'react';

// Demonstrates: useEffect hook for side effects (data fetching),
// useState hook for managing loading, data, and error states,
// async/await for handling promises from fetch API,
// try...catch for error handling in async functions,
// Conditional rendering based on loading and error states.
// Optional Chaining in displaying data
// ES Modules: This component itself is a module, and it imports from 'react'.

// Utility function from utils.js (assuming it's available)
// We'll use a simple local one if utils.js is not set up for this specific example run easily
// import { wait } from '../utils'; // If utils.js is in src/
const localWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function AsyncDataFetcher({ userId = 1 }) { // Default prop for userId
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component mounts or userId changes
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      setData(null); // Reset data state on new fetch

      try {
        // Simulate network delay (optional, for better loading state visibility)
        // await wait(1000); // Assuming wait is imported or defined
        await localWait(1000);


        // Using fetch API which returns a Promise
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        // Check if the response was successful
        if (!response.ok) {
          // If not ok, throw an error to be caught by the catch block
          throw new Error(`Failed to fetch data. Status: ${response.status} - ${response.statusText || 'Unknown Error'}`);
        }

        const jsonData = await response.json(); // .json() also returns a Promise
        setData(jsonData);
      } catch (err) {
        // Catch any errors from the try block (network error, or thrown error)
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        // This block executes regardless of success or failure
        setLoading(false);
      }
    };

    fetchData(); // Call the async function

    // Cleanup function (optional)
    // Useful for aborting fetch requests if the component unmounts or userId changes before fetch completes
    // const abortController = new AbortController();
    // fetchData(abortController.signal);
    // return () => {
    //   abortController.abort();
    // };

  }, [userId]); // Dependency array: useEffect runs again if userId changes

  // Conditional rendering based on loading state
  if (loading) {
    return <p>Loading data for user {userId}...</p>;
  }

  // Conditional rendering based on error state
  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  // Render data if available
  // Using Optional Chaining (data?.property) for safer access
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h2>User Data (ID: {userId})</h2>
      {data ? (
        <div>
          <p><strong>Name:</strong> {data?.name ?? 'N/A'}</p>
          <p><strong>Username:</strong> {data?.username ?? 'N/A'}</p>
          <p><strong>Email:</strong> {data?.email ?? 'N/A'}</p>
          <p><strong>Phone:</strong> {data?.phone ?? 'N/A'}</p>
          <p><strong>Website:</strong> {data?.website ?? 'N/A'}</p>
          <p><strong>Company:</strong> {data?.company?.name ?? 'N/A'}</p>
          <p><strong>City:</strong> {data?.address?.city ?? 'N/A'}</p>
        </div>
      ) : (
        <p>No data available for user {userId}.</p>
      )}
    </div>
  );
}

export default AsyncDataFetcher;
