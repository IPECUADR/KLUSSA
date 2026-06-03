<?php
require('../CONFIG/sys.res.con.php');

$PK_dip      = $_POST['id'] ?? null;
$campo       = $_POST['campo'] ?? null;
$update_dato = $_POST['update_dato'] ?? null;

if(!$PK_dip || !$campo){
    echo json_encode(['err'=>true,'status'=>'err','mensaje'=>'Datos incompletos']);
    exit;
}

if($campo == 'ct_gestor_des' || $campo == 'ct_trasporte_des'){

    $query = "SELECT ct_trasporte_des, ct_gestor_des 
              FROM dispocicion 
              WHERE PK_disp = '$PK_dip'";

    $result = mysqli_query($con,$query);

    if($result && mysqli_num_rows($result)>0){

        $row = mysqli_fetch_assoc($result);

        $ct_trasporte_des = ($campo == 'ct_trasporte_des') 
            ? (float)$update_dato 
            : (float)$row['ct_trasporte_des'];

        $ct_gestor_des = ($campo == 'ct_gestor_des') 
            ? (float)$update_dato 
            : (float)$row['ct_gestor_des'];

        $total = $ct_trasporte_des + $ct_gestor_des;

        $up = "UPDATE dispocicion 
               SET $campo='$update_dato', ct_total_des='$total' 
               WHERE PK_disp='$PK_dip'";

        $update = mysqli_query($con,$up);

    }else{

        echo json_encode([
            'err'=>true,
            'status'=>'err',
            'mensaje'=>'Error al obtener datos: '.mysqli_error($con)
        ]);
        exit;
    }

}else{

    $up = "UPDATE dispocicion 
           SET $campo='$update_dato' 
           WHERE PK_disp='$PK_dip'";

    $update = mysqli_query($con,$up);
}

if($update){
    echo json_encode([
        'err'=>false,
        'status'=>'success',
        'mensaje'=>'Actualización exitosa'
    ]);
}else{
    echo json_encode([
        'err'=>true,
        'status'=>'err',
        'mensaje'=>'Error al actualizar: '.mysqli_error($con)
    ]);
}

mysqli_close($con);
?>
