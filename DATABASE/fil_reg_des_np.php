<?php 

require('../CONFIG/sys.res.con.php');




$mes    = $_POST['mes']    ?? '';
$tipo   = $_POST['tipo']   ?? '';
$codigo = $_POST['codigo'] ?? '';
$agencia = $_POST['agencia'] ?? '';
$rhomb = $_POST['rhomb'] ?? ''; // Filtro de clasificación RHOMB agregado por Victor Alvarez

$campo1 = $_POST['campo1'] ?? '';
$campo2 = $_POST['campo2'] ?? '';
$campo3 = $_POST['campo3'] ?? '';
$campo4 = $_POST['campo4'] ?? '';
$campo5 = $_POST['campo5'] ?? ''; // Campo para clasificación RHOMB agregado por Victor Alvarez




// Inicializar array de filtros
$filtros = [];

// Lista de campos y valores recibidos
$entradas = [
    ['campo' => $campo1, 'valor' => $mes],
    ['campo' => $campo2, 'valor' => $tipo],
    ['campo' => $campo3, 'valor' => $codigo],
    ['campo' => $campo4, 'valor' => $agencia],
    ['campo' => $campo5, 'valor' => $rhomb], // Entrada para clasificación RHOMB
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





$query="SELECT *

            FROM
            dispocicion, 
            proyectos, 
            ubicacion, 
            residuos, 
            maquina, 
            gestor, 
            mes, 
            clf_sis_r, 
            clf_desechos, 
            t_residuo

      where

      proyectos.PK_pro = dispocicion.FK_pro
      and ubicacion.PK_ub = dispocicion.FK_ub
      and residuos.id_res = dispocicion.FK_res
      and  maquina.PK_maquina = dispocicion.FK_mq
      and gestor.PK_gestor = dispocicion.FK_gest
      and mes.PK_mes = dispocicion.FK_mes
      and clf_sis_r.PK_clf_sis_r = residuos.FK_clf_sis_r
      and clf_desechos.PK_clf_des = residuos.FK_clf_res
      and t_residuo.PK_t_res = residuos.FK_t_res
      and clf_desechos.PK_clf_des = 2
      $ex_where
       ORDER BY 
            mes.PK_mes ASC,
            proyectos.proyecto ASC,
            fc_disp ASC

    ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                           'fc_disp'           => $row['fc_disp'],
                           'PK_disp'           => $row['PK_disp'],
                           'des_des'           => $row['des_des'],
                           'resp_des'          => $row['resp_des'],
                           'mnft'              => $row['mnft'],
                           'cargo'             => $row['cargo'],
                           'proyecto'          => $row['proyecto'],       // en vez de ubicaion_rp
                           'provincia'         => $row['provincia'],      // en vez de elemnto_rp
                           'ubicacion'         => $row['ubicacion'],      // valor real
                           'code_res'          => $row['code_res'],
                           'descrip_residuo'   => $row['descrip_residuo'],
                           'serie_maquina'     => $row['serie_maquina'],
                           'des_vehiculo'         => $row['des_vehiculo'],
                           'ct_kg'             => $row['ct_kg'],
                           'ct_tn'             => $row['ct_tn'],
                           'ct_lit'            => $row['ct_lit'],
                           'ct_gl'             => $row['ct_gl'],
                          'ct_total_des'      => $row['ct_total_des'],
                           'ct_gestor_des'      => $row['ct_gestor_des'],
                           'ct_trasporte_des'   => $row['ct_trasporte_des'],
                           'gestor_res'        => $row['gestor_res'],
                           'mes_res'           => $row['mes_res'],
                           'clf_sis_r'         => $row['clf_sis_r'],
                           'clf_desechos'      => $row['clf_desechos'],
                           't_residuo'         => $row['t_residuo']


                     );

                  }
                  if(isset($json[0]['PK_disp'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>