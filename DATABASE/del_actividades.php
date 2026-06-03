<?php


require('../DATABASE/conexion.php');

$id= $_POST['id_delete'];

$buscar = "SELECT * 

            FROM 

            actividades, 
            programacion  

            WHERE actividades.PK_act = programacion.FK_act    

            AND actividades.PK_act  = $id";



$query = mysqli_query($con, $buscar);

if ($query) {
    if (mysqli_num_rows($query) > 0) {
        // Se encontraron registros relacionados → mostrar error
        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Este Aspecto Ambiental tiene actividades asociadas y no puede ser eliminado.'
        ]);


    } else {


       $del = "DELETE  FROM    actividades  where PK_act  = $id";

         $delte = mysqli_query($con, $del);

         
      


            if ($delte) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Medida de gestion eliminada de forma exitosa.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'mensaje' => 'Error al intentar eliminar la medida de gestion.'
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

































