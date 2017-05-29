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
		console.log(req);

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

	},

	getBuscarInstrumento : function(req, res, next){
		var instrumento = {a : 1,b : 2,c :3,d : 4,e : 5,f : 6};
		res.render('instrumento/buscar', {instrumento : instrumento});
	},

	postBuscarInsNombre : function(req, res, next){
		
		var _nombreInstrumento = req.body.nombre;
		console.log(_nombreInstrumento);

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var instrumento = null;

		// Armo el Query
		var consutaInstrumentoReservado = 	'	SELECT 	i.NOMBRE_INSTRUMENTO, '+
											'	i.DESCRIPCION, ' +
											'	i.TIPO, ' +
											'	r.FECHA_INICIO, ' +
											'	r.FECHA_FIN, ' +
											'	TIME_FORMAT(r.HORA_INICIO,' + " '%h:%i:%p' " + ' ) HORA_INICIO, ' +
											'	TIME_FORMAT(r.HORA_FIN,'    + " '%h:%i:%p' " + ' ) HORA_FIN, ' +
											'	CONCAT(u.NOMBRE,' + "' '" + ', u.APELLIDOS) NOMBRES' +
											'	FROM instrumento i, reserva r, usuario u' +
											'	where 1=1' +
											'	and i.NOMBRE_INSTRUMENTO like' + "'%" + _nombreInstrumento + "%'" +
											'	and i.ID_INSTRUMENTO = r.INSTRUMENTO_ID_INSTRUMENTO' +
											'	and r.USUARIO_ID_USUARIO = u.ID_USUARIO' +
											'	order by r.FECHA_INICIO';

		console.log(consutaInstrumentoReservado); 
		
		db.query(consutaInstrumentoReservado, function(err, rows, fields){
			console.log(rows); 
			if(err) throw err;

			instrumento = rows;
			db.end();

			res.render('instrumento/buscar', {instrumento : instrumento});
		});

	
		
	}
}