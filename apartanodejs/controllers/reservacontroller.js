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

		db.query('SELECT * FROM RESERVA', function(err, rows, fields){
			if(err) throw err;

			reserva = rows;
			db.end();

			res.render('reserva/reserva', {reserva : reserva});
		});

			
	},

	getNuevoReserva : function(req, res, next){
		res.render('reserva/nuevoReserva');
	},

	postNuevoReserva : function(req, res,next){
		//console.log(req.body);

		var fechaformato = dateFormat(req.body.fecha, 'yyyy-mm-dd');

		var reservas = {
			ID_USUARIO : req.body.cedula,
			ID_INSTRUMENTO : req.body.referencia,
			FECHA_ASIGNACION : fechaformato,
			HORA : req.body.hora,
			DESCRIPCION : req.body.descripcion
		}

		//console.log(fechaformato);

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO RESERVA SET ?', reservas, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.render('reserva/nuevoReserva',{info : 'Reserva creado correctamente'});

	}
}