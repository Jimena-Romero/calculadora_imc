import React, { useState, useEffect } from "react";

const emojisMap: { [key: string]: string } = {
  bajo: "🥗",
  normal: "💪",
  sobrepeso: "🍔",
  obesidad: "🍩",
};

const getIMCCategory = (imc: number) => {
  if (imc < 18.5) return "bajo";
  if (imc < 25) return "normal";
  if (imc < 30) return "sobrepeso";
  return "obesidad";
};

const FloatingEmojis = ({ emoji }: { emoji: string }) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => [
        ...prev,
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            fontSize: "3rem",
            animation: "float 6s linear infinite",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {emoji}
        </div>
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-150px); opacity: 0; }
          }
        `}
      </style>
    </>
  );
};

const IMCForm: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState<number | "">("");
  const [altura, setAltura] = useState<number | "">("");
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);

  useEffect(() => {
    if (peso && altura) {
      const alturaMetros = Number(altura) / 100;
      const imcValue = Number(peso) / (alturaMetros * alturaMetros);
      setImc(imcValue);
      setCategoria(getIMCCategory(imcValue));
    }
  }, [peso, altura]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f9f9f9, #e0f7fa)", // ligero degradado de fondo
      }}
    >
      {/* emojis de fondo */}
      <FloatingEmojis emoji={categoria ? emojisMap[categoria] : "🟦"} />

      {/* marco elegante centrado */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "360px",
          margin: "60px auto",
          padding: "30px 25px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // semitransparente
          borderRadius: "25px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          backdropFilter: "blur(8px)", // efecto vidrio
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontWeight: "600", color: "#333" }}>
          Calculadora de IMC
        </h2>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "12px",
            width: "90%",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "12px",
            width: "90%",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <input
          type="number"
          placeholder="Altura (cm)"
          value={altura}
          onChange={(e) => setAltura(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "12px",
            width: "90%",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        {imc && categoria && (
          <div style={{ marginTop: "20px", fontSize: "1.2rem", color: "#222" }}>
            <p>
              Hola <strong>{nombre || "usuario"}</strong>!! Tu IMC es{" "}
              <strong>{imc.toFixed(2)}</strong> →{" "}
              <strong>{categoria.toUpperCase()}</strong> {emojisMap[categoria]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IMCForm;

