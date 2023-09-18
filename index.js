const express = require("express");
const port = 3000;
const app = express();
const loginRoutes = require("./login-routes");

app.use(express.json());

app.use((req, res, next) => {
  const methodValidate = req.method.toUpperCase();
  const respuesta = ["POST", "PUT", "GET", "DELETE"];

  if (!respuesta.includes(methodValidate)) {
    return res.status(400).json({ message: "Invalid method" });
  }
  next();
});

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);
app.use(loginRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;