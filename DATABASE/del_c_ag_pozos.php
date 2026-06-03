<?php


require('../CONFIG/sys.res.con.php');

$id= $_POST['id_delete'];





       $del = "DELETE  FROM    c_ag_posos  where PK_c_ag_ps  = $id";

         $delte = mysqli_query($con, $del);

         
      


            if ($delte) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Registro eliminado de forma exitosa.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'mensaje' => 'Error al intentar eliminar la medida de gestion.'
                ]);
            }


        
       

      


	mysqli_close($con);
?>

































