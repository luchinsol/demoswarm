import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

// Crear la app de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Configurar morgan para el logging
app.use(morgan('combined'));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());
console.log("....PEDIDO....")
console.log(process.env.PORT_PEDIDO)
// Ruta para obtener todos los pedidos
app.get('/pedidos', async (req, res) => {
  try {

    const response = await axios.get(`http://localhost:${process.env.PORT_PEDIDO}/pedidos`);  // Cambiado localhost a pedido-service
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

// Ruta para obtener un pedido específico por ID
app.get('/pedido/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://pedido-service:${process.env.PORT_PEDIDO}/pedido/${id}`);  // Cambiado localhost a pedido-service
    res.json(response.data);
  } catch (error) {
    console.error(`Error al obtener el pedido con ID ${id}:`, error);
    res.status(500).json({ message: `Error al obtener el pedido con ID ${id}` });
  }
});

// Configuración del puerto
const port = process.env.PORT_API;

app.listen(port, () => {
  console.log(`API Gateway corriendo en http://localhost:${port}`);
});
