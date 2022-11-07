import mongoose from 'mongoose'
import ProductoModel from '../models/ProductoModel.js'

export default class Producto {
	constructor() {
		this.url = "mongodb+srv://pablohmontenegro89:zPzmD3i1z17yxzNp@cluster0.8jcrwbw.mongodb.net/aaa?retryWrites=true&w=majority"
		this.mongodb = mongoose.connect
	}

	async listar(id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findById(id)
		}
		catch(err){
			console.log(err)
		}
	}

	async listarAll() {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.find()
		}
		catch(err){
			console.log(err)
		}
	}

	async guardar(prod) {
		try{
			await this.mongodb(this.url)
			const newProduct = new ProductoModel(prod)
			return await newProduct.save()
		}
		catch(err){
			console.log(err)
		}
	}

	async actualizar(prod, id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndUpdate(id, prod)			
		}
		catch(err){
			console.log(err)
		}
	}

	async borrar(id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndDelete(id)
		}
		catch(err){
			console.log(err)
		}
	}
}
