<?php

header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header(
    "Content-Disposition: attachment; filename=EC-HSE-F-53-AGUA-POZOS-" .
    date('Y-m-d_H-i-s') .
    ".xls"
);
header("Pragma: no-cache");
header("Expires: 0");

$data = isset($_POST['data'])
    ? json_decode($_POST['data'], true)
    : array();

if (!is_array($data)) {
    $data = array();
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
        vertical-align: middle;
    }

    td {
        border: 1px solid #002060;
        padding: 5px;
        font-size: 11px;
        text-align: center;
        vertical-align: middle;
    }

    .total {
        font-weight: bold;
        background-color: #dde6f5;
    }

    .sin-registrar {
        color: #7f6000;
        background-color: #fff2cc;
    }

    .pozo {
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

<!-- ENCABEZADO INSTITUCIONAL -->
<table>
    <tr>
        <td
            rowspan="2"
            style="width:120px;text-align:center;border:2px solid #002060;"
        >
            <img
                src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png"
                width="90"
                alt="Kluane Drilling Ecuador"
            >
        </td>

        <td class="titulo" colspan="12">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" class="doc" style="width:160px;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="12">
            CONTROL DE CONSUMO DE AGUA POR POZOS
        </td>
    </tr>
</table>

<br>

<!-- TABLA PRINCIPAL -->
<table>
    <thead>
        <tr>
            <th rowspan="2">N°</th>
            <th rowspan="2">FECHA INICIO</th>
            <th rowspan="2">FECHA FIN</th>
            <th rowspan="2">MES</th>
            <th rowspan="2">MÁQUINA</th>
            <th rowspan="2">PLATAFORMA</th>
            <th rowspan="2">POZO</th>

            <th colspan="2">TURNO DÍA</th>
            <th colspan="2">TURNO NOCHE</th>

            <th rowspan="2">CONSUMO TOTAL (m³)</th>
            <th rowspan="2">CONSUMO EN LITROS</th>
            <th rowspan="2">PROYECTO</th>
        </tr>

        <tr>
            <th>MED. INICIAL</th>
            <th>MED. FINAL</th>
            <th>MED. INICIAL</th>
            <th>MED. FINAL</th>
        </tr>
    </thead>

    <tbody>
        <?php

        $contador = 1;
        $totalMetrosCubicos = 0;
        $totalLitros = 0;

        if (!empty($data)):

            foreach ($data as $item):

                $consumoMetrosCubicos = (float) ($item['gal'] ?? 0);
                $consumoLitros = (float) ($item['litros'] ?? 0);

                $totalMetrosCubicos += $consumoMetrosCubicos;
                $totalLitros += $consumoLitros;

                $plataforma = trim(
                    (string) ($item['plataforma'] ?? '')
                );

                $plataformaVisible = $plataforma !== ''
                    ? $plataforma
                    : 'SIN REGISTRAR';

                $clasePlataforma = $plataforma !== ''
                    ? ''
                    : 'sin-registrar';
        ?>

        <tr>
            <td class="numero">
                <?= $contador++ ?>
            </td>

            <td class="fecha">
                <?= esc($item['fi'] ?? '') ?>
            </td>

            <td class="fecha">
                <?= esc($item['fn'] ?? '') ?>
            </td>

            <td>
                <?= esc(trim((string) ($item['mes'] ?? ''))) ?>
            </td>

            <td>
                <?= esc($item['maquina'] ?? '') ?>
            </td>

            <td class="<?= $clasePlataforma ?>">
                <?= esc($plataformaVisible) ?>
            </td>

            <td class="pozo">
                <?= esc($item['pozo'] ?? '') ?>
            </td>

            <td class="numero">
                <?= esc($item['dia_ini'] ?? 0) ?>
            </td>

            <td class="numero">
                <?= esc($item['dia_fin'] ?? 0) ?>
            </td>

            <td class="numero">
                <?= esc($item['noche_ini'] ?? 0) ?>
            </td>

            <td class="numero">
                <?= esc($item['noche_fin'] ?? 0) ?>
            </td>

            <td class="decimal">
                <?= number_format($consumoMetrosCubicos, 2, '.', '') ?>
            </td>

            <td class="decimal">
                <?= number_format($consumoLitros, 2, '.', '') ?>
            </td>

            <td>
                <?= esc($item['proyecto'] ?? $item['sede'] ?? '') ?>
            </td>
        </tr>

        <?php
            endforeach;
        ?>

        <tr class="total">
            <td colspan="11">
                TOTAL
            </td>

            <td class="decimal">
                <?= number_format($totalMetrosCubicos, 2, '.', '') ?>
            </td>

            <td class="decimal">
                <?= number_format($totalLitros, 2, '.', '') ?>
            </td>

            <td>
                REGISTROS: <?= count($data) ?>
            </td>
        </tr>

        <?php else: ?>

        <tr>
            <td colspan="14">
                SIN REGISTROS
            </td>
        </tr>

        <?php endif; ?>
    </tbody>
</table>