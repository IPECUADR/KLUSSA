<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=bitacora_consumo_agua_sede_" . date('Y-m-d_H-i-s') . ".xls");
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

        <td class="titulo" colspan="7">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="7">
            CONTROL DE CONSUMO DE AGUA SEDE
        </td>
    </tr>
</table>

<br>

<!-- TABLA -->
<table>
    <thead>
        <tr>
            <th>N°</th>
            <th>MES</th>
            <th>CONSUMO (m³)</th>
            <th>CONSUMO (LITROS)</th>
            <th>FECHA DE INICIO</th>
            <th>FECHA DE CORTE</th>
            <th>SEDE / PROYECTO</th>
            <th colspan="2">RESPONSABLE</th>
        </tr>
    </thead>

    <tbody>
        <?php
        $i = 1;
        $total_m3 = 0;
        $total_lt = 0;

        if (!empty($data)):
            foreach ($data as $item):
                $total_m3 += floatval($item['m_cubicos'] ?? 0);
                $total_lt += floatval($item['litros'] ?? 0);
        ?>
        <tr>
            <td><?= $i++ ?></td>
            <td><?= $item['mes'] ?? '' ?></td>
            <td><?= $item['m_cubicos'] ?? '' ?></td>
            <td><?= $item['litros'] ?? '' ?></td>
            <td><?= $item['fc_inicio'] ?? '' ?></td>
            <td><?= $item['fc_corte'] ?? '' ?></td>
            <td><?= $item['sede'] ?? '' ?></td>
            <td colspan="2"><?= $item['usuario'] ?? '' ?></td>
        </tr>
        <?php endforeach; ?>
        <tr class="total">
            <td colspan="2">TOTAL</td>
            <td><?= number_format($total_m3, 2) ?></td>
            <td><?= number_format($total_lt, 2) ?></td>
            <td colspan="5"></td>
        </tr>
        <?php else: ?>
        <tr>
            <td colspan="9">SIN REGISTROS</td>
        </tr>
        <?php endif; ?>
    </tbody>
</table>
