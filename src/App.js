// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [jsonInput, setJsonInput] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleJsonInputChange = (event) => {
//     setJsonInput(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setResponseData(null);

//     try {
//       const parsedInput = JSON.parse(jsonInput);
//       const response = await fetch("https://your-api-url.herokuapp.com/bfhl", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(parsedInput),
//       });

//       const data = await response.json();
//       setResponseData(data);
//     } catch (err) {
//       setError("Invalid JSON or server error.");
//     }
//   };

//   const handleSelectChange = (event) => {
//     const value = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedOptions(value);
//   };

//   const filterResponseData = (responseData) => {
//     const filteredData = {};
//     if (selectedOptions.includes("Numbers")) {
//       filteredData.numbers = responseData.numbers;
//     }
//     if (selectedOptions.includes("Alphabets")) {
//       filteredData.alphabets = responseData.alphabets;
//     }
//     if (selectedOptions.includes("Highest lowercase alphabet")) {
//       filteredData.highest_lowercase_alphabet =
//         responseData.highest_lowercase_alphabet;
//     }
//     return filteredData;
//   };

//   return (
//     <div className="App">
//       <h1>BFHL API</h1>
//       <form onSubmit={handleFormSubmit}>
//         <textarea
//           value={jsonInput}
//           onChange={handleJsonInputChange}
//           placeholder="Enter JSON here"
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {responseData && (
//         <>
//           <select multiple onChange={handleSelectChange}>
//             <option>Numbers</option>
//             <option>Alphabets</option>
//             <option>Highest lowercase alphabet</option>
//           </select>
//           <pre>{JSON.stringify(filterResponseData(responseData), null, 2)}</pre>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.js

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
      const response = await axios.post('http://localhost:3005/bfhl', jsonData);
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
