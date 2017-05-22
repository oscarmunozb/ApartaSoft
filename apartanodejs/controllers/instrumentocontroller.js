var mysql = require('mysql');


//instrumento controller

module.exports = {
	// funciones del controlador

	getIntrumento : function(req,res,next){

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var instrumento = null;

		db.query('SELECT * FROM INSTRUMENTO', function(err, rows, fields){
			if(err) throw err;

			instrumento = rows;
			db.end();

			res.render('instrumento/instrumento', {instrumento : instrumento});
		});

			
	},

	getNuevoInstrumento : function(req, res, next){
		res.render('instrumento/nuevo');
	},

	postNuevoInstrumento : function(req, res, next){
		//console.log(req.body);

		var instrumentos = {
			NOMBRE_INSTRUMENTO : req.body.nombre,
			DESCRIPCION : req.body.descripcion,
			ESTADO : req.body.estado,
			CODIGO_REFERENCIA : req.body.referencia,
			TIPO : req.body.tipo
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO INSTRUMENTO SET ?', instrumentos, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.render('instrumento/nuevo',{info : 'Instrumento creado correctamente'});

	},

	postEliminarInstrumento : function(req, res, next){

		var id = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM INSTRUMENTO WHERE ID_INSTRUMENTO = ?', id , function(err, rows, fields){
			if (err)throw err;
			
			db.end();
			respuesta.res = true;

			res.json(respuesta);

		});
	},

		getEditarInstrumento : function(req, res, next){

		var id = req.params.id;
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var instrumento = null;

		db.query('Select * From Instrumento where ID_INSTRUMENTO = ?', id, function(err, rows, fields){
			if (err) throw err;

			instrumento = rows;
			db.end();

			res.render('instrumento/modificar', {instrumento : instrumento});
		});
		
	},

	postModificarInstrumento : function(req, res, next){

		var instrumentos = {
			NOMBRE_INSTRUMENTO : req.body.nombre,
			DESCRIPCION : req.body.descripcion,
			ESTADO : req.body.estado,
			CODIGO_REFERENCIA : req.body.referencia,
			TIPO : req.body.tipo
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('Update Instrumento set ? Where ?', [instrumentos, {id_instrumento : req.body.id_instrumento}], function(err, rows, fields){
			if (err) throw err;
			db.end();
		});

		res.redirect('/instrumento');

	}
}