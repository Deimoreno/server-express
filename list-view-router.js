const express = require("express");
const tareas = require("./tareas");
const router = express.Router();

router.get("/completas", (req, res) => {
  const tareasCompletadas = tareas.filter((select) => select.estado);
  res.status(200).json(tareasCompletadas);
});

router.get("/incompletas", (req, res) => {
  const tareasIncompletas = tareas.filter((select) => !select.estado);
  res.status(200).json(tareasIncompletas);
});

module.exports = router;