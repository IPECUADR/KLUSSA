<?php
require('../DATABASE/conexion.php');

$PK_plan = $_POST['PK_plan'];

// 1. Verificar si el plan tiene actividades asociadas
$buscar = "SELECT * FROM planes, ag_plan WHERE planes.PK_plan = ag_plan.FK_plan AND planes.PK_plan = $PK_plan";
$query = mysqli_query($con, $buscar);

if ($query && mysqli_num_rows($query) > 0) {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Este plan tiene actividades asociadas y no puede ser eliminado.'
    ]);
    exit;
}

// 2. Buscar el registro del plan
$busqueda = "SELECT * FROM planes WHERE PK_plan = $PK_plan";
$bs = mysqli_query($con, $busqueda);

if (!$bs || mysqli_num_rows($bs) === 0) {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'No se encontró el registro.'
    ]);
    exit;
}

$respuesta = mysqli_fetch_array($bs);
$archivo_server = $respuesta['doc_pln_mc_lg'];

// 3. Eliminar archivo local si existe
if ($archivo_server) {
    $archivo_local = '../DOC/PLANES/' . $archivo_server;
    if (file_exists($archivo_local)) {
        unlink($archivo_local);
    }

    // 4. Eliminar archivo desde el servidor FTP
    $ftp_server = "200.105.244.50";
    $ftp_user   = "Administrador";
    $ftp_pass   = "@Kde.2024";
    $ftp_ruta   = "/DOC/PLANES/";
    $ruta_remota = $ftp_ruta . $archivo_server;

    $conn_id = ftp_connect($ftp_server);
    if ($conn_id && ftp_login($conn_id, $ftp_user, $ftp_pass)) {
        ftp_pasv($conn_id, true); // Activa modo pasivo si estás detrás de NAT/Fortinet
        if (ftp_delete($conn_id, $ruta_remota)) {
            // Archivo eliminado correctamente del FTP
        } else {
            // No se pudo eliminar desde FTP (opcional: registrar/log)
        }
        ftp_close($conn_id);
    }
}

// 5. Eliminar el registro en la base de datos
$delete = "DELETE FROM planes WHERE PK_plan = $PK_plan";
$del_query = mysqli_query($con, $delete);

if ($del_query) {
    echo json_encode([
        'status' => 'success',
        'mensaje' => 'El plan fue eliminado correctamente.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al intentar eliminar el plan de la base de datos.'
    ]);
}

mysqli_close($con);
?>
