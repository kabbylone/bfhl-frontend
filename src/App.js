import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-backend-url.vercel.app/bfhl",
        JSON.parse(jsonInput)
      );
      setResponse(response.data);
    } catch (error) {
      alert("Invalid JSON or server error");
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes("numbers") && (
          <div>Numbers: {JSON.stringify(response.numbers)}</div>
        )}
        {selectedOptions.includes("alphabets") && (
          <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
        )}
        {selectedOptions.includes("highest_alphabet") && (
          <div>
            Highest Alphabet: {JSON.stringify(response.highest_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON"
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <>
          <h2>Options</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />{" "}
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />{" "}
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleOptionChange}
            />{" "}
            Highest Alphabet
          </label>
        </>
      )}

      <div>
        <h2>Response</h2>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
