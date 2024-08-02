import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bfhl-backend-flame.vercel.app/",
        JSON.parse(jsonInput)
      );
      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError("Invalid JSON or server error");
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.some((option) => option.value === "numbers") && (
          <div>Numbers: {response.numbers.join(",")}</div>
        )}
        {selectedOptions.some((option) => option.value === "alphabets") && (
          <div>Alphabets: {response.alphabets.join(",")}</div>
        )}
        {selectedOptions.some(
          (option) => option.value === "highest_alphabet"
        ) && <div>Highest Alphabet: {response.highest_alphabet.join(",")}</div>}
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
        <Select isMulti options={options} onChange={handleOptionChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        <h2>Filtered Response</h2>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
