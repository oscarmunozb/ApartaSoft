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

	postNuevoInstrumento : function(req, res,next){
		//console.log(req.body);

		var instrumentos = {
			ID_INSTRUMENTO : req.body.referencia,
			NOMBRE_INSTRUMENTO : req.body.nombre,
			DESCRIPCION : req.body.descripcion,
			ESTADO : req.body.estado
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO INSTRUMENTO SET ?', instrumentos, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.render('instrumento/nuevo',{info : 'Instrumento creado correctamente'});

	}
}