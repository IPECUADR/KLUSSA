<?php


require('../CONFIG/sys.res.con.php');

$mes     = $_POST['mes']    ?? '';
$agencia = $_POST['agencia']   ?? '';
$mq      = $_POST['mq'] ?? '';
$pozo    = trim($_POST['pozo'] ?? ''); // Filtro de pozo agregado por Victor Alvarez

$campo1 = $_POST['campo1'] ?? '';
$campo2 = $_POST['campo2'] ?? '';
$campo3 = $_POST['campo3'] ?? '';


// Inicializar array de filtros
$filtros = [];

// Lista de campos y valores recibidos
$entradas = [
    ['campo' => $campo1, 'valor' => $mes],
    ['campo' => $campo2, 'valor' => $agencia],
    ['campo' => $campo3, 'valor' => $mq]
];

// Recorrer cada entrada y armar filtros
foreach ($entradas as $e) {
    if (!empty($e['campo']) && !empty($e['valor'])) {
        // Escapar valor para seguridad
        $valor = mysqli_real_escape_string($con, $e['valor']);
        // Agregar filtro
        $filtros[] = "$e[campo] = '$valor'";
    }
}

// Convertir array de filtros en string concatenado con AND
$ex_where = '';
if (!empty($filtros)) {
    $ex_where = ' AND ' . implode(' AND ', $filtros);
}

// Agregar filtro de pozo solo si se proporciona por Victor Alvarez
if ($pozo !== '') {
    $pozoSeguro = mysqli_real_escape_string($con, $pozo);

    $ex_where .= "
        AND TRIM(c_ag_posos.pozo_c_ag_ps) = '$pozoSeguro'
    ";
}


$query = "SELECT 

      c_ag_posos.fc_in_p_c_ag_ps as fi,
      mes.mes_res as mes,
      c_ag_posos.pozo_c_ag_ps as ps,
      c_ag_posos.fc_fn_p_c_ag_ps as fn, 
      proyectos.proyecto as pro, 
      c_ag_posos.cm_t_gl_c_ag_ps as t_gl, 
      c_ag_posos.cm_t_li_c_ag_ps as t_l,
      c_ag_posos.PK_c_ag_ps as id, 
      c_ag_posos.t_d_md_in as dia_ini,
      c_ag_posos.t_d_md_fn as dia_fin,
      c_ag_posos.t_n_md_in as noche_ini,
      c_ag_posos.t_n_md_fn as noche_fin, 
      maquina.serie_maquina AS maquina,
      c_ag_posos.plataforma_c_ag_ps AS plataforma,
      proyectos.proyecto AS proyecto,
      c_ag_posos.FK_mes AS FK_mes,
      c_ag_posos.FK_maquina AS FK_maquina,
      c_ag_posos.FK_ubicacion AS FK_ubicacion,
      c_ag_posos.FK_pro AS FK_pro,
      c_ag_posos.user_rp_ca_ag_ps AS responsable,
      c_ag_posos.comts_c_ag_pz



 FROM

      ubicacion, 
      maquina, 
      proyectos, 
      c_ag_posos,
      mes

 WHERE

      ubicacion.PK_ub = c_ag_posos.FK_ubicacion
      AND maquina.PK_maquina = c_ag_posos.FK_maquina
      AND proyectos.PK_pro = c_ag_posos.FK_pro
      AND mes.PK_mes = c_ag_posos.FK_mes
      $ex_where
 ORDER BY
    c_ag_posos.fc_in_p_c_ag_ps ASC,
    c_ag_posos.fc_fn_p_c_ag_ps ASC,
    c_ag_posos.PK_c_ag_ps ASC
";


$result = mysqli_query($con, $query);



if ($result) {

    $json = array('err' => false);
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(

            'fi' => $row['fi'],
            'fn' => $row['fn'],
            'mes' => $row['mes'],
            'sede' => $row['pro'],
            'gal' => $row['t_gl'],
            'litros' => $row['t_l'],
            'id' => $row['id'],
            'pozo' => $row['ps'],
            'dia_ini' => $row['dia_ini'],
            'dia_fin' => $row['dia_fin'],
            'noche_ini' => $row['noche_ini'],
            'noche_fin' => $row['noche_fin'],
            // Agregar los nuevos campos al array JSON para que se devuelvan al frontend por victor Alvarez
            'maquina' => $row['maquina'],
            'plataforma' => $row['plataforma'],
            'proyecto' => $row['proyecto'],
            'FK_mes' => $row['FK_mes'],
            'FK_maquina' => $row['FK_maquina'],
            'FK_ubicacion' => $row['FK_ubicacion'],
            'FK_pro' => $row['FK_pro'],
            'responsable' => $row['responsable'],
            'comts_c_ag_pz' => $row['comts_c_ag_pz']
        );
    }
    if (isset($json[0]['id'])) {
        echo json_encode($json);
    } else {
        echo json_encode(array('err' => true, 'mensaje' => 'Ups. No tenemos nada que mostrarte!!'));
    }
} else {

    echo json_encode(array('err' => true, 'mensaje' => 'ERROR EN BDD '));
}


mysqli_close($con);
