import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await axios.post('https://bajaj-finserv-chi-ruddy.vercel.app/bfhl', parsedInput); // Replace with your backend URL
            setResponseData(response.data);
        } catch (error) {
            alert('Invalid JSON or server error');
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div>
                {selectedOptions.includes('numbers') && (
                    <div>Numbers: {JSON.stringify(responseData.numbers)}</div>
                )}
                {selectedOptions.includes('alphabets') && (
                    <div>Alphabets: {JSON.stringify(responseData.alphabets)}</div>
                )}
                {selectedOptions.includes('highest_lowercase_alphabet') && (
                    <div>Highest Lowercase Alphabet: {JSON.stringify(responseData.highest_lowercase_alphabet)}</div>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>{responseData ? responseData.roll_number : '21BIT0183'}</h1>
            <textarea value={jsonInput} onChange={handleInputChange} placeholder='Enter JSON here' />
            <button onClick={handleSubmit}>Submit</button>
            <select multiple onChange={handleOptionChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;
