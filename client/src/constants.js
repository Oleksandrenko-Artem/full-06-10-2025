const CONSTANTS = {
    BASE_URL: 'http://localhost:3000',
    UPLOAD_FOLDER: 'uploads',
    SHIPPING_METHOD: ['free', 'nova post', 'ukr post'],
    SHIPPING_PRICE: { 'free': 0, 'nova post': 80, 'ukr post': 50 },
    ORDER_STATUS: ['new', 'paid', 'confirm', 'shipped', 'delivered', 'canceled'],
};

export default CONSTANTS;