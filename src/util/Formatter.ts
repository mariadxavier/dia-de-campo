const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

class Formatter {
  static currency(value: number | string): string {
    let cents: number;

    if (typeof value === "number") {
      cents = Number.isFinite(value) ? Math.round(value * 100) : 0;
    } else {
      const digits = value.replace(/\D/g, "");
      cents = digits === "" ? 0 : Number.parseInt(digits, 10);
    }

    return currencyFormatter.format(cents / 100);
  }
}

export { Formatter };
