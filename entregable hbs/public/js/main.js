const socket = io.connect();

socket.on("demo", (data) => {
	renderProduct(data);
});

function renderProduct(data) {
	const html = data
		.map((elemento) => {
			return `<div>
                <strong>${elemento.nombre}</strong>:
                <em>${elemento.precio}</em>
                <em>${elemento.thumbnail}</em>
                </div>
        `;
		})
		.join(" ");
	document.getElementById("productos").innerHTML = html;
}

function addProduct(e) {
	const mensajeEmit = {
		nombre: document.getElementById("nombre").value,
		precio: document.getElementById("precio").value,
        thumbnail: document.getElementById("thumbnail").value,
	};
	socket.emit("new-product", mensajeEmit);
	return false
}
	socket.on("messages", (data) => {
		renderMessage(data);
	});
	
	function renderMessage(data) {
		let date = new Date()
		fecha = date.toLocaleDateString().toString()
		console.log(fecha,date)
		hora = date.getHours().toString()
		minutos = date.getMinutes().toString()
		segundos = date.getSeconds().toString()
		const html = data
		.map((elemento) => {
			return `<div>
			<span style='color:brown'>${fecha} ${hora}:${minutos}:${segundos}</span>
			<strong style='color:blue'>${elemento.author}</strong>:
			<em><i style='color:green'>${elemento.text}</i></em></div>
			`;
		})
		.join(" ");
		document.getElementById("mensajes").innerHTML = html;
	}
	
	function addMessage(e) {
		const mensaje = {
			author: document.getElementById("username").value,
			text: document.getElementById("texto").value,
		};
		socket.emit("new-message", mensaje);
		return false;
	}