const handlebars = require("express-handlebars");
const express = require("express");
const Productos = require("./api/productos.js");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
let productos = new Productos();
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
//--------------------------------------------
//establecemos la configuración de handlebars
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");
//--------------------------------------------

app.use(express.static("./public"));
app.get("/", (req, res) => {
	res.sendFile("index.html");
});

const router = express.Router();
app.use("/", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//productos.listarAll()
//productos.guardar(producto);



const demo = [
	{
		nombre: "Escoba",
		precio: 1000,
		thumbnail: 'https://github.com/pablohmontenegro89/cursoNodeCoder/commit/d09fd139f67418b71bcaacaeab776592ee59cb6e',
	},
	{
		nombre: "Microondas",
		precio: 2000,
		thumbnail: 'https://github.com/pablohmontenegro89/cursoNodeCoder/commit/d09fd139f67418b71bcaacaeab776592ee59cb6e',
	},
	{
		nombre: "Heladera",
		precio: 3000,
		thumbnail: 'https://github.com/pablohmontenegro89/cursoNodeCoder/commit/d09fd139f67418b71bcaacaeab776592ee59cb6e',
	},
];

const messages = [
	{
		author: "Juan",
		text: "Hola que tal",
	},
	{
		author: "Maria",
		text: "Bien y vos?",
	},
	{
		author: "Juan",
		text: "Me alegra",
	},
];

router.get("/", (req, res) => {
	let prods = productos.listarAll();

	res.render("vista", {
		productos: prods,
		hayProductos: prods.length,
	});
});


io.on("connection", (socket) => {
	console.log("se cargó un producto");

	socket.emit("demo", demo);

	socket.on("new-product", (data) => {
		demo.push(data);
		io.sockets.emit("demo", demo);
	});

	socket.emit("messages", messages);
	
	socket.on("new-message", (data) => {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});


const PORT = 8080;
httpServer.listen(PORT, () => console.log("servidor Levantado"));
