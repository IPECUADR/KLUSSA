<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Error 404</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">

<style>

body{
    background: linear-gradient(135deg,#1e293b,#0f172a);
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family: 'Segoe UI', sans-serif;
    color:white;
}

.error-box{
    text-align:center;
    max-width:500px;
}

.error-number{
    font-size:120px;
    font-weight:800;
    letter-spacing:5px;
}

.error-icon{
    font-size:60px;
    margin-bottom:15px;
    color:#38bdf8;
}

.btn-back{
    padding:10px 25px;
    font-size:16px;
    border-radius:30px;
}

</style>
</head>

<body>

<div class="error-box">

    <div class="error-icon">
        <i class="bi bi-exclamation-triangle"></i>
    </div>

    <div class="error-number">
        404
    </div>

    <h4 class="mb-3">
       Recurso No Encontrado
    </h4>

    <p class="mb-4 text-light">
        El recurso que intentas acceder no existe o fue movido.
    </p>

    <a href="../web" class="btn btn-light btn-back">
        <i class="bi bi-arrow-left"></i> HOME
    </a>



</div>

</body>
</html>