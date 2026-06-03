<?php
declare(strict_types=1);

// Código HTTP correcto
http_response_code(403);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>403 | Acceso denegado</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        :root {
            --bg: #0f172a;
            --card: #020617;
            --text: #e5e7eb;
            --muted: #94a3b8;
            --accent: #ef4444;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body {
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            background: var(--card);
            border-radius: 12px;
            padding: 32px 36px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0,0,0,.45);
            text-align: center;
        }

        .code {
            font-size: 72px;
            font-weight: 800;
            color: var(--accent);
            line-height: 1;
        }

        h1 {
            font-size: 22px;
            margin: 16px 0 8px;
        }

        p {
            font-size: 14px;
            color: var(--muted);
            line-height: 1.6;
        }

        a {
            display: inline-block;
            margin-top: 22px;
            padding: 10px 18px;
            border-radius: 8px;
            background: transparent;
            border: 1px solid var(--muted);
            color: var(--text);
            text-decoration: none;
            font-size: 14px;
            transition: all .2s ease;
        }

        a:hover {
            background: var(--accent);
            border-color: var(--accent);
        }
    </style>
</head>

<body>
    <div class="card">
        <div class="code">403</div>
        <h1>Acceso denegado</h1>
        <p>
            No tienes permisos para acceder a este recurso.<br>
            Si crees que esto es un error, contacta al administrador.
        </p>

        <a href="/KLUSSA/">Volver al inicio</a>
    </div>
</body>
</html>
