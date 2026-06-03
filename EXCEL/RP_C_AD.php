<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=reporte_consumo_residuos_" . date('Y-m-d_H-i-s') . ".xls");
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

        <td class="titulo" colspan="8">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="info-doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="8">
            CONTROL DE CONSUMO DE ADITIVOS / RESIDUOS
        </td>
    </tr>
</table>

<br>

<!-- TABLA DE DATOS -->
<table>
    <thead>
        <tr>
            <th>N°</th>
            <th>FECHA</th>
            <th>MES</th>
            <th>MAQUINA</th>
            <th>POZO</th>
            <th>ADITIVO</th>
            <th>KG</th>
            <th>LT</th>
            <th>PROYECTOS</th>
            <th>RESPONSABLE</th>
        </tr>
    </thead>

    <tbody>
        <?php if (!empty($llenar_tabla)): ?>
            <?php $i = 1; ?>
            <?php foreach ($llenar_tabla as $item): ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><?= $item['fr'] ?? '' ?></td>
                    <td><?= $item['mes'] ?? '' ?></td>
                    <td><?= $item['mq'] ?? '' ?></td>
                    <td><?= $item['pz'] ?? '' ?></td>
                    <td><?= $item['ad'] ?? '' ?></td>
                    <td><?= $item['kg'] ?? '' ?></td>
                    <td><?= $item['lt'] ?? '' ?></td>
                    <td><?= $item['pro'] ?? '' ?></td>
                    <td><?= $item['rp'] ?? '' ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else: ?>
            <tr>
                <td colspan="10">SIN REGISTROS</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>
