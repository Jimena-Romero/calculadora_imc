// Implementa la interfaz; cumple el principio de inversión de dependencias (D)
import { IBMICalculator, BMIInput, BMIResult, classifyBMI } from '../domain/imc';

export class StandardBMICalculator implements IBMICalculator {
  calculate({ weight, height, system }: BMIInput): BMIResult {
    if (weight <= 0 || height <= 0) {
      return { bmi: 0, category: classifyBMI(0) };
    }

    let bmi = 0;

    if (system === 'metric') {
      // weight kg, height cm -> m
      const h = height / 100;
      bmi = weight / (h * h);
    } else {
      // imperial: weight lb, height in
      // fórmula BMI imperial: 703 * lb / in^2
      bmi = (703 * weight) / (height * height);
    }

    const normalized = Number(bmi.toFixed(2));
    return { bmi: normalized, category: classifyBMI(normalized) };
  }
}
