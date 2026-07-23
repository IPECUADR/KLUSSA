<?php

header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header(
    "Content-Disposition: attachment; filename=EC-HSE-F-53-CONSUMO-ADITIVOS-" .
    date('Y-m-d_H-i-s') .
    ".xls"
);
header("Pragma: no-cache");
header("Expires: 0");

$llenar_tabla = isset($_POST['data'])
    ? json_decode($_POST['data'], true)
    : array();

if (!is_array($llenar_tabla)) {
    $llenar_tabla = array();
}

function esc($valor)
{
    return htmlspecialchars(
        (string) ($valor ?? ''),
        ENT_QUOTES,
        'UTF-8'
    );
}

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
        color: #ffffff;
        border: 1px solid #002060;
        padding: 6px;
        font-size: 12px;
        text-align: center;
        vertical-align: middle;
    }

    td {
        border: 1px solid #002060;
        padding: 5px;
        font-size: 12px;
        text-align: center;
        vertical-align: middle;
        background-color: #f7fbff;
    }

    .numero {
        mso-number-format: "0";
    }

    .decimal {
        mso-number-format: "0.00";
    }

    .fecha {
        mso-number-format: "yyyy-mm-dd";
    }

    .total td {
        background-color: #dde6f5;
        font-weight: bold;
    }
</style>

<!-- ENCABEZADO INSTITUCIONAL -->
<table>
    <tr>
        <td
            rowspan="2"
            style="width:120px; text-align:center; border:1px solid #002060;"
        >
            <img
                src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png"
                width="90"
                alt="Kluane Drilling Ecuador"
            >
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
            CONTROL DE CONSUMO DE ADITIVOS
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
            <th>MÁQUINA</th>
            <th>POZO</th>
            <th>ADITIVO</th>
            <th>KG</th>
            <th>LT</th>
            <th>PROYECTO</th>
            <th>RESPONSABLE</th>
        </tr>
    </thead>

    <tbody>
        <?php

        $contador = 1;
        $totalKilogramos = 0;
        $totalLitros = 0;

        if (!empty($llenar_tabla)):

            foreach ($llenar_tabla as $item):

                $kilogramos = (float) ($item['kg'] ?? 0);
                $litros = (float) ($item['lt'] ?? 0);

                $totalKilogramos += $kilogramos;
                $totalLitros += $litros;
        ?>

        <tr>
            <td class="numero">
                <?= $contador++ ?>
            </td>

            <td class="fecha">
                <?= esc($item['fr'] ?? '') ?>
            </td>

            <td>
                <?= esc(trim((string) ($item['mes'] ?? ''))) ?>
            </td>

            <td>
                <?= esc($item['mq'] ?? '') ?>
            </td>

            <td>
                <?= esc($item['pz'] ?? '') ?>
            </td>

            <td>
                <?= esc($item['ad'] ?? '') ?>
            </td>

            <td class="decimal">
                <?= number_format($kilogramos, 2, '.', '') ?>
            </td>

            <td class="decimal">
                <?= number_format($litros, 2, '.', '') ?>
            </td>

            <td>
                <?= esc($item['pro'] ?? '') ?>
            </td>

            <td>
                <?= esc($item['rp'] ?? '') ?>
            </td>
        </tr>

        <?php
            endforeach;
        ?>

        <tr class="total">
            <td colspan="6">
                TOTAL
            </td>

            <td class="decimal">
                <?= number_format($totalKilogramos, 2, '.', '') ?>
            </td>

            <td class="decimal">
                <?= number_format($totalLitros, 2, '.', '') ?>
            </td>

            <td colspan="2">
                REGISTROS: <?= count($llenar_tabla) ?>
            </td>
        </tr>

        <?php else: ?>

        <tr>
            <td colspan="10">
                SIN REGISTROS
            </td>
        </tr>

        <?php endif; ?>
    </tbody>
</table>