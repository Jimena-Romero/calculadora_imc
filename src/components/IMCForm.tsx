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
            position: "fixed", // 👈 cambia a fixed para que queden de fondo
            left: pos.x,
            top: pos.y,
            fontSize: "3rem",
            animation: "float 6s linear infinite",
            zIndex: 0, // 👈 aseguramos que estén detrás del contenido
            pointerEvents: "none", // 👈 no interfieran con clicks
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
        padding: "20px",
        textAlign: "center",
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden", // 👈 evita scroll por emojis
        backgroundColor: "#f0f0f0",
      }}
    >
      <FloatingEmojis emoji={categoria ? emojisMap[categoria] : "💖"} />

      <div
        style={{
          position: "relative",
          zIndex: 1, // 👈 aseguramos que el formulario esté sobre los emojis
          maxWidth: "400px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Calculadora de IMC</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "90%",
            fontSize: "1rem",
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
            padding: "10px",
            width: "90%",
            fontSize: "1rem",
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
            padding: "10px",
            width: "90%",
            fontSize: "1rem",
          }}
        />

        {imc && categoria && (
          <div style={{ marginTop: "20px", fontSize: "1.2rem" }}>
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
