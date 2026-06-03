<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=control_consumo_energia_" . date('Y-m-d_H-i-s') . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

// Data
$llenar_tabla = isset($_POST['data'])
    ? json_decode($_POST['data'], true)
    : [];

// BOM UTF-8
echo "\xEF\xBB\xBF";
?>

<style>
    body {
        font-family: Arial, sans-serif;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    .titulo {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #002060;
        padding: 10px;
    }

    .subtitulo {
        background-color: #002060;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        padding: 6px;
        border: 1px solid #002060;
    }

    .info-doc {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #002060;
    }

    th {
        background-color: #002060;
        color: white;
        border: 1px solid #002060;
        padding: 6px;
        font-size: 12px;
        text-align: center;
    }

    td {
        border: 1px solid #002060;
        padding: 5px;
        font-size: 12px;
        text-align: center;
        background-color: #f7fbff;
    }
</style>

<!-- ENCABEZADO -->
<table>
    <tr>
        <td rowspan="2" style="width:120px; text-align:center; border:1px solid #002060;">
            <img src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png" width="90">
        </td>

        <td class="titulo" colspan="5">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="info-doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="5">
            CONTROL DE CONSUMO DE ENERGÍA ELÉCTRICA SEDE
        </td>
    </tr>
</table>

<br>

<!-- TABLA DE DATOS -->
<table>
    <thead>
        <tr>
            <th>FECHA DE INICIO</th>
            <th>FECHA DE CORTE MENSUAL</th>
            <th>MES</th>
            <th>CONSUMO KWH</th>
            <th colspan="3" >PROYECTO</th>
        </tr>
    </thead>

    <tbody>
        <?php if (!empty($llenar_tabla)): ?>
            <?php foreach ($llenar_tabla as $item): ?>
                <tr>
                    <td><?= $item['fi'] ?? '' ?></td>
                    <td><?= $item['fn'] ?? '' ?></td>
                    <td><?= $item['mes'] ?? '' ?></td>
                    <td><?= $item['c'] ?? '' ?></td>
                    <td colspan="3"><?= $item['pro'] ?? '' ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else: ?>
            <tr>
                <td colspan="5">SIN REGISTROS</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>
