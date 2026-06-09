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
    $PK_examen = trim($_GET['PK_examen'] ?? '');

    if ($PK_examen === '' || !ctype_digit($PK_examen)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Examen no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "
        SELECT
            PK_examen,
            FK_t_ex,
            FK_prs,
            fc_prog_exam,
            FK_prog_a,
            FK_est_exam,
            resultado_exam,
            v_medica,
            FK_v_vrd_ex,
            cal_cert_exam
        FROM examen
        WHERE PK_examen = :PK_examen
        LIMIT 1
    ";

    $stmt = $pdoSalud->prepare($sql);
    $stmt->execute([
        ':PK_examen' => $PK_examen
    ]);

    $examen = $stmt->fetch();

    if (!$examen) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Examen no encontrado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'err' => false,
        'data' => $examen
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al obtener examen'
    ], JSON_UNESCAPED_UNICODE);
}