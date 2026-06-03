<?php
declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Protección de directorio
|--------------------------------------------------------------------------
| Este archivo evita el acceso directo al contenido del directorio
| y redirige al usuario al HOME de la aplicación.
| No modifica sesiones ni cookies.
*/

if (!headers_sent()) {
    header('Location: /KLUSSA/', true, 302);
}
exit;