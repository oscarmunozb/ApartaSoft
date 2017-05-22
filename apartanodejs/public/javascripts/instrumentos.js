$(function () {
	
//Funcion ajax para eliminar.

	$('#tbl-instrumento #btn-eliminar').click(function(e){
		e.preventDefault();
		var elemento = $(this);
		var id = elemento.parent().parent().find('#identificador').text();

		var confirmar = confirm('¿ Desea elimiar el producto ?');

		if (confirmar) {

		$.ajax({
			url : 'http://localhost:3000/eliminarinstrumento',
			method : 'post',
			data : {id : id},
			success : function(res){
				if (res.res) {
					elemento.parent().parent().remove();
					alert('Se ha realizado la eliminación Correcta del Instrumento Nro: ' + id);
				}
			}
		});
			
		}
		

	});
});