import { useState } from "react";

function Home() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8082/resume/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // Sort by best match
    data.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setResults(data);
  };

  const getColor = (percent) => {
    if (percent >= 80) return "green";
    if (percent >= 50) return "orange";
    return "red";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #8e0e00, #1f1c18)",
      padding: "20px",
      color: "white"
    }}>
      <h1 style={{ textAlign: "center" }}>
         Smart Job Matching & Profile Optimizer
      </h1>

      {/* Upload Section */}
      <div style={{
        background: "white",
        color: "black",
        padding: "20px",
        borderRadius: "15px",
        maxWidth: "400px",
        margin: "20px auto"
      }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            borderRadius: "10px",
            background: "#ff4b2b",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Analyze Resume
        </button>
      </div>

      {/* Best Match */}
      {results.length > 0 && (
        <div style={{
          background: "#fff3cd",
          color: "black",
          padding: "15px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "20px auto",
          textAlign: "center"
        }}>
          <h2>🏆 Best Match: {results[0].jobTitle}</h2>
          <p>{results[0].matchPercentage.toFixed(2)}% Match</p>
        </div>
      )}

      {/* Results */}
      <div>
        {results.map((job, index) => (
          <div key={index} style={{
            background: "white",
            color: "black",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "15px",
            maxWidth: "500px"
          }}>
            <h2>{job.jobTitle}</h2>

            {/* Progress Bar */}
            <div style={{
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
              height: "10px",
              margin: "10px 0"
            }}>
              <div style={{
                width: `${job.matchPercentage}%`,
                backgroundColor: getColor(job.matchPercentage),
                height: "100%"
              }} />
            </div>

            <p>
              Match: <strong>{job.matchPercentage.toFixed(2)}%</strong>
            </p>

            <p style={{ color: "green" }}>
              ✔ Matched: {job.matchedSkills.join(", ")}
            </p>

            <p style={{ color: "red" }}>
              ✘ Missing: {job.missingSkills.join(", ") || "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;