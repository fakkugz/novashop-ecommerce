export const formatPrice = (price: string | number): string => {
    const num = Number(price);
    if (isNaN(num)) return '$ 0';
    return num % 1 === 0 ? `$ ${num}` : `$ ${num.toFixed(2)}`;
};