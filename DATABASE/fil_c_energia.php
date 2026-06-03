<?php 


require('../CONFIG/sys.res.con.php');



// variables de busqueda 
$mes    = $_POST['mes']    ?? '';
$agencia   = $_POST['agencia']   ?? '';

// campos de busqueda 

$campo1 = $_POST['campo1'] ?? '';
$campo2 = $_POST['campo2'] ?? '';



// Inicializar array de filtros
$filtros = [];

// Lista de campos y valores recibidos
$entradas = [
    ['campo' => $campo1, 'valor' => $mes],
    ['campo' => $campo2, 'valor' => $agencia]
    
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

   fc_in_en_ag as fi, 
   fc_fn_en_ag as fn, 
   mes.mes_res as mes,
   proyectos.proyecto as pro,
   c_en_ag as c, 
   rp_rg_en_ag as p, 
   PK_c_en_ag as id


 FROM

      c_en_ag, 
      
      proyectos, 

      mes

 WHERE

      proyectos.PK_pro = c_en_ag.FK_ag 
      AND mes.PK_mes = c_en_ag.FK_mes 
      $ex_where

 ORDER BY

       FK_mes ASC";


	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'fi'=> $row['fi'],
                        'fn'=> $row['fn'],
                        'mes'=> $row['mes'],
                        'pro'=> $row['pro'],
                        'c'=> $row['c'],
                        'p'=> $row['p'], 
                         'id'=> $row['id']
                     

                     );

                  }
                  if(isset($json[0]['id'])){
                        echo json_encode($json);
                  }else{
                 echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>