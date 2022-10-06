import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

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

router.get("/:id/productos", async (req, res) => {
	const productos = await carrito.mostrarProductos(req.params.id);
	res.send(productos);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
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
