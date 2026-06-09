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
    $PK_examen      = trim($_POST['PK_examen_resultado'] ?? '');
    $FK_est_exam    = trim($_POST['FK_est_exam_resultado'] ?? '');
    $FK_v_vrd_ex    = trim($_POST['FK_v_vrd_ex_resultado'] ?? '');
    $resultado_exam = trim($_POST['resultado_exam'] ?? '');
    $v_medica       = trim($_POST['v_medica'] ?? '');
    $cal_cert_exam  = trim($_POST['cal_cert_exam'] ?? '');

    if ($PK_examen === '' || !ctype_digit($PK_examen)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Examen no válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $camposObligatorios = [
        'Estado del examen' => $FK_est_exam,
        'Validado' => $FK_v_vrd_ex,
    ];

    foreach ($camposObligatorios as $campo => $valor) {
        if ($valor === '') {
            echo json_encode([
                'err' => true,
                'mensaje' => "Campo obligatorio vacío: {$campo}"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    if (!ctype_digit($FK_est_exam) || !ctype_digit($FK_v_vrd_ex)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Datos del formulario no válidos'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtExiste = $pdoSalud->prepare("
        SELECT PK_examen
        FROM examen
        WHERE PK_examen = :PK_examen
        LIMIT 1
    ");

    $stmtExiste->execute([
        ':PK_examen' => $PK_examen
    ]);

    if (!$stmtExiste->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El examen que intenta actualizar no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtEstado = $pdoSalud->prepare("
        SELECT PK_est_exam
        FROM est_exam
        WHERE PK_est_exam = :FK_est_exam
        LIMIT 1
    ");

    $stmtEstado->execute([
        ':FK_est_exam' => $FK_est_exam
    ]);

    if (!$stmtEstado->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El estado seleccionado no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtValidado = $pdoSalud->prepare("
        SELECT PK_v_vrd_ex
        FROM v_verdad_ex
        WHERE PK_v_vrd_ex = :FK_v_vrd_ex
        LIMIT 1
    ");

    $stmtValidado->execute([
        ':FK_v_vrd_ex' => $FK_v_vrd_ex
    ]);

    if (!$stmtValidado->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El valor de validación seleccionado no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sqlUpdate = "
        UPDATE examen
        SET
            FK_est_exam = :FK_est_exam,
            resultado_exam = :resultado_exam,
            v_medica = :v_medica,
            FK_v_vrd_ex = :FK_v_vrd_ex,
            cal_cert_exam = :cal_cert_exam
        WHERE PK_examen = :PK_examen
    ";

    $stmtUpdate = $pdoSalud->prepare($sqlUpdate);

    $stmtUpdate->execute([
        ':FK_est_exam' => $FK_est_exam,
        ':resultado_exam' => $resultado_exam,
        ':v_medica' => $v_medica,
        ':FK_v_vrd_ex' => $FK_v_vrd_ex,
        ':cal_cert_exam' => $cal_cert_exam,
        ':PK_examen' => $PK_examen
    ]);

    echo json_encode([
        'err' => false,
        'mensaje' => 'Resultado de examen actualizado correctamente'
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al actualizar resultado del examen'
    ], JSON_UNESCAPED_UNICODE);
}