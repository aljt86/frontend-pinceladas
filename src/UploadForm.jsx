import React, { useState } from "react";
import axios from "axios";

export default function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://backend-pinceladas.onrender.com/analyze-drawing",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del backend:", response.data); // para depurar
      setResult(response.data);
    } catch (error) {
      console.error("Error al analizar:", error);
      if (error.response) {
        alert(`Error del servidor: ${error.response.data.detail || "Error desconocido"}`);
      } else {
        alert("No se pudo conectar con el backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Analizando..." : "Analizar"}
      </button>
    </div>
  );
}