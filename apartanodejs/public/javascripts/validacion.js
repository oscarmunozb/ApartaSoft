$(function(){
	$('.form-nuevoinstrumento form').form({
		nombre : {
			identifier : 'nombre',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese un nombre'
				}
			]
		},
		descripcion : {
			identifier : 'descripcion',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese una descripción'
				}
			]
		}
	});
});