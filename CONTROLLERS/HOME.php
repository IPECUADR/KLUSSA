<?php
   


session_start();

// Validar sesión de usuario
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    header("Location: ../");
    exit(); // Importante para detener el script
}

$USUARIO = $_SESSION['username'];

// Cargar plantillas de interfaz

require_once '../INTERFACE/home.php';


?>
  

   