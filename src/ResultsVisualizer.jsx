import React from "react";
import { Bar } from "react-chartjs-2";

// Diccionario de íconos y colores por emoción
const emotionStyles = {
  alegría: { icon: "😊", color: "rgba(255, 193, 7, 0.6)" },
  tristeza: { icon: "😢", color: "rgba(33, 150, 243, 0.6)" },
  enojo: { icon: "😠", color: "rgba(244, 67, 54, 0.6)" },
  miedo: { icon: "😨", color: "rgba(156, 39, 176, 0.6)" },
  calma: { icon: "😌", color: "rgba(76, 175, 80, 0.6)" },
  sorpresa: { icon: "😲", color: "rgba(255, 87, 34, 0.6)" },
  desconocida: { icon: "❓", color: "rgba(158, 158, 158, 0.6)" },
};

// Función para convertir RGB a HEX
function rgbToHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function ResultsVisualizer({ result }) {
  if (!result) return null;

  const predictions = result.emotional_analysis?.all_predictions || {};
  const emotion = result.emotional_analysis?.emotion || "desconocida";
  const confidence = result.emotional_analysis?.confidence || 0;

  const dominantColors = Array.isArray(result.color_analysis?.dominant_colors)
    ? result.color_analysis.dominant_colors
    : [];

  const recommendations = Array.isArray(result.recommendations)
    ? result.recommendations
    : [];

  const emotionColor = emotionStyles[emotion]?.color || emotionStyles.desconocida.color;
  const emotionIcon = emotionStyles[emotion]?.icon || emotionStyles.desconocida.icon;

  const data = {
    labels: Object.keys(predictions),
    datasets: [
      {
        label: "Confianza",
        data: Object.values(predictions),
        backgroundColor: Object.keys(predictions).map(
          (key) => emotionStyles[key]?.color || emotionStyles.desconocida.color
        ),
      },
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Emoción principal */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Emoción detectada</h2>
        <div style={{ fontSize: "4rem" }}>{emotionIcon}</div>
        <p style={{ fontSize: "1.2rem", color: emotionColor }}>
          {emotion} ({confidence.toFixed(2)})
        </p>
      </div>

      {/* Dibujo analizado */}
      {result.file_url && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h3>Dibujo analizado</h3>
          <img
            src={result.file_url}
            alt="Dibujo analizado"
            style={{
              maxHeight: "300px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      {/* Colores dominantes */}
      {dominantColors.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Colores dominantes</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {dominantColors.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: rgbToHex(color),
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gráfico de predicciones */}
      {Object.keys(predictions).length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Distribución de emociones</h3>
          <Bar data={data} />
        </div>
      )}

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <div>
          <h3>Recomendaciones</h3>
          {recommendations.map((rec, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#f0f8ff",
                borderLeft: "5px solid #4682b4",
              }}
            >
              💡 {rec}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}