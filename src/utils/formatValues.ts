export function formatarValor(valor: string): string {
  const valorSemMoeda = valor.replace(/R\$\s*/g, '');
  const valorSemMascara = valorSemMoeda.replace(/[^\d,]/g, '');
  const valorComPonto = valorSemMascara.replace(',', '.');
  return Number(valorComPonto).toFixed(2);
}

export function formatarValorUpdate(valor: string) {
  const valorSemMascara = valor.replace(/[^\d,.-]/g, '');

  if (valorSemMascara.includes(',')) {
    const valorFormatado = valorSemMascara.replace(',', '.');
    return parseFloat(valorFormatado);
  }

  return parseFloat(valorSemMascara);
}
