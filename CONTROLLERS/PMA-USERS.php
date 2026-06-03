<?php
   

   session_start();

// Validar sesión de usuario
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    header("Location: ../");
    exit(); // Importante para detener el script
}

$USUARIO = $_SESSION['username'];

   require_once('../TEMPLATE/header.php');
   require_once('../TEMPLATE/nav.php');
   require_once('../TEMPLATE/aside.php');
   require_once('../INTERFACE/users.php');
   require_once('../TEMPLATE/footer.php');
   
   
?>