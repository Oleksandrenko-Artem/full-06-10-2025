const CONSTANTS = {
    BASE_URL: 'http://localhost:3000',
    UPLOAD_FOLDER: 'uploads',
    SHIPPING_METHOD: ['free', 'nova post', 'ukr post'],
    SHIPPING_PRICE: { 'free': 0, 'nova post': 80, 'ukr post': 50 },
    ORDER_STATUS: ['new', 'paid', 'confirm', 'shipped', 'delivered', 'canceled'],
    ORDER_AMOUNT: [4, 8, 12, 16],
    STRIPE_SECRET_KEY: 'pk_test_51SMEI6B9Ot52JxeHyNDCmVVvxpcg0AOssm4u3D4v40h8TM9HJLAZ60w8O9nnluQZow6hw0w5JrTp1408MHdheI2Z00oGNr7U3f',
};

export default CONSTANTS;