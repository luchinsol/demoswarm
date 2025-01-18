import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

// Crear la app de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Configurar morgan para el logging
app.use(morgan('combined'));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Ruta para obtener todos los pedidos
app.get('/pedidos', async (req, res) => {
  try {
    const response = await axios.get('http://pedido-service:5001/pedidos');  // Cambiado localhost a pedido-service
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
    const response = await axios.get(`http://pedido-service:5001/pedido/${id}`);  // Cambiado localhost a pedido-service
    res.json(response.data);
  } catch (error) {
    console.error(`Error al obtener el pedido con ID ${id}:`, error);
    res.status(500).json({ message: `Error al obtener el pedido con ID ${id}` });
  }
});

// Configuración del puerto
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway corriendo en http://localhost:${port}`);
});
