<?php


require('../DATABASE/conexion.php');

$id= $_POST['id_delete'];

$buscar = "SELECT * FROM sub_plan, aspecto_ambiental WHERE sub_plan.PK_sub = aspecto_ambiental.FK_sub  AND sub_plan.PK_sub = $id";
$query = mysqli_query($con, $buscar);

if ($query) {
    if (mysqli_num_rows($query) > 0) {
        // Se encontraron registros relacionados → mostrar error
        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Este subplan tiene actividades asociadas y no puede ser eliminado.'
        ]);


    } else {


       $del = "DELETE  FROM    sub_plan  where PK_sub = $id";

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
        'mensaje' => 'Error en el sistema.'
    ]);
}


	mysqli_close($con);
?>

































