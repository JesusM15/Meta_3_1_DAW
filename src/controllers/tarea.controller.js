/**
 * Controlador de Tareas
 * Maneja las peticiones HTTP y responde con JSON o texto según corresponda
 * (Módulo ES6)
 */

import * as tareaModel from '../models/tarea.model.js';

/**
 * GET /api/tareas - Obtener todas las tareas
 * Soporta el parámetro de consulta ?formato=text|json (Actividad 5)
 */
export const obtenerTodas = (req, res) => {
  try {
    const tareas = tareaModel.obtenerTodas();
    const formato = req.query.formato ? String(req.query.formato).toLowerCase() : 'json';

    if (formato === 'text') {
      let respuestaTexto = `=== LISTA DE TAREAS (${tareas.length}) ===\n\n`;
      if (tareas.length === 0) {
        respuestaTexto += 'No hay tareas registradas.';
      } else {
        tareas.forEach(tarea => {
          const estado = tarea.completada ? 'Completada [✓]' : 'Pendiente [ ]';
          respuestaTexto += `ID: ${tarea.id} | Título: "${tarea.titulo}" | Estado: ${estado}\n`;
        });
      }
      return res.type('text/plain').send(respuestaTexto);
    }

    // Por defecto responde en formato JSON
    return res.json({
      success: true,
      data: tareas,
      count: tareas.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
};

/**
 * GET /api/tareas/buscar?q=termino - Buscar tareas por título (Actividad 4)
 */
export const buscarPorTitulo = (req, res) => {
  try {
    const { q } = req.query;

    if (!q || String(q).trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El parámetro de búsqueda "q" es requerido. Ejemplo: /api/tareas/buscar?q=express'
      });
    }

    const resultados = tareaModel.buscarPorTitulo(q);

    return res.json({
      success: true,
      query: q,
      count: resultados.length,
      data: resultados
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al buscar tareas por título',
      error: error.message
    });
  }
};

/**
 * GET /api/tareas/:id - Obtener una tarea por ID
 */
export const obtenerPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    const tarea = tareaModel.obtenerPorId(id);
    if (!tarea) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      data: tarea
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
};

/**
 * POST /api/tareas - Crear una nueva tarea
 */
export const crear = (req, res) => {
  try {
    const { titulo, completada } = req.body;

    // Validar campos requeridos
    if (!titulo || String(titulo).trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }

    const nuevaTarea = tareaModel.crear({ titulo: String(titulo).trim(), completada });
    return res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: nuevaTarea
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
};

/**
 * PUT /api/tareas/:id - Actualizar tarea completamente
 */
export const actualizarCompleta = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    const { titulo, completada } = req.body;

    // Validar datos requeridos para actualización completa
    if (!titulo || String(titulo).trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido para una actualización completa (PUT)'
      });
    }

    const tareaActualizada = tareaModel.actualizarCompleta(id, {
      titulo: String(titulo).trim(),
      completada
    });

    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea actualizada completamente',
      data: tareaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

/**
 * PATCH /api/tareas/:id - Actualizar tarea parcialmente
 */
export const actualizarParcial = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    const datosParciales = req.body;

    if (!datosParciales || Object.keys(datosParciales).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe enviar al menos un campo para actualizar'
      });
    }

    const tareaActualizada = tareaModel.actualizarParcial(id, datosParciales);

    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea actualizada parcialmente',
      data: tareaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

/**
 * DELETE /api/tareas/:id - Eliminar una tarea
 */
export const eliminar = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    const tareaEliminada = tareaModel.eliminar(id);

    if (!tareaEliminada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: tareaEliminada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
};

export default {
  obtenerTodas,
  buscarPorTitulo,
  obtenerPorId,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar
};
