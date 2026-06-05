<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Ingreso al Sistema SSA</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="CSS/login.css">



</head>
<body>

<div class="login-card row g-0">

    <!-- PANEL IZQUIERDO -->
    <div class="col-md-5 left">

        <div class="logo">🦺</div>

        <h2 class="fw-bold">KLUSSA</h2>

        <p class="mt-3">
            Control moderno de Seguridad,
            Salud y Ambiente.
        </p>

        

    </div>

    <!-- FORM -->
    <div class="col-md-7 form-section">

        <h3 class="title mb-2 text-center">
          KLUANE DRILLING EC 
        </h3>

        <p class="sub text-center mb-4">
            Ingresa tus credenciales
        </p>

        <form>

            <div class="input-group">
                <i class="fa fa-user"></i>
                <input type="text" placeholder="Usuario" id="imp_user">
            </div>

            <div class="input-group">
                <i class="fa fa-lock"></i>
                <input type="password" placeholder="Contraseña" id="imp_pass">
            </div>

           

        </form>


         <button id="btn_login" class="btn-login mt-3">
                Ingresar
            </button>

        <div class="text-center mt-4">
            <small class="text-muted">
                KLUANE ECUADOR  © DERECHOS RESERVADOS 2024
            </small>
        </div>

    </div>

</div>


    <script src="LIB/jquery.min.js"></script>
    <script src="LIB/sweetalert.js"></script>
    <script src="JS/login.js"></script>


</body>
</html>