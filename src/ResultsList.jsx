import React, { useEffect, useState } from "react";

function ResultsList() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/get-results");
      if (!response.ok) throw new Error("No se pudieron obtener los resultados.");
      const data = await response.json();
      setResults(data.resultados || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Historial de análisis</h2>

      {loading && <p>Cargando resultados...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p>No hay resultados guardados aún.</p>
      )}

      {!loading && !error && results.length > 0 && (
        <div>
          <button onClick={fetchResults} style={{ marginBottom: 12 }}>
            Recargar
          </button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((r, idx) => (
              <li
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                }}
              >
                <div>
                  <strong>Fecha:</strong> {r.timestamp}
                </div>
                <div>
                  <strong>Emociones:</strong> {JSON.stringify(r.emociones)}
                </div>
                <div>
                  <strong>Colores:</strong> {JSON.stringify(r.colores)}
                </div>
                <div>
                  <strong>Formas:</strong> {JSON.stringify(r.formas)}
                </div>
              </li>
            ))}
          </ul>

          <a
            href="http://127.0.0.1:8000/get-results-csv"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", marginTop: 8 }}
          >
            Descargar CSV
          </a>
        </div>
      )}
    </div>
  );
}

export default ResultsList;