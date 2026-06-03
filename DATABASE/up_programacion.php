<?php
require('../DATABASE/conexion.php');

// DATOS DE CONEXIÓN FTP
$ftp_server = "200.105.244.50";
$ftp_user   = "Administrador";
$ftp_pass   = "@Kde.2024";
$ftp_ruta   = "/DOC/ACTIVIDADES/"; // Ruta remota en FTP

// DATOS FORM
$user_up = $_POST['user_up'];
$id_prog = $_POST['id_prog'];
$des_ac = $_POST['des_ac'];

// ARCHIVO RECIBIDO
$archivo_nombre = $_FILES['dc_ev']['name'];
$archivo_temp   = $_FILES['dc_ev']['tmp_name'];
$archivo_tam    = $_FILES['dc_ev']['size'];
$ext = strtolower(pathinfo($archivo_nombre, PATHINFO_EXTENSION));

// VALIDACIONES
$permitidos = ['pdf'];

if (!in_array($ext, $permitidos)) {
    echo json_encode(['err' => true, 'mensaje' => 'Tipo de archivo no permitido.']);
    exit;
}

if ($archivo_tam > 2 * 1024 * 1024 * 1024) {
    echo json_encode(['err' => true, 'mensaje' => 'El archivo es demasiado grande.']);
    exit;
}

// Generar nombre único
$nuevo_nombre = uniqid('prog_') . '.' . $ext;
$ruta_remota = $ftp_ruta . $nuevo_nombre;

// Buscar si existe registro anterior
$busqueda = "SELECT * FROM programacion WHERE PK_prg = $id_prog";
$bs = mysqli_query($con, $busqueda);

if (!$bs || mysqli_num_rows($bs) === 0) {
    echo json_encode(['err' => true, 'mensaje' => 'No se encuentra el registro.']);
    exit;
}

$respuesta = mysqli_fetch_array($bs);
$archivo_anterior = $respuesta['evidencia_arc'];
$ruta_ftp_anterior = $ftp_ruta . $archivo_anterior;

// Conectar a FTP
$conn_id = ftp_connect($ftp_server);
if (!$conn_id || !ftp_login($conn_id, $ftp_user, $ftp_pass)) {
    echo json_encode(['err' => true, 'mensaje' => 'No se pudo conectar al servidor FTP.']);
    exit;
}

ftp_pasv($conn_id, true); // Modo pasivo (recomendado para Fortinet/NAT)

// Eliminar archivo anterior en FTP (si existe)
if (!empty($archivo_anterior)) {
    ftp_delete($conn_id, $ruta_ftp_anterior); // Si no existe no da error crítico
}

// Subir nuevo archivo a FTP
$subida = ftp_put($conn_id, $ruta_remota, $archivo_temp, FTP_BINARY);
ftp_close($conn_id);

if ($subida) {
    // Actualizar base de datos
    $update_reg = "UPDATE programacion 
                   SET user_up_ac_rp = '$user_up', evidencia_des = '$des_ac', FK_est_act = '2', evidencia_arc = '$nuevo_nombre' 
                   WHERE PK_prg = $id_prog";
    $up = mysqli_query($con, $update_reg);

    if ($up) {
        echo json_encode(['err' => false, 'mensaje' => 'Actividad Ejecutada.']);
    } else {
        echo json_encode(['err' => true, 'mensaje' => 'Error al actualizar la base de datos.']);
    }
} else {
    echo json_encode(['err' => true, 'mensaje' => 'Error al subir el archivo al servidor FTP.']);
}

mysqli_close($con);
?>
