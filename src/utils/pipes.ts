// "Pipes" estilo Angular, pero como funciones puras reutilizables (I de SOLID: interfaces simples)
import type { BMICategory, UnitSystem } from '../domain/imc';

export function numberPipe(value: number, digits = 2): string {
  if (Number.isNaN(value)) return '';
  return value.toFixed(digits);
}

export function unitLabelPipe(system: UnitSystem) {
  return system === 'metric' ? { w: 'kg', h: 'cm' } : { w: 'lb', h: 'in' };
}

export function categoryLabelPipe(cat: BMICategory): string {
  const map: Record<BMICategory, string> = {
    Underweight: 'Bajo peso',
    Normal: 'Normal',
    Overweight: 'Sobrepeso',
    'Obesity I': 'Obesidad I',
    'Obesity II': 'Obesidad II',
    'Obesity III': 'Obesidad III'
  };
  return map[cat];
}

export function categoryColorPipe(cat: BMICategory): string {
  switch (cat) {
    case 'Underweight':
      return '#1e90ff';
    case 'Normal':
      return '#22c55e';
    case 'Overweight':
      return '#f59e0b';
    case 'Obesity I':
      return '#fb923c';
    case 'Obesity II':
      return '#ef4444';
    case 'Obesity III':
      return '#b91c1c';
    default:
      return '#6b7280';
  }
}