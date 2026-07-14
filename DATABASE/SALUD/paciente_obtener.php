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
    $PK_prs = $_GET['PK_prs'] ?? '';

    if ($PK_prs === '' || !ctype_digit($PK_prs)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Paciente no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "
        SELECT
            PK_prs,
            hcl_num,
            nombre_prs,
            apellido_ps,
            ci_prs,
            email_prs,
            num_cel_prs,
            fc_nan_prc,
            FK_sexo_p,
            FK_cg,
            FK_g_atn,
            FK_ag,
            FK_g_sg
        FROM persona
        WHERE PK_prs = :PK_prs
        LIMIT 1
    ";

    $stmt = $pdoSalud->prepare($sql);
    $stmt->execute([
        ':PK_prs' => $PK_prs
    ]);

    $paciente = $stmt->fetch();

    if (!$paciente) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Paciente no encontrado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'err' => false,
        'data' => $paciente
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al obtener paciente'
    ], JSON_UNESCAPED_UNICODE);
}