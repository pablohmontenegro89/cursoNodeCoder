const express = require("express")
const app = express()

const PORT = 8080
let contador = 0


const fs = require("fs")
const productos = [                                                                                                                                                     
    {                                                                                                                                                    
      title: 'Escuadra',                                                                                                                                 
      price: 123.45,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
      id: 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                    
  ]   

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    async save(producto){
        try {
            await fs.promises.writeFile(
                this.nombreArchivo, 
                JSON.stringify(producto, null, 2), 
                'utf-8'
                )
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            console.log(JSON.parse(contenido))
            return JSON.parse(contenido)
        } catch (error) {
            
        }
    }

    async getById(id){
        const contenido = await this.getAll()
        const productoBuscado = contenido.find(producto => producto.id === id)
        if (!productoBuscado){
            return null
        } else {
            console.log(productoBuscado)
            return productoBuscado
        }
    }
}


const server = app.listen(PORT, ()=>{
    console.log("servidor iniciado")
})

app.get("/", (req,resp)=>{
    resp.send(`<h1 style='color:blue'>Bienvenido a mi servidor en expres</h1>`)
})


app.get("/productos", async (req,resp)=>{
    const contenedor = new Contenedor('./productos.txt')
    const mostrarProductos = await contenedor.getAll()
    resp.send(mostrarProductos)
})

app.get("/productoRandom", async (req,resp)=>{
    const random = parseInt(Math.random() * 3+1)
    const contenedor = new Contenedor('./productos.txt')
    const mostrarProducto = await contenedor.getById(random)
    resp.send(mostrarProducto)
})