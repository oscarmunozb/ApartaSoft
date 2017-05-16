var mysql = require('mysql');


//instrumento controller


module.exports = {
	// funciones del controlador

	login : function(req, res, next){
		res.render('login/login');
	},

	postIngresar : function(req, res,next){
		console.log(req.body.cedula);

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var login = null;



		db.query('SELECT ID_USUARIO,APELLIDOS FROM USUARIO WHERE ID_USUARIO ="'+req.body.cedula+'" AND PASSWORD="'+req.body.password+'"', function(err, rows, fields){
			if(err) throw err;
				db.end();
			if(rows.length <=0){
				res.render('login/login',{info : 'Datos incorrectos'});
			}else{
				res.render('index');
			}
			console.log(login);
		});

	}
}