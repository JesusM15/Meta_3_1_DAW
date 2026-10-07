/**
 * Rutas de Tareas
 * Define los endpoints de la API y los conecta con sus correspondientes controladores
 * (Módulo ES6)
 */

import express from 'express';
import * as tareaController from '../controllers/tarea.controller.js';

const router = express.Router();

// GET /api/tareas/buscar?q=express - Buscar tareas por título (Actividad 4)
// NOTA: Se coloca ANTES de /:id para evitar que Express confunda "buscar" con un parámetro ID
router.get('/buscar', tareaController.buscarPorTitulo);

// GET /api/tareas - Obtener todas las tareas (Soporta ?formato=text|json - Actividad 5)
router.get('/', tareaController.obtenerTodas);

// GET /api/tareas/:id - Obtener una tarea por ID
router.get('/:id', tareaController.obtenerPorId);

// POST /api/tareas - Crear una nueva tarea
router.post('/', tareaController.crear);

// PUT /api/tareas/:id - Actualizar tarea completamente
router.put('/:id', tareaController.actualizarCompleta);

// PATCH /api/tareas/:id - Actualizar tarea parcialmente
router.patch('/:id', tareaController.actualizarParcial);

// DELETE /api/tareas/:id - Eliminar una tarea
router.delete('/:id', tareaController.eliminar);

export default router;
