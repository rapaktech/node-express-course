const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product Name Must Be Provided']
    },
    price: {
        type: Number,
        required: [true, 'Product Price Must Be Provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);