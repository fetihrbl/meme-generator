import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState({ top: "", bottom: "" });
  const [memes, setMemes] = useState([]);
  const [selectedMem, setSelectedMem] = useState(null);

  // Fetch meme data once when the component mounts
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes))
      .catch((error) => console.error("Failed to fetch memes:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate a random meme
  const generateMeme = (e) => {
    e.preventDefault();
    if (memes.length) {
      setSelectedMem(memes[Math.floor(Math.random() * memes.length)]);
    }
  };

  return (
    <div className="App">
      <h1>Meme Generator 🎭</h1>

      <form className="meme-form" onSubmit={generateMeme}>
        {["top", "bottom"].map((field) => {
          return (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={`Enter ${field} text`}
              value={text[field]}
              onChange={handleChange}
            />
          );
        })}
        <button type="submit">Generate</button>
      </form>

      {selectedMem && (
        <div className="meme">
          <img src={selectedMem.url} alt="Meme" />
          {["top", "bottom"].map((pos) => (
            <h2 key={pos} className={pos}>
              {text[pos]}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
