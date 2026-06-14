const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

class Formatter {
  static currency(value: number | string): string {
    let numericValue = typeof value === "string" ? parseFloat(value.replace(',', '.')) : value;
    let cents: number;

    if (typeof numericValue === "number" && Number.isFinite(numericValue)) {
      cents = Math.round(numericValue * 100);
    } else {
      cents = 0;
    }

    return currencyFormatter.format(cents / 100);
  }
}

export { Formatter };
