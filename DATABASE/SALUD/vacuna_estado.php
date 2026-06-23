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
    $PK_vc = trim($_POST['PK_vc'] ?? '');
    $FK_est_vc = trim($_POST['FK_est_vc'] ?? '');

    if ($PK_vc === '' || !ctype_digit($PK_vc)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Vacuna no válida'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($FK_est_vc === '' || !ctype_digit($FK_est_vc)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Estado no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtEstado = $pdoSalud->prepare("
        SELECT PK_est_vc, estado_vacuna
        FROM est_vacuna
        WHERE PK_est_vc = :FK_est_vc
        LIMIT 1
    ");

    $stmtEstado->execute([
        ':FK_est_vc' => $FK_est_vc
    ]);

    $estado = $stmtEstado->fetch();

    if (!$estado) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El estado seleccionado no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtExiste = $pdoSalud->prepare("
        SELECT PK_vc
        FROM vacuna
        WHERE PK_vc = :PK_vc
        LIMIT 1
    ");

    $stmtExiste->execute([
        ':PK_vc' => $PK_vc
    ]);

    if (!$stmtExiste->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'La vacuna no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtUpdate = $pdoSalud->prepare("
        UPDATE vacuna
        SET FK_est_vc = :FK_est_vc
        WHERE PK_vc = :PK_vc
    ");

    $stmtUpdate->execute([
        ':FK_est_vc' => $FK_est_vc,
        ':PK_vc' => $PK_vc
    ]);

    $mensaje = ((int)$FK_est_vc === 3)
        ? 'Vacuna eliminada correctamente'
        : 'Estado de vacuna actualizado correctamente';

    echo json_encode([
        'err' => false,
        'mensaje' => $mensaje
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al actualizar estado de vacuna'
    ], JSON_UNESCAPED_UNICODE);
}