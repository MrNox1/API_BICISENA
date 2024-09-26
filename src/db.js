const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user_1:12345@nasacluster.uzoig4n.mongodb.net/nombre_de_tu_base_de_datos?retryWrites=true&w=majority&appName=NASACluster", {}).then(() => console.log("conected"))