<?php
// Actualizar un registro de agua de pozo por Victor Alvarez
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

$fc_inicio = trim($_POST['fc_inicio'] ?? '');
$fc_cierre = trim($_POST['fc_cierre'] ?? '');

$mes = filter_input(INPUT_POST, 'mes', FILTER_VALIDATE_INT);
$maquina = filter_input(INPUT_POST, 'maquina', FILTER_VALIDATE_INT);
$ubicacion = filter_input(INPUT_POST, 'ubicacion', FILTER_VALIDATE_INT);
$agencia = filter_input(INPUT_POST, 'agencia', FILTER_VALIDATE_INT);

$plataforma = trim($_POST['plataforma'] ?? '');
$pozo = trim($_POST['pozo'] ?? '');
$responsable = trim($_POST['responsable'] ?? '');
$comentario = trim($_POST['comentario'] ?? '');

$dia_ini = filter_input(INPUT_POST, 'dia_ini', FILTER_VALIDATE_FLOAT);
$dia_fin = filter_input(INPUT_POST, 'dia_fin', FILTER_VALIDATE_FLOAT);
$noche_ini = filter_input(INPUT_POST, 'noche_ini', FILTER_VALIDATE_FLOAT);
$noche_fin = filter_input(INPUT_POST, 'noche_fin', FILTER_VALIDATE_FLOAT);

if (
    !$id ||
    $fc_inicio === '' ||
    $fc_cierre === '' ||
    !$mes ||
    !$maquina ||
    !$ubicacion ||
    !$agencia ||
    $plataforma === '' ||
    $pozo === '' ||
    $responsable === ''
) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Completa todos los campos obligatorios.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if ($fc_inicio > $fc_cierre) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'La fecha de inicio no puede ser mayor que la fecha de cierre.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if (
    $dia_ini === false ||
    $dia_fin === false ||
    $noche_ini === false ||
    $noche_fin === false
) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Las mediciones ingresadas no son válidas.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if (
    $dia_ini < 0 ||
    $dia_fin < 0 ||
    $noche_ini < 0 ||
    $noche_fin < 0
) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Las mediciones no pueden ser negativas.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if ($dia_fin < $dia_ini) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'La medición final del turno día no puede ser menor que la inicial.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if ($noche_fin < $noche_ini) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'La medición final del turno noche no puede ser menor que la inicial.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

$consumoDia = $dia_fin - $dia_ini;
$consumoNoche = $noche_fin - $noche_ini;

$totalMetrosCubicos = $consumoDia + $consumoNoche;
$totalLitros = $totalMetrosCubicos * 1000;

$query = "
    UPDATE c_ag_posos
    SET
        fc_in_p_c_ag_ps = ?,
        fc_fn_p_c_ag_ps = ?,
        FK_mes = ?,
        FK_maquina = ?,
        FK_ubicacion = ?,
        plataforma_c_ag_ps = ?,
        pozo_c_ag_ps = ?,
        t_d_md_in = ?,
        t_d_md_fn = ?,
        t_n_md_in = ?,
        t_n_md_fn = ?,
        cm_t_gl_c_ag_ps = ?,
        cm_t_li_c_ag_ps = ?,
        FK_pro = ?,
        user_rp_ca_ag_ps = ?,
        comts_c_ag_pz = ?
    WHERE PK_c_ag_ps = ?
";

$stmt = mysqli_prepare($con, $query);

if (!$stmt) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible preparar la actualización.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    'ssiiissddddddissi',
    $fc_inicio,
    $fc_cierre,
    $mes,
    $maquina,
    $ubicacion,
    $plataforma,
    $pozo,
    $dia_ini,
    $dia_fin,
    $noche_ini,
    $noche_fin,
    $totalMetrosCubicos,
    $totalLitros,
    $agencia,
    $responsable,
    $comentario,
    $id
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(
        array(
            'err' => false,
            'status' => 'success',
            'mensaje' => 'Registro actualizado correctamente.',
            'total_m3' => $totalMetrosCubicos,
            'total_litros' => $totalLitros
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible actualizar el registro.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_stmt_close($stmt);
mysqli_close($con);
