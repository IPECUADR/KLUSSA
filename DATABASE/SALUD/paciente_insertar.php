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
// Validar que el usuario tenga rol 6 (KLUSSA SALUD / PMA)
try {
    $hcl_num     = trim($_POST['hcl_num'] ?? '');
    $ci_prs      = trim($_POST['ci_prs'] ?? '');
    $nombre_prs  = trim($_POST['nombre_prs'] ?? '');
    $apellido_ps = trim($_POST['apellido_ps'] ?? '');
    $fc_nan_prc  = trim($_POST['fc_nan_prc'] ?? '');
    $FK_sexo_p   = trim($_POST['FK_sexo_p'] ?? '');
    $FK_g_sg     = trim($_POST['FK_g_sg'] ?? '');
    $FK_g_atn    = trim($_POST['FK_g_atn'] ?? '');
    $FK_cg       = trim($_POST['FK_cg'] ?? '');
    $FK_ag       = trim($_POST['FK_ag'] ?? '');
    $email_prs   = trim($_POST['email_prs'] ?? '');
    $num_cel_prs = trim($_POST['num_cel_prs'] ?? '');

    $camposObligatorios = [
        'N° HCL' => $hcl_num,
        'Cédula' => $ci_prs,
        'Nombres' => $nombre_prs,
        'Apellidos' => $apellido_ps,
        'Fecha de nacimiento' => $fc_nan_prc,
        'Sexo' => $FK_sexo_p,
        'Grupo sanguíneo' => $FK_g_sg,
        'Grupo de atención' => $FK_g_atn,
        'Cargo' => $FK_cg,
        'Agencia' => $FK_ag,
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

    if (!ctype_digit($hcl_num)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El N° HCL debe ser numérico'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!preg_match('/^[0-9A-Za-z]{5,15}$/', $ci_prs)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'La cédula o identificación no tiene un formato válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($email_prs !== '' && !filter_var($email_prs, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El email no tiene un formato válido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($num_cel_prs !== '' && !preg_match('/^[0-9]{7,10}$/', $num_cel_prs)) {
        echo json_encode([
            'err' => true,
            'mensaje' => 'El celular debe contener entre 7 y 10 dígitos'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $fechaNacimiento = new DateTime($fc_nan_prc);
    $hoy = new DateTime();
    $edad_prs = $hoy->diff($fechaNacimiento)->y;

    $validaciones = [
        [
            'sql' => 'SELECT PK_prs FROM persona WHERE hcl_num = :valor LIMIT 1',
            'valor' => $hcl_num,
            'mensaje' => 'Número de historia clínica repetido'
        ],
        [
            'sql' => 'SELECT PK_prs FROM persona WHERE ci_prs = :valor LIMIT 1',
            'valor' => $ci_prs,
            'mensaje' => 'Número de cédula repetido'
        ],
    ];

    if ($email_prs !== '') {
        $validaciones[] = [
            'sql' => 'SELECT PK_prs FROM persona WHERE email_prs = :valor LIMIT 1',
            'valor' => $email_prs,
            'mensaje' => 'Email repetido'
        ];
    }

    if ($num_cel_prs !== '') {
        $validaciones[] = [
            'sql' => 'SELECT PK_prs FROM persona WHERE num_cel_prs = :valor LIMIT 1',
            'valor' => $num_cel_prs,
            'mensaje' => 'Número celular repetido'
        ];
    }

    foreach ($validaciones as $validacion) {
        $stmt = $pdoSalud->prepare($validacion['sql']);
        $stmt->execute([
            ':valor' => $validacion['valor']
        ]);

        if ($stmt->fetch()) {
            echo json_encode([
                'err' => true,
                'mensaje' => $validacion['mensaje']
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    $sqlInsert = "
        INSERT INTO persona (
            hcl_num,
            nombre_prs,
            apellido_ps,
            ci_prs,
            email_prs,
            num_cel_prs,
            fc_nan_prc,
            edad_prs,
            FK_sexo_p,
            FK_cg,
            FK_g_atn,
            FK_ag,
            FK_est_p,
            FK_g_sg
        ) VALUES (
            :hcl_num,
            :nombre_prs,
            :apellido_ps,
            :ci_prs,
            :email_prs,
            :num_cel_prs,
            :fc_nan_prc,
            :edad_prs,
            :FK_sexo_p,
            :FK_cg,
            :FK_g_atn,
            :FK_ag,
            1,
            :FK_g_sg
        )
    ";

    $stmtInsert = $pdoSalud->prepare($sqlInsert);

    $stmtInsert->execute([
        ':hcl_num' => $hcl_num,
        ':nombre_prs' => mb_strtoupper($nombre_prs, 'UTF-8'),
        ':apellido_ps' => mb_strtoupper($apellido_ps, 'UTF-8'),
        ':ci_prs' => $ci_prs,
        ':email_prs' => $email_prs,
        ':num_cel_prs' => $num_cel_prs,
        ':fc_nan_prc' => $fc_nan_prc,
        ':edad_prs' => $edad_prs,
        ':FK_sexo_p' => $FK_sexo_p,
        ':FK_cg' => $FK_cg,
        ':FK_g_atn' => $FK_g_atn,
        ':FK_ag' => $FK_ag,
        ':FK_g_sg' => $FK_g_sg,
    ]);

    echo json_encode([
        'err' => false,
        'mensaje' => 'Paciente registrado correctamente'
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al registrar paciente'
    ], JSON_UNESCAPED_UNICODE);
}