const express = require("express");
const listEditRouter = express.Router();

//Middleware para validar los valores de la solicitud POST y PUT
const createValidation = (req, res, next) => {
  const { id, taskname, description, isCompleted } = req.body;

  if (!id || !taskname || !description || !isCompleted) {
    return res.status(400).json({ message: "Invalid info" }); // Devolver un código de respuesta 400 si falta información en el cuerpo de la solicitud
  }

  req.body.isCompleted = JSON.parse(isCompleted); // Convertir el valor de isCompleted a formato booleano

  next(); // Pasar al siguiente middleware o ruta
};

// Definición del enrutador para la edición de la lista
module.exports = (taskList) => {
  // Ruta POST para crear una nueva tarea
  listEditRouter.post("/create", createValidation, (req, res) => {
    const newTask = req.body; // Obtener la nueva tarea desde el cuerpo de la solicitud
    taskList.push(newTask); // Agregar la nueva tarea a la lista
    res.json(newTask); // Devolver la nueva tarea como respuesta
  });

  // Ruta DELETE para eliminar una tarea por su ID
  listEditRouter.delete("/delete/:id", (req, res) => {
    const taskId = parseInt(req.params.id); // Obtener el ID de la tarea desde los parámetros de la URL
    const index = taskList.findIndex((task) => task.id === taskId); // Buscar el índice de la tarea en la lista
    if (index !== -1) {
      // Si se encuentra la tarea
      const deletedTask = taskList.splice(index, 1); // Eliminar la tarea de la lista
      res.json(deletedTask); // Devolver la tarea eliminada como respuesta
    } else {
      // Si no se encuentra la tarea
      res.status(404).json({ message: "Task not found" }); // Devolver un mensaje de error
    }
  });

  // Ruta PUT para actualizar una tarea por su ID
  listEditRouter.put("/update/:id", createValidation, (req, res) => {
    const taskId = parseInt(req.params.id); // Obtener el ID de la tarea desde los parámetros de la URL
    const updatedTask = req.body; // Obtener los datos actualizados de la tarea desde el cuerpo de la solicitud
    const index = taskList.findIndex((task) => task.id === taskId); // Buscar el índice de la tarea en la lista
    if (index !== -1) {
      // Si se encuentra la tarea
      taskList[index] = { ...taskList[index], ...updatedTask }; // Actualizar la tarea con los nuevos datos
      res.json(taskList[index]); // Devolver la tarea actualizada como respuesta
    } else {
      // Si no se encuentra la tarea
      res.status(404).json({ message: "Task not found" }); // Devolver un mensaje de error
    }
  });

  return listEditRouter;
};