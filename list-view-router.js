const express = require("express");
const listViewRouter = express.Router();

//Middleware para validar los valores de la solicitud GET
const correctParams = (req, res, next) => {
  const { status } = req.query;
  if (status !== "true" && status !== "false") {
    return res.status(400).json({ message: "Invalid params" });
  }
  next();
};

// Definición del enrutador para la vista de lista
module.exports = (taskList) => {
  // Ruta GET para obtener las tareas completadas e incompletas
  listViewRouter.get("/", correctParams, (req, res) => {
    const { status } = req.query;
    const filteredTasks = taskList.filter(
      (task) => task.isCompleted === (status === "true")
    );
    res.json(filteredTasks);
  });

  return listViewRouter;
};