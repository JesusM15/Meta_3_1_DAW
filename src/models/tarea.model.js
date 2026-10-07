/**
 * Modelo de Tarea
 * Define la estructura de datos y la lógica de negocio en memoria
 * (Modulo ES6)
 */

// Base de datos en memoria (lista de tareas)
let tareas = [
  { id: 1, titulo: 'Aprender Express', completada: false },
  { id: 2, titulo: 'Implementar MVC', completada: false },
  { id: 3, titulo: 'Probar API con Postman', completada: true }
];

let idActual = 4; // Para generar IDs autoincrementales

/**
 * Obtener todas las tareas
 * @returns {Array} Lista de tareas
 */
export const obtenerTodas = () => {
  return tareas;
};

/**
 * Obtener una tarea por su ID
 * @param {number} id - ID de la tarea
 * @returns {Object|undefined} Tarea encontrada o undefined
 */
export const obtenerPorId = (id) => {
  return tareas.find(tarea => tarea.id === id);
};

/**
 * Buscar tareas por título (parcial y case-insensitive) - Actividad 4
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Tareas coincidentes
 */
export const buscarPorTitulo = (termino) => {
  if (!termino) return [];
  const query = termino.toLowerCase();
  return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(query));
};

/**
 * Crear una nueva tarea
 * @param {Object} datosTarea - Datos de la tarea { titulo, completada }
 * @returns {Object} Tarea creada
 */
export const crear = (datosTarea) => {
  const nuevaTarea = {
    id: idActual++,
    titulo: datosTarea.titulo,
    completada: Boolean(datosTarea.completada)
  };
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

/**
 * Actualizar una tarea completamente (PUT)
 * @param {number} id - ID de la tarea
 * @param {Object} datosTarea - Nuevos datos { titulo, completada }
 * @returns {Object|null} Tarea actualizada o null si no se encuentra
 */
export const actualizarCompleta = (id, datosTarea) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;

  tareas[indice] = {
    id: id,
    titulo: datosTarea.titulo,
    completada: Boolean(datosTarea.completada)
  };
  return tareas[indice];
};

/**
 * Actualizar parcialmente una tarea (PATCH)
 * @param {number} id - ID de la tarea
 * @param {Object} datosParciales - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null si no se encuentra
 */
export const actualizarParcial = (id, datosParciales) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;

  tareas[indice] = {
    ...tareas[indice],
    ...datosParciales,
    id: id // Garantiza que el ID no sea modificado
  };
  return tareas[indice];
};

/**
 * Eliminar una tarea por ID
 * @param {number} id - ID de la tarea
 * @returns {Object|null} Tarea eliminada o null si no existe
 */
export const eliminar = (id) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;

  const tareaEliminada = tareas[indice];
  tareas.splice(indice, 1);
  return tareaEliminada;
};

export default {
  obtenerTodas,
  obtenerPorId,
  buscarPorTitulo,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar
};
