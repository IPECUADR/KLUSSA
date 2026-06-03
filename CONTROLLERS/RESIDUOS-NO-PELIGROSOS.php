<?php
   

   session_start();

// Validar sesión de usuario
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    header("Location: ../");
    exit(); // Importante para detener el script
}

$USUARIO = $_SESSION['username'];

   require_once('../TEMP-RES/header.php');
   require_once('../INTERFACE/res_no_peli.php');
   require_once('../TEMP-RES/footer.php');
   
   
?>