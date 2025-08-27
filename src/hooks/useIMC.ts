// Custom hook con useEffect para recalcular y persistir (S y D de SOLID)
import { useEffect, useMemo, useState } from 'react';
import type { IBMICalculator, BMIInput, BMIResult, UnitSystem } from '../domain/imc';
import { StandardBMICalculator } from '../services/IMCCalculator';

const STORAGE_KEY = 'imc:inputs';

export function useBMI(calculator: IBMICalculator = new StandardBMICalculator()) {
  const [system, setSystem] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [result, setResult] = useState<BMIResult | null>(null);

  // Cargar estado inicial desde localStorage una sola vez
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { system, weight, height } = JSON.parse(raw);
        if (system) setSystem(system);
        if (weight) setWeight(Number(weight));
        if (height) setHeight(Number(height));
      } catch {
        // ignore
      }
    }
  }, []);

  // Recalcular IMC cada vez que cambian inputs
  useEffect(() => {
    const input: BMIInput = { system, weight, height };
    const r = calculator.calculate(input);
    setResult(r);
  }, [calculator, system, weight, height]);

  // Guardar inputs en localStorage (debounce simple)
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ system, weight, height })
      );
    }, 200);
    return () => clearTimeout(id);
  }, [system, weight, height]);

  const handlers = useMemo(
    () => ({
      setSystem,
      setWeight: (v: string | number) => setWeight(Number(v)),
      setHeight: (v: string | number) => setHeight(Number(v))
    }),
    []
  );

  return { system, weight, height, result, ...handlers };
}
