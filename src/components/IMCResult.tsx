import { categoryColorPipe, categoryLabelPipe, numberPipe } from '../utils/pipes';
import type { BMIResult } from '../domain/imc';

interface Props {
  result: BMIResult | null;
}

export default function BMIResult({ result }: Props) {
  if (!result) return null;

  const color = categoryColorPipe(result.category);

  return (
    <section
      style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'var(--card)',
        border: `2px solid ${color}`,
        display: 'grid',
        gap: 8
      }}
    >
      <div style={{ fontSize: 14, color: '#6b7280' }}>Tu IMC</div>
      <div style={{ fontSize: 36, fontWeight: 800 }}>{numberPipe(result.bmi)}</div>
      <div style={{ fontWeight: 700, color }}>{categoryLabelPipe(result.category)}</div>
      <small style={{ color: '#6b7280' }}>
        * Este cálculo es informativo y no reemplaza asesoramiento médico.
      </small>
    </section>
  );
}
