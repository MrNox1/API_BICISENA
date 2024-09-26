const express = require('express');
const routerUser = require("./router/usuarios.js")
const routerRole = require("./router/role.router.js")

const app = express();
require("./db.js")
app.use(express.json());
app.use("/user", routerUser)
app.use("/role", routerRole)

app.get("/", (req, res) => {
    return res.json({ mess: "hola" })
}
)



app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
