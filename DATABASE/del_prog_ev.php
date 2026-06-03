<?php
require('../DATABASE/conexion.php');

$id_prog = $_POST['id_delete'];

// 1. Verificar si tiene relaciones (opcional, si aplica)
// Por ejemplo, si hay otra tabla que depende de programacion, validar aquí

// 2. Buscar el registro de programación
$busqueda = "SELECT * FROM programacion WHERE PK_prg = $id_prog";
$bs = mysqli_query($con, $busqueda);

if (!$bs || mysqli_num_rows($bs) === 0) {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'No se encontró el registro de programación.'
    ]);
    exit;
}

$respuesta = mysqli_fetch_array($bs);
$archivo_server = $respuesta['evidencia_arc'];

// 3. Eliminar archivo local (si aplicara; opcional)
// $archivo_local = '../DOC/ACTIVIDADES/' . $archivo_server;
// if (file_exists($archivo_local)) {
//     unlink($archivo_local);
// }

// 4. Eliminar archivo desde FTP
if ($archivo_server) {
    $ftp_server = "200.105.244.50";
    $ftp_user   = "Administrador";
    $ftp_pass   = "@Kde.2024";
    $ftp_ruta   = "/DOC/ACTIVIDADES/";
    $ruta_remota = $ftp_ruta . $archivo_server;

    $conn_id = ftp_connect($ftp_server);
    if ($conn_id && ftp_login($conn_id, $ftp_user, $ftp_pass)) {
        ftp_pasv($conn_id, true);
        ftp_delete($conn_id, $ruta_remota); // Intenta eliminar (no se detiene si falla)
        ftp_close($conn_id);
    }
}

// 5. Eliminar registro de la base de datos
$delete = "DELETE FROM programacion WHERE PK_prg = $id_prog";
$del_query = mysqli_query($con, $delete);

if ($del_query) {
    echo json_encode([
        'status' => 'success',
        'mensaje' => 'La programación fue eliminada correctamente.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al eliminar la programación de la base de datos.'
    ]);
}

mysqli_close($con);
?>
