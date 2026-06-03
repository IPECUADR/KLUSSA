<?php
require('../CONFIG/sys.res.con.php');

    $PK_pro = $_POST['id'];
    $proyec = $_POST['proyecto'] ;
    $provincia = $_POST['provincia'];

$up = "UPDATE proyectos SET proyecto = '$proyec', provincia = '$provincia' WHERE PK_pro  = $PK_pro ";


    $update = mysqli_query($con, $up);

        if ($update) {
          echo json_encode(array('err'=>false, 'status'=>'success','mensaje'=>'Actualizacion exitosa .'));
        } else {

          echo json_encode(['err' => true, 'status'=>'err','mensaje' => 'Error al insertar: ' . mysqli_error($con)]);

            mysqli_error($con);
        }


mysqli_close($con);
?>
