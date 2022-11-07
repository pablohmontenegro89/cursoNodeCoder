import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js"
import Producto from "../DAOs/Producto.dao.class.js"

const router = express.Router();

const carrito = new Carrito();
const producto = new Producto()

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.crearCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", async (req, res) => {
	const carritoBorrado = await carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

router.get("/", async (req, res) => {
	const listaCarritos = await carrito.listarAll();
	res.send(listaCarritos);
});

router.get("/:id", async (req, res) => {
	const listaCarritos = await carrito.listar(req.params.id);
	res.send(listaCarritos);
});

router.get("/:id/productos", async (req, res) => {
	const productos = await carrito.mostrarProductos(req.params.id);
	res.send(productos);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const product = await producto.listar(req.params.idPrd)
	const respuesta = await carrito.guardarProductoEnCarrito(
		product,
		req.params.id
	);
	res.send(respuesta);
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
	const respuesta = await carrito.eliminarProductoDelCarrito(
		req.params.id,
		req.params.id_prod
	);
	res.send(respuesta);
});

export default router;
