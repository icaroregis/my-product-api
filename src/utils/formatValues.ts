export function formatarValor(valor: string) {
  const valorSemMascara = valor.replace(/[^\d,]/g, '');
  const valorNumerico = parseFloat(valorSemMascara.replace(',', '.'));
  return Math.round(valorNumerico * 100) / 100;
}

export function formatarValorUpdate(valor: string) {
  const valorSemMascara = valor.replace(/[^\d,.-]/g, '');

  if (valorSemMascara.includes(',')) {
    const valorFormatado = valorSemMascara.replace(',', '.');
    return parseFloat(valorFormatado);
  }

  return parseFloat(valorSemMascara);
}
