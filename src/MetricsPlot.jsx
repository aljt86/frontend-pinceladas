import React, { useEffect, useState } from "react";

function MetricsPlot() {
  const [plotUrl, setPlotUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/metrics-plot");
        if (!response.ok) throw new Error("No se pudo cargar el gráfico");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPlotUrl(url);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlot();
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Gráfico de métricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {plotUrl ? (
        <img src={plotUrl} alt="Gráfico de métricas" style={{ maxWidth: "100%" }} />
      ) : (
        !error && <p>Cargando gráfico...</p>
      )}
    </div>
  );
}

export default MetricsPlot;