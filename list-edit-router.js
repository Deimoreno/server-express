const express = require("express");
const listEditRouter = express.Router();
const taskList = require("./taskList.json");

//Middleware para validar los valores de la solicitud POST y PUT
const createValidation = (req, res, next) => {
  const { taskname, description } = req.body;

  if (!taskname || !description) {
    return res.status(400).json({ message: "Invalid info" });
  }

  next();
};

// Ruta POST para crear una tarea
listEditRouter.post("/create", createValidation, (req, res) => {
  try {
    const newTask = req.body;
    newTask.isCompleted = false;
    taskList.push(newTask);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Ruta DELETE para eliminar una tarea por su ID
listEditRouter.delete("/delete/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const index = taskList.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      const deletedTask = taskList.splice(index, 1);
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Ruta PUT para actualizar una tarea por su ID
listEditRouter.put("/update/:id", createValidation, (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = taskList.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      taskList[index] = { ...taskList[index], ...updatedTask };
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = listEditRouter;