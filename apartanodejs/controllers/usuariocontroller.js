var mysql = require('mysql');


//usuario controller

module.exports = {
	// funciones del controlador

	getUsuario : function(req,res,next){

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var usuario = null;

		db.query('SELECT * FROM USUARIO', function(err, rows, fields){
			if(err) throw err;

			usuario = rows;
			db.end();

			res.render('usuario/usuario', {usuario : usuario});
		});

			
	},

	getNuevoUsuario : function(req, res, next){
		res.render('usuario/nuevoUsuario');
	},

	postNuevoUsuario : function(req, res,next){
		//console.log(req.body);

		var usuarios = {
			ID_USUARIO : req.body.id_usuario,
			NOMBRE : req.body.nombre,
			APELLIDOS : req.body.apellidos,
			TELEFONO : req.body.telefono,
			DIRECCION : req.body.direccion,
			EMAIL : req.body.email,
			ROL_ID_ROL : req.body.rol,
			PASSWORD : req.body.password
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO USUARIO SET ?', usuarios, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.render('usuario/nuevoUsuario',{info : 'usuario creado correctamente'});

	},

		postEliminarUsuario : function(req, res, next){

		var id = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM USUARIO WHERE ID_USUARIO = ?', id , function(err, rows, fields){
			if (err)throw err;
			
			db.end();
			respuesta.res = true;

			res.json(respuesta);

		});
	}
}