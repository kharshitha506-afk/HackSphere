import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WasteContext = createContext();

export function useWaste() {
  return useContext(WasteContext);
}

export function WasteProvider({ children }) {
  const [waste, setWaste] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWaste = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setWaste(res.data);
    } catch (err) {
      setError("Failed to load waste data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWaste();
  }, []);

  // Actions
  const uploadWaste = async (formData) => {
    // Patch: set recyclingDate to 1 day after upload on the backend
    await axios.post("http://localhost:5000/api/upload", formData);
    fetchWaste();
  };

  const confirmWaste = async (id) => {
    await axios.post("http://localhost:5000/api/confirm", { id });
    fetchWaste();
  };

  const recycleWaste = async (id) => {
    await axios.post("http://localhost:5000/api/recycle", { id });
    fetchWaste();
  };

  return (
    <WasteContext.Provider value={{ waste, loading, error, uploadWaste, confirmWaste, recycleWaste, fetchWaste }}>
      {children}
    </WasteContext.Provider>
  );
}
