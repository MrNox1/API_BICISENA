const express = require("express");
const cors = require("cors");
const routerUser = require("./router/usuarios.js");
const routerRole = require("./router/role.router.js");
const routerBrand = require("./router/brand.router.js");
const routerBicycleStatus = require("./router/bicycleStatus.router.js");
const routerBicycle = require("./router/Bicycle.router.js");
const routerStation = require("./router/station.js");
const routerDiscount = require("./router/discount.router.js");
const routerRentRegistration = require("./router/rentRegistration.router.js");

const app = express();
require("./db.js");

app.use(cors());
app.use(express.json());
app.use("/user", routerUser);
app.use("/role", routerRole);
app.use("/brand", routerBrand);
app.use("/status", routerBicycleStatus);
app.use("/bicycle", routerBicycle);
app.use("/station", routerStation);
app.use("/discount", routerDiscount);
app.use("/registration", routerRentRegistration);

app.get("/", (req, res) => {
  return res.json({ mess: "hola" });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
