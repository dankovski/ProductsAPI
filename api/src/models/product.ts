import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        validate(value: string) {
            if (!value) {
                throw new Error('name can not be empty')
            }
            else if (value.length >= 100) {
                throw new Error('name is too long')
            }
        }
    },
    Price: {
        type: Number,
        required: true,
        validate(value: number) {
            if (isNaN(value) || value <= 0) {
                throw new Error('invalid price')
            }
        }
    },
    UpdateDate: {
        type: Date
    },
    Id:
    {
        type: Number,
        unique: true
    }
}, { versionKey: false });

productSchema.pre('save', async function (next: () => void) {
    this.set('UpdateDate', new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' }));
    next();
})

productSchema.pre('init', async function (next: () => void) {
    this.set('UpdateDate', new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' }));
    const lastProduct = await Product.findOne({}, {}, { sort: { 'Id': -1 } });
    this.set('Id', lastProduct?.Id ? lastProduct.Id + 1 : 1);
    next();
})

productSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj._id;
    return obj;
}

const Product = mongoose.model('Product', productSchema);

export default Product;