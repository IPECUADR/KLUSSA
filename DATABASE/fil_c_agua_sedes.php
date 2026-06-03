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
  
  fc_in_ca_ag as fc_inicio, 
  fc_crt_ca_ag as fc_corte,
  mes_res as mes, 
  proyecto as sede,
  cm_m_c as m_cubicos, 
  cm_lit as litros,
  user_reg as usuario,
  PK_ca_ag as id


  from 
  
  c_agua_ag, 
  mes,
  proyectos
  
  WHERE
  
      mes.PK_mes = c_agua_ag.FK_mes
  AND proyectos.PK_pro  = c_agua_ag.FK_ag 

     $ex_where
   
   ORDER BY fc_corte DESC

  ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'fc_inicio'=> $row['fc_inicio'],
                        'fc_corte'=> $row['fc_corte'],
                        'mes'=> $row['mes'],
                        'sede'=> $row['sede'],
                        'm_cubicos'=> $row['m_cubicos'],
                        'litros'=> $row['litros'],
                        'usuario'=> $row['usuario'],
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