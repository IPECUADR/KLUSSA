<?php

/*
|--------------------------------------------------------------------------
| Configuración de conexión principal KLUSSA
|--------------------------------------------------------------------------
| Este archivo mantiene las variables que usa DATABASE/conexion.php:
| $servidor, $usuario, $password y $database.
|
| Las credenciales se leen desde CONFIG/env.php.
| CONFIG/env.php NO debe subirse a GitHub.
*/

$configPath = __DIR__ . '/../CONFIG/env.php';

if (!file_exists($configPath)) {
    die('No existe archivo de configuración del sistema.');
}

$config = require $configPath;

if (!isset($config['klussa'])) {
    die('No existe configuración para la base KLUSSA.');
}

$servidor = $config['klussa']['host'];
$usuario  = $config['klussa']['user'];
$password = $config['klussa']['pass'];
$database = $config['klussa']['db'];