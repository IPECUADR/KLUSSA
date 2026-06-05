<?php
/// restriccion de acceso desde navegador




// Obtener ruta
$ruta = $_GET['ruta'] ?? 'home';

// Definir rutas
$rutas = [
    'login' => 'INTERFACE/login.view.php',
    'logout' => '../controller/log_out.php',
    'roles' => '../controller/rol.php',
    'home' => '../CONTROLLERS/HOME.php',
    'perfil' => '../controller/perfil.php',
    'configuracion' => '../controller/configuracion.php',
    

    'verificar' => '../db/recuperar.php',
    'mail' => '../mail/mail.php',
    'total_personas' => '../db/ct_personas.php',
    'total_roles' => '../db/ct_roles.ad.php', 
    'total_aceptaciones' => '../db/ct_aceptaciones.php', 
    'validate' => '../views/kluane.info.php', 
    'token_validate' => '../db/validate_change.php', 
    'cambio' => '../db/up_pas_rcp.php'
 


   
  
];



// Validar ruta
if (array_key_exists($ruta, $rutas)) {
    require $rutas[$ruta];
} else {
    require '../INTERFACE/404.php';
}