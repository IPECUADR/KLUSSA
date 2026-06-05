<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Ingreso al Sistema SSA</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

body{
    min-height:100vh;
    background: linear-gradient(135deg,#0f172a,#1e3a5f,#1c6b8f);
    display:flex;
    align-items:center;
    justify-content:center;
    font-family: 'Segoe UI', sans-serif;
}

.login-card{
    border:none;
    border-radius:25px;
    overflow:hidden;
    backdrop-filter: blur(10px);
    background:#fff;
    box-shadow:
        0 20px 50px rgba(0,0,0,.15),
        0 10px 25px rgba(0,0,0,.10);
}

.left-panel{
    background: linear-gradient(
        160deg,
        #0d6efd,
        #0dcaf0
    );
    color:white;
    position:relative;
}

.left-panel::before{
    content:'';
    position:absolute;
    width:350px;
    height:350px;
    border-radius:50%;
    background:rgba(255,255,255,.08);
    top:-100px;
    right:-120px;
}

.left-panel::after{
    content:'';
    position:absolute;
    width:250px;
    height:250px;
    border-radius:50%;
    background:rgba(255,255,255,.05);
    bottom:-80px;
    left:-80px;
}

.logo-circle{
    width:110px;
    height:110px;
    border-radius:50%;
    background:rgba(255,255,255,.15);
    display:flex;
    align-items:center;
    justify-content:center;
    margin:auto;
    font-size:50px;
}

.form-control{
    border-radius:12px;
    padding:12px;
    border:1px solid #dbe4ee;
}

.form-control:focus{
    box-shadow:0 0 0 .2rem rgba(13,110,253,.15);
    border-color:#0d6efd;
}

.btn-login{
    border-radius:12px;
    padding:12px;
    font-weight:600;
    background:linear-gradient(
        90deg,
        #0d6efd,
        #0dcaf0
    );
    border:none;
}

.btn-login:hover{
    transform:translateY(-2px);
    transition:.3s;
}

.system-title{
    font-weight:700;
    letter-spacing:.5px;
}

.subtitle{
    opacity:.9;
    font-size:.95rem;
}

@media(max-width:991px){

    .left-panel{
        display:none;
    }

}

</style>

</head>
<body>

<div class="container">

    <div class="row justify-content-center">

        <div class="col-lg-10">

            <div class="card login-card">

                <div class="row g-0">

                    <!-- PANEL IZQUIERDO -->

                    <div class="col-lg-5 left-panel">

                        <div class="h-100 d-flex flex-column justify-content-center text-center p-5">

                            <div class="logo-circle mb-4">
                                🦺
                            </div>

                            <h2 class="fw-bold">
                                Sistema SSA
                            </h2>

                            <p class="mt-3">
                                Gestión Integral de Seguridad,
                                Salud Ocupacional y Ambiente.
                            </p>

                            <small class="opacity-75">
                                Protección • Prevención • Cumplimiento
                            </small>

                        </div>

                    </div>

                    <!-- LOGIN -->

                    <div class="col-lg-7">

                        <div class="p-5">

                            <div class="text-center mb-4">

                                <h3 class="system-title">
                                    Bienvenido
                                </h3>

                                <p class="text-muted subtitle">
                                    Ingrese sus credenciales para continuar
                                </p>

                            </div>

                            <form>

                                <div class="mb-3">

                                    <label class="form-label">
                                        Usuario
                                    </label>

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Ingrese su usuario">

                                </div>

                                <div class="mb-4">

                                    <label class="form-label">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Ingrese su contraseña">

                                </div>

                                <div class="d-grid">

                                    <button
                                        class="btn btn-primary btn-login">

                                        Ingresar al Sistema

                                    </button>

                                </div>

                                <div class="text-center mt-4">

                                    <small class="text-muted">
                                        Seguridad · Salud · Ambiente
                                    </small>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

</body>
</html>