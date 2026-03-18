import { useState } from "react";
import axios from "axios";

import { useState, useRef } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [scanResult, setScanResult] = useState("");

  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef();
    if (!file) {
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
      setError("");
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setError("");
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Select a file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    setProgress(0);
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        onUploadProgress: (p) => setProgress(Math.round((p.loaded * 100) / p.total)),
      });
      setSuccess("Uploaded successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setFile(null);
      setPreview(null);
      setProgress(0);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      setError("Upload failed.");
    }
    setLoading(false);
  };
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
      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current.click()}
        tabIndex={0}
      >
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {!preview ? (
          <div className="upload-dropzone-content">
            <FaCloudUploadAlt size={38} style={{color:'#2563eb',marginBottom:8}}/>
            <div>Drag & drop file here<br/>or <span className="upload-browse">browse</span></div>
          </div>
        ) : (
          <div className="upload-preview">
            <img src={preview} alt="Preview" />
            <button className="upload-remove-btn" onClick={e => {e.stopPropagation(); setFile(null); setPreview(null);}}><FaTimesCircle/></button>
          </div>
        )}
      </div>
      {progress > 0 && loading && (
        <div className="upload-progress-bar"><div style={{width: progress+"%"}}/></div>
      )}
      {error && <div className="error" style={{marginTop:10}}>{error}</div>}
      <button className="dashboard-confirm-btn" onClick={uploadFile} disabled={loading} style={{marginTop:18}}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {showToast && (
        <div className="upload-toast success"><FaCheckCircle style={{marginRight:6}}/> Uploaded successfully!</div>
      )}
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