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
    $FK_prs        = trim($_POST['FK_prs'] ?? '');
    $FK_t_ex       = trim($_POST['FK_t_ex'] ?? '');
    $fc_prog_exam  = trim($_POST['fc_prog_exam'] ?? '');
    $FK_prog_a     = trim($_POST['FK_prog_a'] ?? '');

    $camposObligatorios = [
        'Paciente' => $FK_prs,
        'Tipo de examen' => $FK_t_ex,
        'Fecha programada' => $fc_prog_exam,
        'Año de programación' => $FK_prog_a,
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

    if (!ctype_digit($FK_prs) || !ctype_digit($FK_t_ex) || !ctype_digit($FK_prog_a)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Datos del formulario no válidos'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $fecha = DateTime::createFromFormat('Y-m-d', $fc_prog_exam);

    if (!$fecha || $fecha->format('Y-m-d') !== $fc_prog_exam) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Fecha programada no válida'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtPaciente = $pdoSalud->prepare("
        SELECT PK_prs
        FROM persona
        WHERE PK_prs = :FK_prs
        AND FK_est_p = 1
        LIMIT 1
    ");

    $stmtPaciente->execute([
        ':FK_prs' => $FK_prs
    ]);

    if (!$stmtPaciente->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El paciente seleccionado no existe o está inactivo'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtTipo = $pdoSalud->prepare("
        SELECT PK_t_ex
        FROM t_examen
        WHERE PK_t_ex = :FK_t_ex
        LIMIT 1
    ");

    $stmtTipo->execute([
        ':FK_t_ex' => $FK_t_ex
    ]);

    if (!$stmtTipo->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El tipo de examen seleccionado no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtAnio = $pdoSalud->prepare("
        SELECT PK_prog_a
        FROM prog_a
        WHERE PK_prog_a = :FK_prog_a
        LIMIT 1
    ");

    $stmtAnio->execute([
        ':FK_prog_a' => $FK_prog_a
    ]);

    if (!$stmtAnio->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El año de programación seleccionado no existe'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmtDuplicado = $pdoSalud->prepare("
        SELECT PK_examen
        FROM examen
        WHERE FK_prs = :FK_prs
        AND FK_t_ex = :FK_t_ex
        AND FK_prog_a = :FK_prog_a
        LIMIT 1
    ");

    $stmtDuplicado->execute([
        ':FK_prs' => $FK_prs,
        ':FK_t_ex' => $FK_t_ex,
        ':FK_prog_a' => $FK_prog_a
    ]);

    if ($stmtDuplicado->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Ya existe un examen de este tipo para el paciente en el año seleccionado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    /*
     * Estado inicial:
     * FK_est_exam = 5 => AGENDADO
     * FK_v_vrd_ex = 2 => NO
     */
    $sqlInsert = "
        INSERT INTO examen (
            FK_t_ex,
            FK_prs,
            fc_prog_exam,
            FK_prog_a,
            FK_est_exam,
            resultado_exam,
            v_medica,
            FK_v_vrd_ex,
            cal_cert_exam
        ) VALUES (
            :FK_t_ex,
            :FK_prs,
            :fc_prog_exam,
            :FK_prog_a,
            5,
            '',
            '',
            2,
            ''
        )
    ";

    $stmtInsert = $pdoSalud->prepare($sqlInsert);

    $stmtInsert->execute([
        ':FK_t_ex' => $FK_t_ex,
        ':FK_prs' => $FK_prs,
        ':fc_prog_exam' => $fc_prog_exam,
        ':FK_prog_a' => $FK_prog_a
    ]);

    echo json_encode([
        'err' => false,
        'mensaje' => 'Examen registrado correctamente'
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al registrar examen'
    ], JSON_UNESCAPED_UNICODE);
}