const express = require("express")
const app = express();
const listEdit = require("./list-edit-router");
const listView = require("./list-view-router");
const port = 8080;
const host = "localhost";

app.use(express.json());
app.use("/tareas", listEdit);
app.use("/tareas", listView);

app.listen(port, host, () => {
    console.log("Servidor encendido");
});