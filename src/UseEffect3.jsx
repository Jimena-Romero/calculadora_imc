import React, { useEffect, useState } from "react";

function UseEffect3() {
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
    console.log("ingresamos solo al inicio");
  }, []);

  /**
   * El mismo concepto de `useEffect` original, solo que envolvemos sus dependencias
   * en un `Array` al final de la funcion.
   *
   * Cada vez que uno de los valores de las dependencias cambie, se ejecutara la funcion del `useEffect`.
   * En este caso, cada vez que cambie el estado de `tarjeta` se ejecutara el `console.log`.
   *
   * IMPORTANTE: La dependencia debe tener estado, si es una constante o un valor fijo, no es una dependencia.
   */
  useEffect(() => {
    console.log("ingresamos solo con el valor de tarjeta ");
  }, [tarjeta]);

  useEffect(() => {
    console.log("ingresamos solo con el valor de contador ");
  }, [contador]);

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

export default UseEffect3;
