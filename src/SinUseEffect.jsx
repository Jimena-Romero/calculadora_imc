import React, { useEffect, useState } from "react";

function SinUseEffect() {
  const [tarjeta, setTarjeta] = useState("Lopez Pedro");

  const handleTarjeta = (event) => {
    setTarjeta(event.target.value);
  };

  return (
    <div>
      <h1> Sin Use Effect</h1>
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

export default SinUseEffect;
