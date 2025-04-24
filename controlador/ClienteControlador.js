const modelo = require('../modelo/ClienteModelo');

class ClienteControlador {
    // funcion crear nuevo cliente
    static async crearCliente(req, res) {
        const { t1: doc, t2: name, t3: tel, t4: email, t5: contra } = req.body;
        const errorCampos = ClienteControlador.verCampos(doc, name, tel, email, contra);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
        const erorIde = ClienteControlador.verIde(doc);
        if (erorIde) {
            return res.status(400).json({ error: erorIde });
        }
        const errornom = ClienteControlador.vernom(name);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }
        const errortel = ClienteControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }
        const errorem = ClienteControlador.veremail(email);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }
        const errorkey = ClienteControlador.verkey(contra);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }
        
        try {
            const result = await modelo.crearClientes(doc, name, tel, email, contra);
            res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'intenta recuperar la cuenta o inicia sesión.' });
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
        
    }
    static verCampos(doc, name, tel, email, contra) {
        if (!doc || !name || !tel || !email || !contra) {
            return 'Todos los campos son obligatorios.';
        }
        return null; 
    }
    static verIde(doc) {
        if (!/^\d{8,10}$/.test(doc)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        } else {
            return null; 
        }
    }
    static vernom(name) {
        const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!nom.test(name)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; 
        }
    }
    static veremail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }
    static verkey(contra) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contra)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        } else {
            return null;
        }
    }
}

module.exports = ClienteControlador;
