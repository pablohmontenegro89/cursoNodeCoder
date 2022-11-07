import mongoose from 'mongoose'
import CarritoModel from '../models/CarritoModel.js'

export default class Carrito {
	constructor() {
		this.url = "mongodb+srv://pablohmontenegro89:zPzmD3i1z17yxzNp@cluster0.8jcrwbw.mongodb.net/aaa?retryWrites=true&w=majority"
		this.mongodb = mongoose.connect
		this.carritos = [];
		this.id = 1;
	}
	
	async crearCarrito() {
		try{
			const carr = {timeStamp: Date.now(), productos: [] };
			this.carritos.push(carr);
			await this.mongodb(this.url)
			const newCarrito = new CarritoModel()
			return await newCarrito.save()
		}
		catch(err){
			console.log(err)
		}
	}


	async listar(id) {
		try{
			await this.mongodb(this.url)
			return await CarritoModel.findById(id)
		}
		catch(err){
			console.log(err)
		}
	}

	async mostrarProductos(id){
		let carrito = await this.listar(id)
		let productosCarrito = carrito.productos
		return productosCarrito || { error: "carrito sin productos" };
	}

	async listarAll() {
		try{
			await this.mongodb(this.url)
			return await CarritoModel.find()
		}
		catch(err){
			console.log(err)
		}
	}

	async guardarProductoEnCarrito(prod, idCarrito) {
		try{
			await this.mongodb(this.url)
			const carro = await CarritoModel.findById(idCarrito)
			carro.productos.push(prod)
			return await CarritoModel.findByIdAndUpdate(idCarrito, carro)	
		}
		catch(err){
			console.log(err)
		}
	}

	async borrar(id) {
		const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8')
		const contenidoCarritosParseado = JSON.parse(contenido)
		let nuevoArray = contenidoCarritosParseado.filter(carr => carr.id != id)
		await fs.promises.writeFile(
			'./carritos.txt', 
			JSON.stringify(nuevoArray, null, 2), 
			'utf-8'
			)
	}

	async eliminarProductoDelCarrito(id_carrito, id_prod){
		const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8')
		const contenidoCarritosParseado = JSON.parse(contenido)
		let index = contenidoCarritosParseado.findIndex((carr) => carr.id == id_carrito)
		let nuevoArray = contenidoCarritosParseado[index].productos.filter(prod => prod.id != id_prod)
		contenidoCarritosParseado[index].productos = nuevoArray
		await fs.promises.writeFile(
			'./carritos.txt', 
			JSON.stringify(contenidoCarritosParseado, null, 2), 
			'utf-8'
			)
		return contenidoCarritosParseado[index].productos
	}
}
