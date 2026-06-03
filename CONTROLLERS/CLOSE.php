<?php
session_start(); // Asegura que la sesión esté activa antes de destruirla

// Limpia todas las variables de sesión
$_SESSION = array();

// Destruye la cookie de sesión si existe
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finalmente destruye la sesión
session_destroy();

// Redirige al inicio
header("Location: ../index.php");
exit; // Siempre es recomendable usar exit después de header
?>