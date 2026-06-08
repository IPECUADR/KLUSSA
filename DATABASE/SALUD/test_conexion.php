<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $stmt = $pdoSalud->query("SELECT COUNT(*) AS total FROM persona");
    $row = $stmt->fetch();

    echo json_encode([
        'err' => false,
        'mensaje' => 'Conexión SALUD correcta',
        'total_personas' => $row['total']
    ]);
} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al consultar SALUD'
    ]);
}