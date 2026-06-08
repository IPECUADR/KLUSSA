<?php

if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
    http_response_code(403);
    exit('Acceso denegado');
}

$configPath = __DIR__ . '/env.php';

if (!file_exists($configPath)) {
    die('No existe archivo de configuración del sistema.');
}

$config = require $configPath;

if (!isset($config['desechos'])) {
    die('No existe configuración para la base de desechos.');
}

$servidor = $config['desechos']['host'];
$usuario  = $config['desechos']['user'];
$password = $config['desechos']['pass'];
$database = $config['desechos']['db'];

$con = mysqli_connect($servidor, $usuario, $password, $database);

if (!$con) {
    die("❌ Error de conexión: " . mysqli_connect_error());
}

mysqli_set_charset($con, "utf8mb4");