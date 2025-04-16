export const CURRENCY_FORMATER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const NO_OP_FUNCTION = () => {}

export const isNotNullOrEmpty = (value) => {
    return value !== null && value !== undefined && value !== '';
}