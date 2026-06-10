<?php
session_start();

/*
|--------------------------------------------------------------------------
| Controlador Vacunas - Módulo SALUD
|--------------------------------------------------------------------------
| Usa login único de KLUSSA.
| Acceso permitido únicamente para rol 6: KLUSSA SALUD / PMA.
*/

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    header("Location: ../");
    exit();
}

$usuario  = $_SESSION['user']['username'];
$nombre   = $_SESSION['user']['nombre'];
$apellido = $_SESSION['user']['apellido'];
$rol      = $_SESSION['user']['rol'];
$USUARIO  = $_SESSION['user']['username'];

if ((int)$rol !== 6) {
    http_response_code(403);
    echo "Acceso denegado. Este módulo requiere rol KLUSSA SALUD / PMA.";
    exit();
}

require_once '../TEM-SL/temp_salud_header.php';
require_once '../INTERFACE/SALUD/vacunas.php';
require_once '../TEM-SL/temp_salud_footer.php';