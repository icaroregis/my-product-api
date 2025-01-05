export function formatCurrency(value: string, isFromBackend: boolean = false): string {
  if (!value) return 'R$ 0,00';

  if (isFromBackend) {
    const numberValue = parseFloat(value);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  }

  const numericValue = value.replace(/\D/g, '');
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(numericValue) / 100);
}
