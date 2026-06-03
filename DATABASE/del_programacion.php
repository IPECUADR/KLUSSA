<?php


require('../DATABASE/conexion.php');

$id= $_POST['PK_user'];



       $del = "DELETE  FROM    programacion  where PK_prg = $id";

         $delte = mysqli_query($con, $del);

         
      


            if ($delte) {


                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Programación eliminado de forma exitosa.'
                ]);

                
            } else {

                echo json_encode([
                    'status' => 'error',
                    'mensaje' => 'Error al intentar eliminar el subplan.'
                ]);
            
            }
        




        
       

      
    



	mysqli_close($con);
?>

































