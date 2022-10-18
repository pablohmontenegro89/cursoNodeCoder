const { ContenedorBd } = require("../contenedorBD");
const { options } = require("../mariaDB");

class Productos {
	constructor() {
		this.productos = [];
		this.id = 0;
		this.baseDatos = new ContenedorBd("Productos", options.mysql);
	}

	listar(id) {
		let prod = this.productos.find((prod) => prod.id == id);
		return prod || { error: "producto no encontrado" };
	}

	listarAll() {
		return this.productos.length
			? this.productos
			: { error: "no hay productos cargados" };
	}

	guardar(prod) {
		prod.id = ++this.id;
		this.productos.push(prod);
	}

	actualizar(prod, id) {
		prod.id = Number(id);
		let index = this.productos.findIndex((prod) => prod.id == id);
		this.productos.splice(index, 1, prod);
	}

	borrar(id) {
		let index = this.productos.findIndex((prod) => prod.id == id);
		return this.productos.splice(index, 1);
	}

	async getAll() {
		return await this.baseDatos.getAll();
	  }
	
	async save(producto) {
		return await this.baseDatos.save(producto);
	}
}

module.exports = Productos;