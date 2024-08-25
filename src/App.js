

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const jsonData = JSON.parse(inputData); // Parse input data
      const response = await axios.post('https://bajaj-backend-theta-virid.vercel.app/bfhl', jsonData);
      setResponseData(response.data); // Set the response data
    } catch (err) {
      if (err.response) {
        // If server responds with an error
        setError(err.response.data.error);
      } else {
        // If there was an error in the request
        setError('Invalid input or server error');
      }
    }
  };

  return (
    <div>
      <h1>Bajaj Finserv Health Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter JSON data here...'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
