<?php
   
session_start();

// Validar sesión
if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    header("Location: ../");
    exit();
}

      // Obtener datos
      $usuario  = $_SESSION['user']['username'];
      $nombre   = $_SESSION['user']['nombre'];
      $apellido = $_SESSION['user']['apellido'];
      $rol      = $_SESSION['user']['rol'];
      $USUARIO = $_SESSION['user']['username'];

   require_once('../TEMP-RES/header.php');
   require_once('../INTERFACE/c_agua_sedes.php');
   require_once('../TEMP-RES/footer.php');
   
   
?>