const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;
app.use(cors());

let platillos = [
    {
        id: 1,
        nombre: "Guacamole",
        precio: 20.35
    }
];

app.get('/', (req, res) => {
    res.send('Página principal')
});

app.get('/platillos', (req, res) => {
    res.status(200).json({
        message: "Platillos disponibles",
        data: platillos
    });
});

app.post('/platillos', (req, res) => {

    let nuevoPlatillo = req.body;
    platillos.push(nuevoPlatillo);

    res.status(200).json({
        message: "Platillo agregado correctamente",
        data: nuevoPlatillo
    });

});

app.put('/platillos/:id', (req, res) => {

    //Buscar el elemento antes de actualizar
    let id = parseInt(req.params.id);

    let platilloResultado = platillos.find(platillo => platillo.id === id);

    platilloResultado.nombre = req.body.nombre;
    platilloResultado.precio = req.body.precio;
    platilloResultado.id = req.body.id;

    res.status(200).json({
        message: "Platillo actualizado correctamente",
        data: platilloResultado
    });
});

app.delete('/platillos/:id', (req, res) => {

    //Buscar el elemento antes de actualizar
    let id = parseInt(req.params.id);

    // validar que el id exista
    const indice = platillos.findIndex(platillo => platillo.id === id);
    platillos.splice(indice, 1);

    res.status(200).json({
        message: "Platillo eliminado correctamente",
        data: null
    });

});

app.listen(port, (req, res) => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});