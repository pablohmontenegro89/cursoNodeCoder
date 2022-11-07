import mongoose from 'mongoose'

const carritoSchema = new mongoose.Schema({
    timeStamp: Date,
    productos: Array
})

const CarritoModel = mongoose.model('carrito', carritoSchema)
export default CarritoModel