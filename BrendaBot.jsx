import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const BrendaBot = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("work");
  const [urgency, setUrgency] = useState([3]);
  const [situation, setSituation] = useState("");
  const [who, setWho] = useState("");
  const [ask, setAsk] = useState("");
  const [wish, setWish] = useState("");
  const [tone, setTone] = useState("all");
  const [responseReady, setResponseReady] = useState(false);

  const responseRef = useRef(null);

  const handleGenerate = () => {
    if (situation && who && ask && wish && firstName && email) {
      setResponseReady(true);
    }
  };

  const handleDownloadPDF = () => {
    if (responseRef.current) {
      html2pdf().from(responseRef.current).save(`${firstName}_boundary_script.pdf`);
    }
  };

  const handleCopyToClipboard = () => {
    if (responseRef.current) {
      const text = responseRef.current.innerText;
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-purple-800">
        👋 Hello, powerhouse!
      </h1>
      <p className="mb-4 text-gray-700">
        Ready to reclaim your time, energy, and peace? Whether you're overwhelmed at work,
        stretched too thin at home, or just saying yes too often, I'm here to help you craft a
        boundary that's calm, clear, and aligned with your values.
      </p>

      <div className="space-y-4">
        <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="work">Work</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="community">Community</option>
          <option value="other">Other</option>
        </select>
        <label>
          Urgency (1 = Low, 5 = High): 
          <input type="range" min="1" max="5" step="1" value={urgency} onChange={(e) => setUrgency([Number(e.target.value)])} />
        </label>
        <textarea placeholder="Describe the situation..." value={situation} onChange={(e) => setSituation(e.target.value)} />
        <input placeholder="Who’s involved?" value={who} onChange={(e) => setWho(e.target.value)} />
        <input placeholder="What are they asking?" value={ask} onChange={(e) => setAsk(e.target.value)} />
        <input placeholder="What do you *wish* you could say?" value={wish} onChange={(e) => setWish(e.target.value)} />
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="all">All Tones</option>
          <option value="gentle">💗 Gentle & Loving</option>
          <option value="professional">💼 Professional & Clear</option>
          <option value="bold">💥 Bold & Direct</option>
        </select>
        <button onClick={handleGenerate}>Generate My Boundary Scripts</button>
      </div>

      {responseReady && (
        <div ref={responseRef} className="mt-6 space-y-4 text-gray-800">
          {(tone === "gentle" || tone === "all") && (
            <div>
              <h2 className="text-xl font-semibold text-purple-700">💗 Gentle & Loving</h2>
              <p>“I care deeply about you, and I need to be honest: I don't have the capacity to take this on right now. I hope you understand.”</p>
            </div>
          )}
          {(tone === "professional" || tone === "all") && (
            <div>
              <h2 className="text-xl font-semibold text-purple-700">💼 Professional & Clear</h2>
              <p>“Thanks for reaching out. I’m currently at full capacity and won’t be able to support this. Wishing you success with it.”</p>
            </div>
          )}
          {(tone === "bold" || tone === "all") && (
            <div>
              <h2 className="text-xl font-semibold text-purple-700">💥 Bold & Direct</h2>
              <p>“This doesn't work for me. I’m not available to do that, and I need you to respect this boundary.”</p>
            </div>
          )}
          <div className="mt-4 italic text-green-700">
            🌱 Affirmation: “Every time I set a boundary, I honor my energy and worth.”
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleDownloadPDF}>📄 Download as PDF</button>
            <button onClick={handleCopyToClipboard}>📋 Copy to Clipboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrendaBot;
