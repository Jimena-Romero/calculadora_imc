import React, { useEffect, useState } from "react";

function UseEffect() {
  const [tarjeta, setTarjeta] = useState("Lopez Pedro");

  const handleTarjeta = (event) => {
    setTarjeta(event.target.value);
  };

  /**
   * useEffect
   *
   * `useEffect` recibe como parametro una funcion anonima o declarada.
   * Esta funcion se ejecutara cada vez que el componente se renderice, o alguna de sus dependencias cambie.
   *
   * En este `useEffect` no tendremos utilizacion de dependencias, por lo que se ejecutara cada vez que
   * el componente que lo contiene se renderice.
   */
  useEffect(() => {
    console.log("Hola, acabo de cargar el componente.");
  });

  return (
    <div>
      <h1> Use Effect</h1>
      <form>
        <strong> {tarjeta} </strong>

        <input
          type="text"
          onChange={handleTarjeta}
          placeholder="Ingrese los datos"
        />
      </form>
    </div>
  );
}

export default UseEffect;
