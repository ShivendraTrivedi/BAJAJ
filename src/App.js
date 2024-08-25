
import React, { useState  } from 'react';
import axios from 'axios';


// useEffect(() => {
//     document.title = "21BCE0253"; // Replace with your actual roll number
//   }, []);

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Parse and validate JSON input
      const parsedInput = JSON.parse(jsonInput);
  
      // Call the backend API
      const res = await axios.post('https://bajaj-backend-red.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Error details:", error);
      alert('Invalid JSON input or API call failed.');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    
    let renderedData = {};
    if (selectedOptions.includes('Alphabets')) {
      renderedData['alphabets'] = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      renderedData['numbers'] = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      renderedData['highest_lowercase_alphabet'] = response.highest_lowercase_alphabet;
    }
    
    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(renderedData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BIT0183</h1>
      <textarea 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder='Enter JSON here' 
        rows="5" 
        cols="50" 
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
