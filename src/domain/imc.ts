// Entidades, tipos y contratos del dominio (S de SOLID)
export type UnitSystem = 'metric' | 'imperial';

export interface BMIInput {
  weight: number; // kg o lb según sistema
  height: number; // cm o in según sistema
  system: UnitSystem;
}

export type BMICategory =
  | 'Underweight'
  | 'Normal'
  | 'Overweight'
  | 'Obesity I'
  | 'Obesity II'
  | 'Obesity III';

export interface BMIResult {
  bmi: number;
  category: BMICategory;
}

export interface IBMICalculator {
  calculate(input: BMIInput): BMIResult;
}

// Regla de clasificación (O: abierta a extensión si cambian rangos)
export function classifyBMI(bmi: number): BMICategory {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obesity I';
  if (bmi < 40) return 'Obesity II';
  return 'Obesity III';
}
