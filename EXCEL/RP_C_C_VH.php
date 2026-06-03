<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=bitacora_gestion_ambiental_" . date('Y-m-d_H-i-s') . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$data = isset($_POST['data']) ? json_decode($_POST['data'], true) : [];

echo "\xEF\xBB\xBF";
?>

<style>
    body { font-family: Arial, sans-serif; }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    .titulo {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border: 2px solid #002060;
        padding: 10px;
    }

    .subtitulo {
        background-color: #002060;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        font-size: 14px;
        padding: 6px;
        border: 2px solid #002060;
    }

    .doc {
        font-size: 11px;
        font-weight: bold;
        text-align: center;
        border: 2px solid #002060;
    }

    th {
        background-color: #002060;
        color: #ffffff;
        border: 1px solid #002060;
        padding: 6px;
        font-size: 11px;
        text-align: center;
    }

    td {
        border: 1px solid #002060;
        padding: 5px;
        font-size: 11px;
        text-align: center;
    }

    .total {
        font-weight: bold;
        background-color: #dde6f5;
    }
</style>

<!-- ENCABEZADO -->
<table>
    <tr>
        <td rowspan="2" style="width:120px;text-align:center;border:2px solid #002060;">
            <img src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png" width="90">
        </td>

        <td class="titulo" colspan="8">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="8">
            CONTROL DE CONSUMO DE COMBUSTIBLE
        </td>
    </tr>
</table>

<br>

<!-- TABLA -->
<table>
    <thead>
        <tr>
            <th>FECHA REGISTRO</th>
            <th>MES</th>
            <th>FUENTE DE CONSUMO</th>
            <th>CLASIFICACIÓN RHOMB</th>
            <th>N° IDENTIFICACIÓN<br>(Vehículo / Máquina)</th>
            <th>TIPO DE COMBUSTIBLE</th>
            <th>CANTIDAD (GAL)</th>
            <th>CANTIDAD (LITROS)</th>
            <th colspan="2">PROYECTO</th>
        </tr>
    </thead>

    <tbody>
        <?php
        $total_gal = 0;
        $total_lt  = 0;

        if (!empty($data)):
            foreach ($data as $item):
                $gal = floatval($item['gl'] ?? 0);
                $lt  = floatval($item['li'] ?? 0);

                $total_gal += $gal;
                $total_lt  += $lt;
        ?>
        <tr>
            <td><?= $item['fc'] ?? '' ?></td>
            <td><?= $item['mes'] ?? '' ?></td>
            <td><?= $item['vehiculo'] ?? '' ?></td>
            <td><?= $item['clf'] ?? '' ?></td>
            <td><?= $item['serie'] ?? '' ?></td>
            <td><?= $item['com'] ?? '' ?></td>
            <td><?= number_format($gal, 2) ?></td>
            <td><?= number_format($lt, 2) ?></td>
            <td colspan="2"><?= $item['ag'] ?? '' ?></td>
        </tr>
        <?php endforeach; ?>

        <tr class="total">
            <td colspan="6">TOTAL</td>
            <td><?= number_format($total_gal, 2) ?></td>
            <td><?= number_format($total_lt, 2) ?></td>
            <td></td>
        </tr>

        <?php else: ?>
        <tr>
            <td colspan="9">SIN REGISTROS</td>
        </tr>
        <?php endif; ?>
    </tbody>
</table>
