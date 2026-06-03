
<?php 
/* La funcionalidad de esta clase
tiene como objetivo Realizar la conexión
con las Base de Datos */
	include 'data.php';
	$con = mysqli_connect(
		$servidor,
		$usuario,
		$password,
		$database
	);

?>