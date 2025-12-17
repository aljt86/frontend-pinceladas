import React, { useState } from "react";
import UploadForm from "./UploadForm";
import ResultsVisualizer from "./ResultsVisualizer";
import "./chartSetup"; // registra módulos de Chart.js

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 className="text-3xl font-bold text-center mb-6">Emociones IA</h1>

      {/* Formulario de subida */}
      <UploadForm setResult={setResult} />

      {/* Visualizador de resultados */}
      {result ? (
        <ResultsVisualizer result={result} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
          Sube un dibujo para analizar emociones, colores y trazos.
        </p>
      )}
    </div>
  );
}

export default App;
