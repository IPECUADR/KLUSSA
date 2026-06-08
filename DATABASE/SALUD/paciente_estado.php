<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo json_encode([
        'err' => true,
        'mensaje' => 'Acceso denegado'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $PK_prs = trim($_POST['PK_prs'] ?? '');
    $estado = trim($_POST['estado'] ?? '');

    if ($PK_prs === '' || !ctype_digit($PK_prs)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Paciente no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($estado === '' || !in_array((int)$estado, [1, 2], true)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Estado no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtExiste = $pdoSalud->prepare("
        SELECT PK_prs
        FROM persona
        WHERE PK_prs = :PK_prs
        LIMIT 1
    ");

    $stmtExiste->execute([
        ':PK_prs' => $PK_prs
    ]);

    if (!$stmtExiste->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Paciente no encontrado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmt = $pdoSalud->prepare("
        UPDATE persona
        SET FK_est_p = :estado
        WHERE PK_prs = :PK_prs
    ");

    $stmt->execute([
        ':estado' => $estado,
        ':PK_prs' => $PK_prs
    ]);

    $mensaje = ((int)$estado === 1)
        ? 'Paciente activado correctamente'
        : 'Paciente desactivado correctamente';

    echo json_encode([
        'err' => false,
        'mensaje' => $mensaje
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al actualizar estado del paciente'
    ], JSON_UNESCAPED_UNICODE);
}