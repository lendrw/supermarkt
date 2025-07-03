export default function priceWithoutDiscount(price: number, discount: number): string {
  return (price / (1 - discount / 100)).toFixed(2);
}
