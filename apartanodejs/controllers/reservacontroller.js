var mysql = require('mysql');
var dateFormat = require('dateformat');


//reserva controller

module.exports = {
	// funciones del controlador

	getReserva : function(req,res,next){

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var reserva = null;
		var parametro1 = 'Activo';
		var consultaActivasSql = 'SELECT * FROM RESERVA where 1 = 1 and Estado = ?';

		db.query(consultaActivasSql,[parametro1], function(err, rows, fields){
			if(err) throw err;

			reserva = rows;
			db.end();

			res.render('reserva/reserva', {reserva : reserva});
		});
	},

		postEliminaReserva : function(req,res,next){
		console.log(req.body);
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();
		var reserva = null;
		var respuesta = {res: false};
		
		//Obtengo el Id de la reserva que llega por reservas.js
		var idReserva = req.body.id;
		
		//Armo el Query completo
		var consulta2 = 'Update RESERVA set Estado = ' + "'Inactiva'" + ' where 1 = 1 and ID_RESERVA = ' + idReserva;
		
		db.query(consulta2, function(err, rows, fields){
			if(err) throw err;
			reserva = rows;
			db.end();

		respuesta.res = true;
		res.json(respuesta);

		});
	},

	getNuevoReserva : function(req, res, next){
		res.render('reserva/nuevoReserva');
	},

	postNuevoReserva : function(req, res,next){
		//console.log(req.body);

		var _fechaInicio = dateFormat(req.body.fechaInicio, 'yyyy-mm-dd');
		var _fechaFin = dateFormat(req.body.fechaFin, 'yyyy-mm-dd');

		var reservas = {
			USUARIO_ID_USUARIO : req.body.cedula,
			INSTRUMENTO_ID_INSTRUMENTO : req.body.referencia,
			FECHA_INICIO : _fechaInicio,
			FECHA_FIN : _fechaFin,
			HORA_INICIO : req.body.horaInicio,
			HORA_FIN : req.body.horaFin,
			DESCRIPCION : req.body.descripcion,
			ESTADO : 'Activo'
		}

		var capturaDisponibles;

		console.log(reservas);

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();


		db.query('Select * from reserva where 1=1 and CAST(fecha_inicio AS DATE) = ? and CAST(fecha_fin AS DATE) = ? and hora_inicio >= ? and hora_fin <= ?	and INSTRUMENTO_ID_INSTRUMENTO = ?', [_fechaInicio, _fechaFin, req.body.horaInicio, req.body.horaFin, req.body.referencia], function(err, rows, fields){
			console.log(rows.length);
			capturaDisponibles = rows.length;
		
		if( capturaDisponibles >= 1) {
				res.render('reserva/nuevoReserva',{error : 'El elemento ya se encuentra reservado para esa fecha y hora'});
				db.end();
			}else{
				db.query('INSERT INTO RESERVA SET ?', reservas, function(err, rows, fields){
					if(err) throw err;
					db.end();
					res.render('reserva/nuevoReserva',{info : 'Reserva creado correctamente'});
					});
				}
			});	
		}
	}