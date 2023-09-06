const express = require("express");
const tareas = require("./tareas");
const router = express.Router();

router.post("/agregarTareas", (req, res) => {
    const id = req.body;
    const description = req.body;
    const estado = req.body;
    tareas.push({
        id,
        description,
        estado
    });
    res.status(200).send("Tarea agregada con exito");
});

router.delete("/Eliminar/:id", (req, res) => {
    const idseleccionado = req.params.id;
    const tareasSeleccionada = tareas.findIndex(
        (select) => select.id === Number(idseleccionado)
    );
    if (idSeleccionado !== -1) {
        tareas.splice(tareasSeleccionada, 1);
        res.status(200).send("Tarea Eliminada con exito");
    } else {
        res.status(404).send("No se pudo eliminar");
    }
});

router.put("/actualizar/:id", (req, res) => {
    const idSeleccionado = req.params.id;
    const tareaActualizada = req.body;
    const  updateTask = task.find((item) => item.id === Number(idSeleccionado));
    updateTask["description"] = tareaActualizada.description;
    updateTask["estado"] = tareaActualizada.estado;
    res.send(`Tarea con ID ${idseleccionado} actualizada exitosamente`);
});


module.exports = router;