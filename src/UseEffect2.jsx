import React, { useEffect, useState } from "react";

function UseEffect2() {
  const [tarjeta, setTarjeta] = useState("Lopez Pedro");
  const [contador, setContador] = useState(0);

  const handleTarjeta = (event) => {
    setTarjeta(event.target.value);
  };

  const handleContador = (event) => {
    event.preventDefault();
    setContador(contador + 1);
  };

  useEffect(() => {
    console.log("Hola, acabo de cargar el componente.");
  });

  return (
    <div>
      <div>
        <h1> Use Effect</h1>
        <form>
          <strong> {tarjeta} </strong>

          <input
            type="text"
            onChange={handleTarjeta}
            placeholder="Ingrese los datos"
          />

          <p>El contador está en: {contador}</p>
          <button onClick={handleContador}> Click </button>
        </form>
      </div>
    </div>
  );
}

export default UseEffect2;
