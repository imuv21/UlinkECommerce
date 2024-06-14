
import * as yup from 'yup';


export const addSingleSchema = yup.object().shape({

    productName: yup.string().required('Product name is required').min(15, "Product name must be 15 characters or more"),
    brandName: yup.string().required('Brand name is required'),
    keyWords: yup.string().required('Key words are required'),
    dgrGoods: yup.string().required('Dangerous goods are required'),
    bulletPoints: yup.string().required('Bullet points are required'),
    barcode: yup.string().required('Barcode type is required'),
    barcodeNum: yup.string().test('barcodeValidation', 'Invalid barcode number', function (value) {
        const barcodeType = this.parent.barcode;
        if (barcodeType === 'UPC') {
            return (value && value.length === 12);
        } else if (barcodeType === 'EAN') {
            return (value && (value.length === 8 || value.length === 13));
        } else if (barcodeType === 'ASIN') {
            return (value && value.length === 10);
        } else if (barcodeType === 'GTIN') {
            return (value && (value.length === 8 || value.length === 12 || value.length === 13 || value.length === 14));
        } else {
            return true;
        }
    }).required('Barcode number is required'),

    unitmeasure: yup.string().required('Unit measure type is required'),
    sku: yup.string().required('SKU is required'),
    minOrderQuant: yup.number().typeError('Quantity must be a number').positive('Quantity must be a positive number').integer('Quantity must be an integer').required('Quantity is required')
        .test('is-lower', 'Min order quantity must be lower than available quantity',
            function (minOrderQuant) {
                const availableQuantity = this.resolve(yup.ref('availableQuantity'));
                return minOrderQuant < availableQuantity;
            }
        ),
    unitPrice: yup.number().typeError('Unit price must be a number').positive('Unit price must be a positive number').integer('Unit price must be an integer').required('Unit price is required'),
    sellPrice: yup.number().typeError('Sale price must be a number').positive('Sale price must be a positive number').integer('Sale price must be an integer').required('Sale price is required')
        .test(
            'is-lower',
            'Sale price must be lower than unit price',
            function (sellPrice) {
                const unitPrice = this.resolve(yup.ref('unitPrice'));
                return sellPrice < unitPrice;
            }
        ),

    availableQuantity: yup.number().typeError('Quantity must be a number').positive('Quantity must be a positive number').integer('Quantity must be an integer').required('Quantity is required').min(1, "Minimum order quantity is 1"),
    unitsPerCarton: yup.number().typeError('Units per carton must be a number').positive('Units per carton must be a positive number').integer('Units per carton must be an integer').required('Units per carton is required'),
    sizeUnit: yup.string().required('Unit is required'),
    avgLeadTime: yup.number().typeError('Lead time must be a number').positive('Lead time must be a positive number').integer('Lead time must be an integer').required('Lead time is required'),
    transportationMode: yup.string().required('Transportation mode is required'),
    StockLocation: yup.string().required('Stock Location is required'),
    origin: yup.string().required('Origin is required'),
});

export const bankSchema = yup.object().shape({
    bankName: yup.string().required('Bank name is required'),
    bankLocation: yup.string().required('Bank location is required'),
    iban: yup.string().required('International bank account number is required'),
    accHolderName: yup.string().required('Account holder name is required'),
    accNo: yup.string().required('Account number is required'),
    swiftbic: yup.string().required('Swift/BIC code is required'),
    ifsc: yup.string().required('IFSC code is required'),
});

export const signupSchema = yup.object().shape({
    firstname: yup.string().required('Enter your first name'),
    lastname: yup.string().required('Enter your last name'),
    role: yup.string().required('Select a role first'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobile: yup.string()
        .matches(/^\d+$/, { message: 'Phone number must contain only digits' })
        .min(5, 'Phone number must be at least 5 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .required('Phone number is required'),
    countryCode: yup.string().required('Country code is required'),
    whatsappnumber: yup.string()
        .matches(/^\d+$/, { message: 'Whatsapp number must contain only digits' })
        .min(5, 'Whatsapp number must be at least 5 digits')
        .max(15, 'Whatsapp number must be at most 15 digits'),
    password: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPass: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Password and confirm password must match'),
    country: yup.string().required('Country is required'),
});

export const loginSchema = yup.object().shape({
    role: yup.string().required('Select a role first'),
    username: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPass: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Password and confirm password must match'),
    role: yup.string().required('Select a role first'),
    username: yup.string().email('Invalid email').required('Email is required'),
});

export const sellerSchema = yup.object().shape({
    companyname: yup.string().required('Enter company name'),
    countryOfoperation: yup.string().required('Country of operation is required'),
});

export const updateNumberSchema = yup.object().shape({
    mobile: yup.string()
        .matches(/^\d+$/, { message: 'Phone number must contain only digits' })
        .min(5, 'Phone number must be at least 5 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .required('Phone number is required'),
    countryCode: yup.string().required('Country code is required'),
});

export const profileSchema = yup.object().shape({
    firstname: yup.string().required('Enter your first name'),
    lastname: yup.string().required('Enter your last name'),
    wpcountrycode: yup.string().required('Country code is required'),
    whatsappnumber: yup.string()
        .matches(/^\d+$/, { message: 'Whatsapp number must contain only digits' })
        .min(5, 'Whatsapp number must be at least 5 digits')
        .max(15, 'Whatsapp number must be at most 15 digits'),   
});

export const businessSchema = yup.object().shape({
    companyname: yup.string().required('Enter company name'),
    countryOfoperation: yup.string().required('Country of operation is required'),
    firstname: yup.string().required('Enter your first name'),
    lastname: yup.string().required('Enter your last name'),
    wpcountrycode: yup.string().required('Country code is required'),
    whatsappnumber: yup.string()
        .matches(/^\d+$/, { message: 'Whatsapp number must contain only digits' })
        .min(5, 'Whatsapp number must be at least 5 digits')
        .max(15, 'Whatsapp number must be at most 15 digits'),
    language: yup.string().required('Language is required'),   
});




