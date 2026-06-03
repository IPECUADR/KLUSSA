<?php
session_start(); 
require('../DATABASE/conexion.php');

$PK_user = intval($_POST['PK_user']); // ID que se quiere eliminar
$usuario_en_sesion = $_SESSION['username'] ?? null; // Usuario logueado

if(!$usuario_en_sesion){
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Sesión no válida. No se puede eliminar usuarios.'
    ]);
    exit;
}

// Verificar si el ID que se intenta eliminar es el del usuario logueado
$check_self = "SELECT PK_user FROM usuario 
               WHERE username_user = '$usuario_en_sesion' 
               AND PK_user = '$PK_user'";
$self_query = mysqli_query($con, $check_self);

if ($self_query && mysqli_num_rows($self_query) > 0) {
    // Se está intentando eliminar a sí mismo → bloquear
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'No puedes eliminar tu propio usuario mientras estás logueado.'
    ]);
    exit;
}

// Si llegamos aquí, es porque NO es el usuario logueado → podemos eliminarlo
$delete = "DELETE FROM usuario WHERE PK_user = $PK_user";
$del_query = mysqli_query($con, $delete);

if ($del_query) {
    echo json_encode([
        'status' => 'success',
        'mensaje' => 'Usuario eliminado de forma exitosa.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al intentar eliminar el usuario.'
    ]);
}

mysqli_close($con);
?>






























