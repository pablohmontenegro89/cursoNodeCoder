import Producto from "./Producto.class.js";
import fs from "fs"

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}
	
	async crearCarrito() {
		try {
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			this.carritos.push(carr);
            await fs.promises.writeFile(
				'./carritos.txt', 
                JSON.stringify(this.carritos, null, 2), 
                'utf-8'
                )
			return carr
        } catch (e) {
            console.log(e)
        }
	}


	async listar(id) {
		const contenido = await this.listarAll()
		let prod = contenido.find((carr) => carr.id == id);
		console.log(prod)
		return prod || { error: "carrito no encontrado" };
	}

	async mostrarProductos(id){
		let carrito = await this.listar(id)
		let productosCarrito = carrito.productos
		return productosCarrito || { error: "carrito sin productos" };
	}

	async listarAll() {
		const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8')
		if (contenido.length){
			return JSON.parse(contenido)
		} else {
			return { error: "no hay carritos cargados" };
		}
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		const contenidoProductos = await fs.promises.readFile('./productos.txt', 'utf-8')
		const contenidoProductosParseado = JSON.parse(contenidoProductos)
		let producto = contenidoProductosParseado.find((prod) => prod.id == idProd);
		const contenidoCarritos = await fs.promises.readFile('./carritos.txt', 'utf-8')
		const contenidoCarritosParseado = JSON.parse(contenidoCarritos)
		contenidoCarritosParseado.forEach((carro) => {
		 	carro.id == idCarrito ? carro.productos.push(producto) : null;
		 });
		 await fs.promises.writeFile(
		 	'./carritos.txt', 
		 	JSON.stringify(contenidoCarritosParseado, null, 2), 
		 	'utf-8'
		 	)
		return contenidoCarritosParseado;
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
