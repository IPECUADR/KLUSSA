<?php
require('../DATABASE/conexion.php');

// Datos FTP
$ftp_server = "200.105.244.50";
$ftp_user   = "Administrador";
$ftp_pass   = "@Kde.2024";
$ftp_ruta   = "/DOC/PLANES/"; // Ruta en el servidor FTP

// Datos formulario
$user_up  = $_POST['user_up'];
$plan_nm  = $_POST['plan_nm'];
$des_plan = $_POST['des_plan'];
$an_plan  = $_POST['an_plan'];

// Validar archivo
if (!isset($_FILES['doc_plan']) || $_FILES['doc_plan']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['err' => true, 'mensaje' => 'No se envió archivo o hubo error']);
    exit;
}

$archivo_nombre = $_FILES['doc_plan']['name'];
$archivo_temp   = $_FILES['doc_plan']['tmp_name'];
$archivo_tam    = $_FILES['doc_plan']['size'];
$ext            = strtolower(pathinfo($archivo_nombre, PATHINFO_EXTENSION));


// Validar duplicado
$busqueda = "SELECT * FROM planes WHERE plan_nom = '$plan_nm'";
$res = mysqli_query($con, $busqueda);
if ($res && mysqli_num_rows($res) > 0) {
    echo json_encode(['err' => true, 'mensaje' => 'Plan ya existe']);
    exit;
}

// Nombre único para evitar colisiones
$nuevo_nombre = uniqid('plan_') . '.' . $ext;

// Conectar FTP
$conn_id = ftp_connect($ftp_server);
$login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);
ftp_pasv($conn_id, true);

if ($conn_id && $login_result) {
    // Subir archivo al FTP
    if (ftp_put($conn_id, $ftp_ruta . $nuevo_nombre, $archivo_temp, FTP_BINARY)) {
        // Insertar en base de datos
        $insert = "INSERT INTO planes (plan_nom, plan_desc, plan_an, doc_pln_mc_lg, user_up_plan_aut, fc_up_plan_aut, fc_in_plant_aut) 
                   VALUES ('$plan_nm', '$des_plan', '$an_plan', '$nuevo_nombre', '$user_up', '0000-00-00 00:00:00.000000', CURRENT_TIMESTAMP())";

        if (mysqli_query($con, $insert)) {
            echo json_encode(['err' => false, 'mensaje' => 'Archivo subido y registro guardado.']);
        } else {
            echo json_encode(['err' => true, 'mensaje' => 'Error al insertar en la base de datos.']);
        }
    } else {
        echo json_encode(['err' => true, 'mensaje' => 'Error al subir archivo vía FTP.']);
    }

    ftp_close($conn_id);
} else {
    echo json_encode(['err' => true, 'mensaje' => 'No se pudo conectar al servidor FTP.']);
}
mysqli_close($con);
