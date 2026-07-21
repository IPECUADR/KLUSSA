<?php

header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header(
    "Content-Disposition: attachment; filename=EC-HSE-F-53-CONSUMO-ENERGIA-" .
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

function escapar($valor)
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
    }

    td {
        border: 1px solid #002060;
        padding: 5px;
        font-size: 12px;
        text-align: center;
        background-color: #f7fbff;
    }

    .total td {
        background-color: #dde6f5;
        font-weight: bold;
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
</style>

<!-- ENCABEZADO -->
<table>
    <tr>
        <td
            rowspan="2"
            style="width: 55px; text-align:center; vertical-align:middle; border:1px solid #002060;">
            <img
                src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png"
                width="60"
                alt="Kluane Drilling Ecuador">
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
            CONTROL DE CONSUMO DE ENERGÍA ELÉCTRICA EN SEDES
        </td>
    </tr>
</table>

<br>

<!-- TABLA DE DATOS -->
<table>
    <thead>
        <tr>
            <th>N°</th>
            <th>FECHA DE INICIO</th>
            <th>FECHA DE CORTE MENSUAL</th>
            <th>MES</th>
            <th>CONSUMO (kWh)</th>
            <th>AGENCIA</th>
            <th>RESPONSABLE</th>
        </tr>
    </thead>

    <tbody>
        <?php if (!empty($llenar_tabla)): ?>

            <?php
            $contador = 1;
            $totalKwh = 0;
            ?>

            <?php foreach ($llenar_tabla as $item): ?>

                <?php
                $consumo = (float) ($item['c'] ?? 0);
                $totalKwh += $consumo;
                ?>

                <tr>
                    <td class="numero">
                        <?= $contador++ ?>
                    </td>

                    <td class="fecha">
                        <?= escapar($item['fi'] ?? '') ?>
                    </td>

                    <td class="fecha">
                        <?= escapar($item['fn'] ?? '') ?>
                    </td>

                    <td>
                        <?= escapar(trim((string) ($item['mes'] ?? ''))) ?>
                    </td>

                    <td class="decimal">
                        <?= number_format($consumo, 2, '.', '') ?>
                    </td>

                    <td>
                        <?= escapar($item['pro'] ?? '') ?>
                    </td>

                    <td>
                        <?= escapar($item['p'] ?? '') ?>
                    </td>
                </tr>

            <?php endforeach; ?>

            <tr class="total">
                <td colspan="4">
                    TOTAL
                </td>

                <td class="decimal">
                    <?= number_format($totalKwh, 2, '.', '') ?>
                </td>

                <td colspan="2">
                    REGISTROS: <?= count($llenar_tabla) ?>
                </td>
            </tr>

        <?php else: ?>

            <tr>
                <td colspan="7">
                    SIN REGISTROS
                </td>
            </tr>

        <?php endif; ?>
    </tbody>
</table>