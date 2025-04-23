const modelo = require('../modelo/ClienteModelo');

class ClienteControlador {
//funcion crear nuevo cliente
    static async crearCliente(req, res) {
        const { t1: doc,t2: name,t3: tel,t4: email,t5: contra } = req.body;
        try {
          const result = await modelo.crearClientes(doc, name, tel, email, contra);
          res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
          res.status(500).json({ error: 'Hubo un error al crear el usuario por falta de datos' });
        }
      }
}

module.exports = ClienteControlador;