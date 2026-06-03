<?php 


require('../CONFIG/sys.res.con.php');

$mes     = $_POST['mes']    ?? '';
$agencia = $_POST['agencia']   ?? '';
$mq      = $_POST['mq'] ?? '';

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


  $query="SELECT  

  ROUND(SUM(c_ag_posos.cm_t_gl_c_ag_ps), 2) AS t_gl_apz, 
  ROUND(SUM(c_ag_posos.cm_t_li_c_ag_ps), 2) AS t_lit_apz, 
  ROUND(SUM(c_ag_posos.cm_t_gl_c_ag_ps) / 264.172, 2) AS t_m3_apz

  FROM 
  
    c_ag_posos,
    mes 

   

  
  WHERE 

  
  mes.PK_mes = c_ag_posos.FK_mes
 
  $ex_where

 ";


	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                         't_gl_apz'=> $row['t_gl_apz'],
                         't_lit_apz'=> $row['t_lit_apz'],
                         't_m3_apz'=> $row['t_m3_apz']
                      
                

                     );

                  }
                  if(isset($json[0]['t_lit_apz'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>