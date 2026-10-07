/**
 * Configuración de la aplicación Express
 * (Módulo ES6)
 */

import express from 'express';
import tareaRoutes from './routes/tarea.routes.js';

const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware para parsear datos de formularios (opcional)
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para registrar cada petición en la consola
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Registrar las rutas del recurso Tareas
app.use('/api/tareas', tareaRoutes);

// Ruta de bienvenida y documentación rápida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Tareas - Práctica MVC con Express',
    version: '1.0.0',
    endpoints: {
      getAll: 'GET /api/tareas',
      getAllText: 'GET /api/tareas?formato=text',
      search: 'GET /api/tareas/buscar?q=express',
      getById: 'GET /api/tareas/:id',
      create: 'POST /api/tareas',
      updateFull: 'PUT /api/tareas/:id',
      updatePartial: 'PATCH /api/tareas/:id',
      delete: 'DELETE /api/tareas/:id'
    }
  });
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware centralizado de manejo de errores (500)
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

export default app;
