import React, { useEffect, useState } from "react";

interface FloatingEmojisProps {
  emoji: string;
  count?: number; // cantidad de emojis flotando
}

const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ emoji, count = 20 }) => {
  const [emojis, setEmojis] = useState<{ id: number; left: string; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`, // posición horizontal aleatoria
      size: 24 + Math.random() * 40,   // tamaño más grande
      duration: 10 + Math.random() * 10, // duración de la animación
    }));
    setEmojis(newEmojis);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((e) => (
        <span
          key={e.id}
          style={{
            left: e.left,
            fontSize: `${e.size}px`,
            animationDuration: `${e.duration}s`,
          }}
          className="absolute animate-float"
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingEmojis;
