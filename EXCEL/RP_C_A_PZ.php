<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=bitacora_consumo_agua_" . date('Y-m-d_H-i-s') . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$data = isset($_POST['data']) ? json_decode($_POST['data'], true) : [];

echo "\xEF\xBB\xBF"; // BOM para Excel
?>

<style>
    body { font-family: Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; }

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

<!-- ================= ENCABEZADO ================= -->
<table>
    <tr>
        <td rowspan="2" style="width:120px;text-align:center;border:2px solid #002060;">
            <img src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png" width="90">
        </td>

        <td class="titulo" colspan="11">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="11">
            CONTROL DE CONSUMO DE AGUA
        </td>
    </tr>
</table>

<br>

<!-- ================= TABLA PRINCIPAL ================= -->
<table>
    <thead>
        <tr>
            <th rowspan="2">N°</th>
            <th rowspan="2">MES</th>
            <th rowspan="2">MÁQUINA</th>
            <th rowspan="2">PLATAFORMA</th>
            <th rowspan="2">POZO</th>
            <th rowspan="2">FECHA INICIO</th>
            <th rowspan="2">FECHA CORTE</th>
            <th colspan="2">TURNO DÍA</th>
            <th colspan="2">TURNO NOCHE</th>
            <th rowspan="2">CONSUMO (m³)</th>
            <th rowspan="2">CONSUMO (L)</th>
        </tr>
        <tr>
            <th>MED. INI</th>
            <th>MED. FIN</th>
            <th>MED. INI</th>
            <th>MED. FIN</th>
        </tr>
    </thead>

    <tbody>
        <?php
        $i = 1;
        $total_m3 = 0;
        $total_lt = 0;

        if (!empty($data)):
            foreach ($data as $item):
                $total_m3 += floatval($item['gal'] ?? 0);
                $total_lt += floatval($item['litros'] ?? 0);
        ?>
        <tr>
            <td><?= $i++ ?></td>
            <td><?= $item['mes'] ?? '' ?></td>
            <td><?= $item['maquina'] ?? '' ?></td>
            <td><?= $item['sede'] ?? '' ?></td>
            <td><strong><?= $item['pozo'] ?? '' ?></strong></td>
            <td><?= $item['fi'] ?? '' ?></td>
            <td><?= $item['fn'] ?? '' ?></td>

            <!-- TURNO DÍA -->
            <td><?= $item['dia_ini'] ?? '-' ?></td>
            <td><?= $item['dia_fin'] ?? '-' ?></td>

            <!-- TURNO NOCHE -->
            <td><?= $item['noche_ini'] ?? '-' ?></td>
            <td><?= $item['noche_fin'] ?? '-' ?></td>

            <!-- CONSUMOS -->
            <td><?= $item['gal'] ?? '' ?></td>
            <td><?= $item['litros'] ?? '' ?></td>
        </tr>
        <?php endforeach; ?>

        <tr class="total">
            <td colspan="11">TOTAL</td>
            <td><?= number_format($total_m3, 2) ?></td>
            <td><?= number_format($total_lt, 2) ?></td>
        </tr>

        <?php else: ?>
        <tr>
            <td colspan="13">SIN REGISTROS</td>
        </tr>
        <?php endif; ?>
    </tbody>
</table>
