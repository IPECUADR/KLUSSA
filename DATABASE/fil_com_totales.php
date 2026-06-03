<?php 


require('../CONFIG/sys.res.con.php');



$mes    = $_POST['mes']    ?? '';
$agencia   = $_POST['agencia']   ?? '';
$com = $_POST['com'] ?? '';
$mq = $_POST['mq'] ?? '';

$campo1 = $_POST['campo1'] ?? '';
$campo2 = $_POST['campo2'] ?? '';
$campo3 = $_POST['campo3'] ?? '';
$campo4 = $_POST['campo4'] ?? '';



// Inicializar array de filtros
$filtros = [];

// Lista de campos y valores recibidos
$entradas = [
    ['campo' => $campo1, 'valor' => $mes],
    ['campo' => $campo2, 'valor' => $agencia],
    ['campo' => $campo3, 'valor' => $com],
    ['campo' => $campo4, 'valor' => $mq]
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

      ROUND(SUM(con_lit_vh_ag), 2) AS  t_litros,  
      ROUND(SUM(con_gal_vh_ag), 2) AS t_galones, 

      ROUND(SUM(con_gal_vh_ag) * 0.00378541, 2) AS t_m3


      FROM 

         c_co_vh_ag, 
         mes

      WHERE

         mes.PK_mes = c_co_vh_ag.FK_mes
         $ex_where

      

      
      ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        't_litros'=> $row['t_litros'],
                        't_galones'=> $row['t_galones'],
                        't_m3'=> $row['t_m3']
                  
                     );

                  }
                  if(isset($json[0]['t_litros'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>