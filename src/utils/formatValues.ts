export function formatarValor(valor: string): string {
  const valorSemMoeda = valor.replace(/R\$\s*/g, '');
  const valorSemMascara = valorSemMoeda.replace(/[^\d,]/g, '');
  const valorComPonto = valorSemMascara.replace(',', '.');
  return Number(valorComPonto).toFixed(2);
}
