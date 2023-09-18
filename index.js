const express = require("express");
const port = 3000;
const app = express();
const loginRoutes = require("./login-routes");

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON

const taskList = [
  // Lista de tareas
  {
    id: 1,
    taskname: "Task1",
    description: "description task 1",
    isCompleted: false,
  },
  {
    id: 2,
    taskname: "Task2",
    description: "description task 2",
    isCompleted: true,
  },
  {
    id: 3,
    taskname: "Task3",
    description: "description task 3",
    isCompleted: false,
  },
  {
    id: 4,
    taskname: "Task4",
    description: "description task 4",
    isCompleted: true,
  },
];

//Middleware para validar los Solicitudes HTTP
app.use((req, res, next) => {
  const methodValidate = req.method.toUpperCase(); // Obtener el método de la solicitud en mayúsculas

  const respuesta = ["POST", "PUT", "GET", "DELETE"]; // Métodos HTTP válidos

  if (!respuesta.includes(methodValidate)) {
    // Si el método no está incluido en los métodos válidos
    return res.status(400).json({ message: "Invalid method" }); // Devolver un código de respuesta 400 con un mensaje de error
  }
  next(); // Pasar al siguiente middleware o ruta
});

const listViewRouter = require("./list-view-router")(taskList); // Ruta para la vista de lista de tareas, se pasa la lista de tareas como parámetro
const listEditRouter = require("./list-edit-router")(taskList); // Ruta para la edición de la lista de tareas, se pasa la lista de tareas como parámetro

app.use("/list-view", listViewRouter); // Montar el enrutador de vista de lista en el endpoint '/list-view'
app.use("/list-edit", listEditRouter); // Montar el enrutador de edición de lista en el endpoint '/list-edit'
app.use(loginRoutes); // Agregar el enrutador de login

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Mensaje de consola para indicar que el servidor está escuchando en el puerto especificado
});

app.get("/tasks", (req, res) => {
  res.json(taskList); // Devolver la lista de tareas como respuesta en formato JSON
});

module.exports = app;