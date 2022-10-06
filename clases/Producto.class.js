import fs from "fs"
export default class Producto {
	static productos = [];
	constructor() {
		this.id = 0 ;
	}

	async listar(id) {
		const contenido = await this.listarAll()
		let producto = contenido.find((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
	}

	async listarAll() {
		const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
		if (contenido.length){
			return JSON.parse(contenido)
		} else {
			return { error: "no hay productos cargados" };
		}
	}

	async guardar(prod) {
		prod.id = ++this.id;
		prod.timeStamp = Date.now();
		Producto.productos.push(prod);
		await fs.promises.writeFile(
			'./productos.txt', 
			JSON.stringify(Producto.productos, null, 2), 
			'utf-8'
			)
		return prod;
	}

	async actualizar(prod, id) {
		prod.id = Number(id);
		const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
		const contenidoPaseado = JSON.parse(contenido)
		let index = contenidoPaseado.findIndex((prod) => prod.id == id);
		contenidoPaseado.splice(index, 1, prod);
		await fs.promises.writeFile(
			'./productos.txt', 
			JSON.stringify(contenidoPaseado, null, 2), 
			'utf-8'
			)
		return prod
	}

	async borrar(id) {
		const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
		const contenidoCarritosParseado = JSON.parse(contenido)
		let nuevoArray = contenidoCarritosParseado.filter(carr => carr.id != id)
		await fs.promises.writeFile(
			'./productos.txt', 
			JSON.stringify(nuevoArray, null, 2), 
			'utf-8'
			)
	}
}
