const CURRENCY_FORMATER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const NO_OP_FUNCTION = () => {}

export const isNotNullOrEmpty = (value) => {
    return value !== null && value !== undefined && value !== '';
}

export const hasDuplicates = (array, key) => {
    return new Set(array.map(item => item[key])).size !== array.length;
}

export const toCurrency = (value) => {
    return CURRENCY_FORMATER.format(value);
}

export const toLocalDate = (date) => {
    return new Date(date).toLocaleString();
}

export const sortArrayByKey = (array, key, transform = value => value) => {
    return [...array].sort((a, b) => transform(a[key]) - transform(b[key]));
}