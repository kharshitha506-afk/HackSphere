import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [scanResult, setScanResult] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setError("Select a file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    setScanResult("");
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      setSuccess("Uploaded successfully!");
      setFile(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError("Upload failed.");
    }
    setLoading(false);
  };

  const scanImage = () => {
    if (!file) {
      setScanResult("No image selected.");
      return;
    }
    setScanResult("Scanning image...");
    setTimeout(() => {
      setScanResult("Scan complete: Waste detected.");
    }, 1500);
  };

  return (
    <div className="card">
      <h3>Upload Waste</h3>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
          setScanResult("");
        }}
      />
      {preview && (
        <div style={{ margin: "10px 0" }}>
          <img src={preview} alt="Preview" style={{ width: 120, borderRadius: 8 }} />
        </div>
      )}
      <button onClick={scanImage} disabled={!file || loading} style={{ marginRight: 8 }}>
        Scan Image
      </button>
      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {scanResult && <p>{scanResult}</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}