<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    echo json_encode([
        'err' => true,
        'mensaje' => 'Acceso denegado'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $PK_vc = trim($_GET['PK_vc'] ?? '');

    if ($PK_vc === '' || !ctype_digit($PK_vc)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Vacuna no válida'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "
        SELECT
            PK_vc,
            FK_t_vc,
            FK_prs,
            FK_ds,
            FK_mc,
            fc_vc,
            evidencia_vc,
            FK_est_vc
        FROM vacuna
        WHERE PK_vc = :PK_vc
        LIMIT 1
    ";

    $stmt = $pdoSalud->prepare($sql);
    $stmt->execute([
        ':PK_vc' => $PK_vc
    ]);

    $vacuna = $stmt->fetch();

    if (!$vacuna) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Vacuna no encontrada'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'err' => false,
        'data' => $vacuna
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al obtener vacuna'
    ], JSON_UNESCAPED_UNICODE);
}