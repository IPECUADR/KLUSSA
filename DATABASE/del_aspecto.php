<?php


require('../DATABASE/conexion.php');

$id= $_POST['id_delete'];

$buscar = "SELECT * FROM aspecto_ambiental, actividades  WHERE aspecto_ambiental.PK_asp_amb  = actividades.FK_asp_amb   AND aspecto_ambiental.PK_asp_amb  = $id";
$query = mysqli_query($con, $buscar);

if ($query) {
    if (mysqli_num_rows($query) > 0) {
        // Se encontraron registros relacionados → mostrar error
        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Este Aspecto Ambiental tiene actividades asociadas y no puede ser eliminado.'
        ]);


    } else {


       $del = "DELETE  FROM    aspecto_ambiental  where PK_asp_amb  = $id";

         $delte = mysqli_query($con, $del);

         
      


            if ($delte) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Subplan eliminado de forma exitosa.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'mensaje' => 'Error al intentar eliminar el subplan.'
                ]);
            }


        
       

      
    }
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error en sistema.'
    ]);
}


	mysqli_close($con);
?>

































