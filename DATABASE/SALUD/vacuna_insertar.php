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
    $FK_t_vc   = trim($_POST['FK_t_vc'] ?? '');
    $FK_prs    = trim($_POST['FK_prs'] ?? '');
    $FK_ds     = trim($_POST['FK_ds'] ?? '');
    $FK_mc     = trim($_POST['FK_mc'] ?? '');
    $fc_vc     = trim($_POST['fc_vc'] ?? '');
    $FK_est_vc = trim($_POST['FK_est_vc'] ?? '');

    $camposObligatorios = [
        'Paciente' => $FK_prs,
        'Tipo de vacuna' => $FK_t_vc,
        'Dosis' => $FK_ds,
        'Marca' => $FK_mc,
        'Fecha de vacuna' => $fc_vc,
        'Estado' => $FK_est_vc,
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

    if (
        !ctype_digit($FK_t_vc) ||
        !ctype_digit($FK_prs) ||
        !ctype_digit($FK_ds) ||
        !ctype_digit($FK_mc) ||
        !ctype_digit($FK_est_vc)
    ) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Datos del formulario no válidos'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $fecha = DateTime::createFromFormat('Y-m-d', $fc_vc);

    if (!$fecha || $fecha->format('Y-m-d') !== $fc_vc) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Fecha de vacuna no válida'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $validaciones = [
        [
            'sql' => "SELECT PK_prs FROM persona WHERE PK_prs = :id AND FK_est_p = 1 LIMIT 1",
            'id' => $FK_prs,
            'mensaje' => 'El paciente seleccionado no existe o está inactivo'
        ],
        [
            'sql' => "SELECT PK_t_vc FROM t_vacuna WHERE PK_t_vc = :id LIMIT 1",
            'id' => $FK_t_vc,
            'mensaje' => 'El tipo de vacuna seleccionado no existe'
        ],
        [
            'sql' => "SELECT PK_ds FROM dosis WHERE PK_ds = :id LIMIT 1",
            'id' => $FK_ds,
            'mensaje' => 'La dosis seleccionada no existe'
        ],
        [
            'sql' => "SELECT PK_m_vc FROM marca_vc WHERE PK_m_vc = :id LIMIT 1",
            'id' => $FK_mc,
            'mensaje' => 'La marca seleccionada no existe'
        ],
        [
            'sql' => "SELECT PK_est_vc FROM est_vacuna WHERE PK_est_vc = :id LIMIT 1",
            'id' => $FK_est_vc,
            'mensaje' => 'El estado seleccionado no existe'
        ],
    ];

    foreach ($validaciones as $validacion) {
        $stmt = $pdoSalud->prepare($validacion['sql']);
        $stmt->execute([
            ':id' => $validacion['id']
        ]);

        if (!$stmt->fetch()) {
            echo json_encode([
                'err' => true,
                'mensaje' => $validacion['mensaje']
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    $stmtDuplicado = $pdoSalud->prepare("
        SELECT PK_vc
        FROM vacuna
        WHERE FK_prs = :FK_prs
        AND FK_t_vc = :FK_t_vc
        AND FK_ds = :FK_ds
        AND FK_est_vc != 3
        LIMIT 1
    ");

    $stmtDuplicado->execute([
        ':FK_prs' => $FK_prs,
        ':FK_t_vc' => $FK_t_vc,
        ':FK_ds' => $FK_ds
    ]);

    if ($stmtDuplicado->fetch()) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'Ya existe esta vacuna y dosis para el paciente seleccionado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $evidencia_vc = '';

    if (isset($_FILES['archivo_evidencia_vc']) && $_FILES['archivo_evidencia_vc']['error'] !== UPLOAD_ERR_NO_FILE) {
        if ($_FILES['archivo_evidencia_vc']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode([
                'err' => true,
                'mensaje' => 'Error al subir la evidencia'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $maxSize = 5 * 1024 * 1024;

        if ($_FILES['archivo_evidencia_vc']['size'] > $maxSize) {
            echo json_encode([
                'err' => true,
                'mensaje' => 'La evidencia supera el tamaño máximo permitido de 5 MB'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $nombreOriginal = $_FILES['archivo_evidencia_vc']['name'];
        $extension = strtolower(pathinfo($nombreOriginal, PATHINFO_EXTENSION));

        $extensionesPermitidas = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];

        if (!in_array($extension, $extensionesPermitidas, true)) {
            echo json_encode([
                'err' => true,
                'mensaje' => 'Formato de evidencia no permitido'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($_FILES['archivo_evidencia_vc']['tmp_name']);

        $mimesPermitidos = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!in_array($mime, $mimesPermitidos, true)) {
            echo json_encode([
                'err' => true,
                'mensaje' => 'El tipo de archivo no coincide con los formatos permitidos'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $directorio = __DIR__ . '/../../RESULTADOS/SALUD/VACUNAS/';

        if (!is_dir($directorio)) {
            mkdir($directorio, 0775, true);
        }

        $nombreSeguro = 'vacuna_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
        $rutaDestino = $directorio . $nombreSeguro;

        if (!move_uploaded_file($_FILES['archivo_evidencia_vc']['tmp_name'], $rutaDestino)) {
            echo json_encode([
                'err' => true,
                'mensaje' => 'No se pudo guardar la evidencia'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $evidencia_vc = 'RESULTADOS/SALUD/VACUNAS/' . $nombreSeguro;
    }

    $sqlInsert = "
        INSERT INTO vacuna (
            FK_t_vc,
            FK_prs,
            FK_ds,
            FK_mc,
            fc_vc,
            evidencia_vc,
            FK_est_vc
        ) VALUES (
            :FK_t_vc,
            :FK_prs,
            :FK_ds,
            :FK_mc,
            :fc_vc,
            :evidencia_vc,
            :FK_est_vc
        )
    ";

    $stmtInsert = $pdoSalud->prepare($sqlInsert);

    $stmtInsert->execute([
        ':FK_t_vc' => $FK_t_vc,
        ':FK_prs' => $FK_prs,
        ':FK_ds' => $FK_ds,
        ':FK_mc' => $FK_mc,
        ':fc_vc' => $fc_vc,
        ':evidencia_vc' => $evidencia_vc,
        ':FK_est_vc' => $FK_est_vc
    ]);

    echo json_encode([
        'err' => false,
        'mensaje' => 'Vacuna registrada correctamente'
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al registrar vacuna'
    ], JSON_UNESCAPED_UNICODE);
}