<?php
// Reemplazo del anterior insert_c_energia.php para mejorar la seguridad y manejo de errores
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$fc_inicio = trim($_POST['fc_inicio'] ?? '');
$fc_cierre = trim($_POST['fc_cierre'] ?? '');
$responsable = trim($_POST['responsable'] ?? '');
$consumoTexto = trim($_POST['c_en'] ?? '');

$agencia = filter_input(
  INPUT_POST,
  'agencia',
  FILTER_VALIDATE_INT
);

$mes = filter_input(
  INPUT_POST,
  'mes',
  FILTER_VALIDATE_INT
);

if (
  $fc_inicio === '' ||
  $fc_cierre === '' ||
  !$agencia ||
  !$mes ||
  $consumoTexto === '' ||
  $responsable === ''
) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'Completa todos los campos obligatorios.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

if (
  strtotime($fc_inicio) === false ||
  strtotime($fc_cierre) === false
) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'Las fechas ingresadas no son válidas.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

if ($fc_inicio >= $fc_cierre) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' =>
      'La fecha de inicio debe ser menor que la fecha de cierre.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

if (!is_numeric($consumoTexto)) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'El consumo debe ser un valor numérico.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

$consumo = (float) $consumoTexto;

if ($consumo <= 0) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'El consumo debe ser mayor que cero.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

$queryDuplicado = "
    SELECT PK_c_en_ag
    FROM c_en_ag
    WHERE
        fc_in_en_ag = ?
        AND fc_fn_en_ag = ?
        AND FK_mes = ?
        AND FK_ag = ?
        AND c_en_ag = ?
    LIMIT 1
";

$stmtDuplicado = mysqli_prepare($con, $queryDuplicado);

if (!$stmtDuplicado) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'No fue posible verificar el registro.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

mysqli_stmt_bind_param(
  $stmtDuplicado,
  'ssiid',
  $fc_inicio,
  $fc_cierre,
  $mes,
  $agencia,
  $consumo
);

mysqli_stmt_execute($stmtDuplicado);

$resultadoDuplicado = mysqli_stmt_get_result($stmtDuplicado);
$registroDuplicado = mysqli_fetch_assoc($resultadoDuplicado);

mysqli_stmt_close($stmtDuplicado);

if ($registroDuplicado) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'Este consumo ya fue registrado.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

$queryInsertar = "
    INSERT INTO c_en_ag (
        fc_in_en_ag,
        fc_fn_en_ag,
        FK_mes,
        FK_ag,
        c_en_ag,
        rp_rg_en_ag
    ) VALUES (?, ?, ?, ?, ?, ?)
";

$stmtInsertar = mysqli_prepare($con, $queryInsertar);

if (!$stmtInsertar) {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' => 'No fue posible preparar el registro.'
    ),
    JSON_UNESCAPED_UNICODE
  );

  mysqli_close($con);
  exit;
}

mysqli_stmt_bind_param(
  $stmtInsertar,
  'ssiids',
  $fc_inicio,
  $fc_cierre,
  $mes,
  $agencia,
  $consumo,
  $responsable
);

if (mysqli_stmt_execute($stmtInsertar)) {
  echo json_encode(
    array(
      'err' => false,
      'mensaje' => 'Registrado exitosamente.'
    ),
    JSON_UNESCAPED_UNICODE
  );
} else {
  echo json_encode(
    array(
      'err' => true,
      'mensaje' =>
      'No se pudo completar el registro. Intente nuevamente.'
    ),
    JSON_UNESCAPED_UNICODE
  );
}

mysqli_stmt_close($stmtInsertar);
mysqli_close($con);
