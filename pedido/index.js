
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'

dotenv.config();

// Crear la app de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Configurar morgan para el logging
app.use(morgan('combined'));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Simulación de una base de datos de pedidos
let pedidos = [
  { id: 1, producto: 'Camiseta', cantidad: 2 },
  { id: 2, producto: 'Zapatos', cantidad: 1 },
  { id: 3, producto: 'Gorra', cantidad: 5 }
];

// Ruta para obtener todos los pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Ruta para obtener un pedido específico por ID
app.get('/pedido/:id', (req, res) => {
  const { id } = req.params;
  const pedido = pedidos.find(p => p.id === parseInt(id));

  if (!pedido) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  res.json(pedido);
});

// Ruta para crear un nuevo pedido
app.post('/pedido', (req, res) => {
  const { producto, cantidad } = req.body;
  
  if (!producto || !cantidad) {
    return res.status(400).json({ message: 'Producto y cantidad son requeridos' });
  }

  const nuevoPedido = {
    id: pedidos.length + 1,
    producto,
    cantidad
  };

  pedidos.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

// Ruta para actualizar un pedido existente


// Configuración del puerto
const port =  process.env.PORT_PEDIDO

app.listen(port, () => {
  console.log(`Microservicio de pedidos corriendo en http://localhost:${port}`);
});
