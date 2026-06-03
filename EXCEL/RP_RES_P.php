<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=bitacora_residuos_" . date('Y-m-d_H-i-s') . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

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

    .titulo-principal {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #001f3f;
        padding: 10px;
    }

    .subtitulo {
        background-color: #002a5c;
        color: white;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        padding: 6px;
        border: 1px solid #001f3f;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
    }

    th {
        background-color: #002a5c;
        color: white;
        border: 1px solid #001f3f;
        padding: 5px;
        font-size: 12px;
        text-align: center;
    }

    td {
        border: 1px solid #001f3f;
        padding: 4px;
        font-size: 12px;
        text-align: center;
        background-color: #f4f9ff;
    }
</style>

<!-- ENCABEZADO SUPERIOR -->
<table>
    <tr>
        <td rowspan="2" style="width:120px; text-align:center; border:1px solid #001f3f;">
            <img src="https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png" width="90">
        </td>

        <td class="titulo-principal" colspan="14">
            BITÁCORA DE GESTIÓN AMBIENTAL
        </td>

        <td rowspan="2" style="width:500px; border:1px solid #001f3f; font-size:12px; text-align:center;">
            EC-HSE-F-53<br>
            REV-4<br>
            ENE-2024
        </td>
    </tr>

    <tr>
        <td class="subtitulo" colspan="15">
            BITÁCORA DE CONTROL RESIDUOS PELIGROSOS Y/O ESPECIALES
        </td>
    </tr>
</table>

<!-- TABLA DE DATOS -->
<table>
    <thead>
        <tr>
            <th>FECHA DE ENTREGA</th>
            <th>MES</th>
            <th>CÓDIGO<br>(AM 142)</th>
            <th>TIPO DE RESIDUO</th>
            <th>CANTIDAD<br>(KG)</th>
            <th>CANTIDAD<br>(TON.)</th>
            <th>CANTIDAD<br>(LITROS)</th>
            <th>CANTIDAD<br>(GALONES)</th>
            <th>PLATAFORMA</th>
            <th>MÁQUINA</th>
            <th>RESIDUO</th>
            <th>CRETIB</th>
            <th>CLASIFICACIÓN RHOMB</th>
            <th>EMPRESA GESTORA</th>
            <th>N° MANIFIESTO</th>
            <th>ENTREGADO POR<br>(NOMBRE Y APELLIDO)</th>
            <th>PROYECTO</th>
            
        </tr>
    </thead>

    <tbody>
        <?php foreach($llenar_tabla as $item): ?>
            <tr>
                <td><?= $item['fc_disp'] ?></td>
                <td><?= $item['mes_res'] ?></td>
                <td><?= $item['code_res'] ?></td>
                <td><?= $item['descrip_residuo'] ?></td>
                <td><?= $item['ct_kg'] ?></td>
                <td><?= $item['ct_tn'] ?></td>
                <td><?= $item['ct_lit'] ?></td>
                <td><?= $item['ct_gl'] ?></td>
                <td><?= $item['ubicacion'] ?></td>
                <td><?= $item['serie_maquina'] ?></td>
           
                <td><?= $item['clf_desechos'] ?></td>
                <td><?= $item['CRTIB'] ?></td>
                <td><?= $item['clf_sis_r'] ?></td>
               
                <td><?= $item['gestor_res'] ?></td>
                <td><?= $item['mnft'] ?></td>
                <td><?= $item['resp_des'] ?></td>
                <td><?= $item['proyecto'] ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
