<?php
session_start();

/*
|--------------------------------------------------------------------------
| Controlador principal del módulo SALUD
|--------------------------------------------------------------------------
| Usa el login único de KLUSSA.
| Acceso permitido únicamente para rol 6: KLUSSA SALUD / PMA.
*/

// Validar sesión principal de KLUSSA
if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    header("Location: ../");
    exit();
}

// Obtener datos de sesión
$usuario  = $_SESSION['user']['username'];
$nombre   = $_SESSION['user']['nombre'];
$apellido = $_SESSION['user']['apellido'];
$rol      = $_SESSION['user']['rol'];
$USUARIO  = $_SESSION['user']['username'];

// Validar rol permitido para SALUD
if ((int)$rol !== 6) {
    http_response_code(403);
    echo "Acceso denegado. Este módulo requiere rol KLUSSA SALUD / PMA.";
    exit();
}

// Cargar template SALUD indicado por jefatura
require_once '../TEM-SL/temp_salud_header.php';
require_once '../INTERFACE/SALUD/salud_home.php';
require_once '../TEM-SL/temp_salud_footer.php';