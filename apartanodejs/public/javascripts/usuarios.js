$(function () {
	
//Funcion ajax para eliminar.

	$('#tbl-usuario #btn-eliminar').click(function(e){
		e.preventDefault();
		var elemento = $(this);
		var id = elemento.parent().parent().find('#identificador').text();

		var confirmar = confirm('¿ Desea elimiar el Usuario ?');

		if (confirmar) {

		$.ajax({
			url : 'http://localhost:3000/eliminarUsuario',
			method : 'post',
			data : {id : id},
			success : function(res){
				if (res.res) {
					elemento.parent().parent().remove();
					alert('Se ha realizado la eliminación Correcta del Usuario Nro: ' + id);
				}
			}
		});
		}
	});
});