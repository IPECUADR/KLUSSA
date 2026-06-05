<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>KLUSSA | RESIDUOS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../CSS/res.css">

    <link rel="stylesheet" href="../CSS/klussa_content.css">
    
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
 <link rel="icon" type="image/x-icon" href="../IMAGE/pma.png">
</head>

<body>

  <input type="hidden" id="usuario_sistema" value ="<?php echo $USUARIO ?>">

  <input type="hidden" id="user_regitro_al">
  <input type="hidden" id="id_persona">

<header>
    <nav id="nav_systema" class="navbar navbar-dark fixed-top">

        <div class="container-fluid nav_dis">
              <a id="btn_home" class="navbar-brand" href="#">
                  <img src="https://kluane.itdospuntocero.net/PTH/IMG/logo2.png" class="logo-nav" alt="Logo">
                  KLUSSA <span class="modulo-sistema">| Módulo de Gestión de Residuos</span>
              </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="offcanvas offcanvas-end offcanvas-dark-custom text-bg-dark" id="offcanvasDarkNavbar">

                <div class="offcanvas-header">
                    <h5 id="offcanvasDarkNavbarLabel">
                        <span id="nombres"><i class="fas fa-tools"></i> GESTION HSE </span>
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>

                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" id="opciones_sys_qr">

                        <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="home_page">
                                <i class="fas fa-home"></i> HOME - KLUSSA
                            </a>
                        </li>

                        <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="residuos_peligrosos">
                                <i class="fa-solid fa-dumpster-fire"></i>  DESECHOS PELIGROSOS
                            </a>
                        </li>

                        <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="residuos_no_peligrosos">
                                <i class="fa-solid fa-recycle"></i> DESECHOS NO PELIGROSOS
                            </a>
                        </li>
                         <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="c_agua_btn">
                                <i class="fas fa-tint"></i> CONSUMO | AGUA SEDES
                            </a>
                        </li>
                    
                        <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="c_combustible_btn">
                                <i class="fas fa-gas-pump"></i> CONSUMO | COMBUSTIBLE
                            </a>
                        </li>

                          <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="c_agua_pozo_btn">
                                <i class="fas fa-shower"></i> CONSUMO | AGUA POZOS
                            </a>
                        </li>

                        
                          <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="c_en_sedes_btn">
                                <i class="fas fa-charging-station"></i> CONSUMO | ENERGIA
                            </a>
                        </li>

                             <li class="nav-item px-2 mt-2 mb-2">
                            <a class="btn shadow col-12 p-2" id="btn_c_ad">
                               <i class="fas fa-vial"></i> CONSUMO | ADTIVOS
                            </a>
                        </li>




                      <li class="nav-item dropdown px-2 mt-2 mb-2" id="klussa_ad_des"></li>

                    </ul>
                </div>

            </div>

        </div>
    </nav>
</header>


<input type="hidden" id="user_name_online">