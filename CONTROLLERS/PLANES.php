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

   require_once('../TEMPLATE/header.php');
   require_once('../TEMPLATE/nav.php');
   require_once('../TEMPLATE/aside.php');
   require_once('../INTERFACE/planes.php');
   require_once('../TEMPLATE/footer.php');
   
   
?>