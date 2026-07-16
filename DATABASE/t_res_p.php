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
$campo5 = $_POST['campo5'] ?? '';



// Inicializar array de filtros
$filtros = [];

// Lista de campos y valores recibidos
$entradas = [
    ['campo' => $campo1, 'valor' => $mes],
    ['campo' => $campo2, 'valor' => $tipo],
    ['campo' => $campo3, 'valor' => $codigo],
    ['campo' => $campo4, 'valor' => $agencia],
    ['campo' => $campo5, 'valor' => $rhomb] // Entrada para clasificación RHOMB victor Alvarez
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





$query="


        SELECT
            ROUND(SUM(dispocicion.ct_kg), 2) AS t_kg, 
            ROUND(SUM(dispocicion.ct_tn), 2) AS t_tn, 
            ROUND(SUM(dispocicion.ct_lit), 2) AS t_lit,
            ROUND(SUM(dispocicion.ct_gl), 2) AS t_gl,
            ROUND(SUM(dispocicion.ct_gestor_des), 2) AS t_ges, 
            ROUND(SUM(dispocicion.ct_trasporte_des), 2) AS t_trs, 
            ROUND(SUM(dispocicion.ct_total_des), 2) AS gasto
            
            
        FROM
            dispocicion, 
            residuos
        WHERE
            residuos.id_res = dispocicion.FK_res
            AND residuos.FK_clf_res = 1
            $ex_where

        ORDER BY fc_disp DESC
      
        /* Peligrosos */
    ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                           't_kg'           => $row['t_kg'],
                           't_tn'           => $row['t_tn'],
                           't_lit'          => $row['t_lit'],
                           't_gl'           => $row['t_gl'],
                           't_ges'          => $row['t_ges'],
                           't_trs'          => $row['t_trs'],
                           'gasto'          => $row['gasto']
                      

                     


                     );

                  }
                  if(isset($json[0]['gasto'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>