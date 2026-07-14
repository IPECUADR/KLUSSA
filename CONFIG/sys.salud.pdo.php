<?php

/*
|--------------------------------------------------------------------------
| Conexión PDO para módulo SALUD
|--------------------------------------------------------------------------
| Esta conexión apunta a la base klussa_salud.
| No reemplaza la conexión principal de KLUSSA ni la de Desechos.
*/

if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'])) {
    http_response_code(403);
    exit('Acceso denegado');
}

$configPath = __DIR__ . '/env.php';

if (!file_exists($configPath)) {
    error_log('No existe CONFIG/env.php para conexión SALUD.');
    die('Error de configuración');
}

$config = require $configPath;

if (!isset($config['salud'])) {
    error_log('No existe configuración salud en CONFIG/env.php.');
    die('Error de configuración SALUD');
}

$host = $config['salud']['host'];
$db   = $config['salud']['db'];
$user = $config['salud']['user'];
$pass = $config['salud']['pass'];
$charset = 'utf8mb4';

$dsn = "mysql:host={$host};dbname={$db};charset={$charset}";

try {
    $pdoSalud = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    die('Error de conexión a SALUD');
}