const express = require("express");
const cors = require("cors");
const routerUser = require("./router/usuarios.js");
const routerRole = require("./router/role.router.js");
const routerBrand = require("./router/brand.router.js");
const routerBicycleStatus = require("./router/bicycleStatus.router.js");
const routerBike = require("./router/bike.router.js");

const app = express();
require("./db.js");

app.use(cors());
app.use(express.json());
app.use("/user", routerUser);
app.use("/role", routerRole);
app.use("/brand", routerBrand);
app.use("/status", routerBicycleStatus);
app.use("/bike", routerBike);

app.get("/", (req, res) => {
  return res.json({ mess: "hola" });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
