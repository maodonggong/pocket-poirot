import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("http://localhost:5000/run-sherlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const openLinks = () => {
    if (results && results.length > 0) {
      results.forEach((item) => {
        if (item.url) {
          window.open(item.url, "_blank");
        }
      });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Sherlock Username Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "10px",
              margin: "10px 0",
              width: "300px",
              display: "block",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Searching..." : "Find Accounts"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <h3>Results:</h3>
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.platform}:</strong>{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={openLinks}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Open All Links
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
