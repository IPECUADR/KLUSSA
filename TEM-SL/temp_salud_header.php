<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KDE - SALUD OCUPACIONAL</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="../CSS/salud.css">

</head>

<body>

<div class="main-content">

<!-- NAVBAR -->
<nav class="navbar navbar-expand-lg navbar-custom">
<div class="container-fluid">

<a class="navbar-brand" href="#">
<div class="logo-box">KDE</div> SALUD OCUPACIONAL
</a>

<button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarNav">

<ul class="navbar-nav me-auto">

<li class="nav-item">
<a class="nav-link" href="#"><i class="fa fa-chart-line me-1"></i> Dashboard</a>
</li>

<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle"  href="#" data-bs-toggle="dropdown">
<i class="fa fa-user-injured me-1"></i> Pacientes
</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item" id="pacientesDropdown" ><i class="fa fa-list me-2"></i>Listado</a></li>
<li><a class="dropdown-item" href="#"><i class="fa fa-user-plus me-2"></i>Inactivos</a></li>
</ul>
</li>

<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle" id="consultasDropdown" href="#" data-bs-toggle="dropdown">
<i class="fa fa-stethoscope me-1"></i> Consultas
</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#"><i class="fa fa-notes-medical me-2"></i>Historial</a></li>
<li><a class="dropdown-item" href="#"><i class="fa fa-plus-circle me-2"></i>Nueva</a></li>
</ul>
</li>

<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
<i class="fa fa-file-medical me-1"></i> Reportes
</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#"><i class="fa fa-file-pdf me-2"></i>PDF</a></li>
<li><a class="dropdown-item" href="#"><i class="fa fa-file-excel me-2"></i>Excel</a></li>
</ul>
</li>

</ul>

<div class="dropdown">
<a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown">
<i class="fa fa-user-circle me-2"></i><span class="small">Administrador</span>
</a>
<ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item text-danger" href="#"><i class="fa fa-sign-out-alt me-2"></i>Cerrar sesión</a></li>
</ul>
</div>

</div>
</div>
</nav>
