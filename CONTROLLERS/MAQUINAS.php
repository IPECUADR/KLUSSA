<?php
   

   session_start();

// Validar sesión de usuario
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    header("Location: ../");
    exit(); // Importante para detener el script
}

$USUARIO = $_SESSION['username'];

   require_once('../TEMP-RES/header.php');
   require_once('../INTERFACE/a_maquina.php');
   require_once('../TEMP-RES/footer.php');
   
   
?>