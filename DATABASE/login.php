<?php
session_start();
require('conexion.php');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo json_encode([
        'err' => true,
        'mensaje' => 'Acceso denegado'
    ]);
    exit;
}


if (!isset($_POST['username'], $_POST['password'])) {
    echo json_encode([
        'err' => true,
        'mensaje' => 'Datos incompletos'
    ]);
    exit;
}

$username = $_POST['username'];
$password = sha1($_POST['password']);


$stmt = $con->prepare("SELECT * FROM usuario WHERE username_user = ? AND password_user = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

$usuario = $result->fetch_assoc();

if ($usuario) {

    $rol = $usuario['FK_t_user'];

    $roles_permitidos = [1, 2, 5, 6, 7];

    if (in_array($rol, $roles_permitidos)) {

        $_SESSION['user'] = [
             'username' => $username,
             'rol' => $rol,
             'nombre' => $usuario['nom_user'],
             'apellido' => $usuario['ap_user']
        ];

        echo json_encode([
            'err' => false,
			'icon' => 'success',
            'mensaje' => 'Usuario válido',
            'rol' => $rol
        ]);

    } else {
        echo json_encode([
            'err' => true,
            'icon' => 'error',
            'mensaje' => 'Aún no tienes rol asignado'
        ]);
    }

} else {
    echo json_encode([
        'err' => true,
        'icon' => 'error',
        'mensaje' => 'Usuario o contraseña incorrectos'
    ]);
}

$stmt->close();
$con->close();
?>
