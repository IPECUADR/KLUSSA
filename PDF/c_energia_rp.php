<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) die('Sin datos');

$data = json_decode($_POST['cp'], true);
if (!is_array($data) || count($data) === 0) die('Datos inválidos');

/* ===== ORDENAR POR FECHA ===== */
usort($data, function($a,$b){
    return strtotime($a['fi']) <=> strtotime($b['fi']);
});

/* ===== AGRUPAR CONSUMO GENERAL POR MES (CORRECTO) ===== */
$consumoMensual = [];

foreach ($data as $r) {
    $mes = $r['mes'];

    if (!isset($consumoMensual[$mes])) {
        $consumoMensual[$mes] = [
            'mes' => $mes,
            'c'   => 0
        ];
    }
    $consumoMensual[$mes]['c'] += (float)$r['c'];
}
$consumoMensual = array_values($consumoMensual);

/* ===== AGRUPAR POR PROYECTO ===== */
$proyectos = [];
foreach ($data as $r) {
    $pro = $r['pro'];
    if (!isset($proyectos[$pro])) {
        $proyectos[$pro] = ['total'=>0];
    }
    $proyectos[$pro]['total'] += (float)$r['c'];
}

/* ================= FUNCIONES ================= */

function headerGeneral($pdf){
    $pdf->SetFont('Arial','B',14);
    $pdf->SetFillColor(230,240,255);
    $pdf->SetDrawColor(180,180,180);

    $pdf->Cell(40,20,'',1,0,'C',true);
    $pdf->Cell(110,20,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),1,0,'C',true);
    $pdf->Cell(40,20,'',1,1,'C',true);

    if (file_exists('../IMAGE/kluane.png')) {
        $pdf->Image('../IMAGE/kluane.png',15,12,22);
    }

    $pdf->SetFont('Arial','I',9);
    $pdf->SetXY(160,15);
    $pdf->Cell(35,5,'EC-HSE-F-53',0,1,'C');
    $pdf->SetXY(160,20);
    $pdf->Cell(35,5,'REV-4 ENE-2024',0,1,'C');
}

function section($pdf,$title){
    $pdf->Ln(4);
    $pdf->SetFillColor(33,37,41);
    $pdf->SetTextColor(255);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(0,8,utf8_decode("  ".$title),1,1,'L',true);
    $pdf->SetTextColor(0);
    $pdf->Ln(2);
}

function field($pdf,$label,$value){
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(60,7,utf8_decode($label).':',0,0);
    $pdf->SetFont('Arial','',10);
    $pdf->MultiCell(0,7,utf8_decode($value),0);
}

/* ===== SEMÁFORO ===== */
function semaforoEstado($actual,$prev){
    if ($prev === null || $prev == 0) return ['—',[200,200,200]];
    $var = (($actual - $prev)/$prev)*100;
    if ($var > 10) return ['ALTO',[231,76,60]];
    if ($var > 0)  return ['MEDIO',[241,196,15]];
    return ['BAJO',[46,204,113]];
}

/* ===== GRÁFICA GENERAL ===== */
function drawBarChart($pdf,$data,$x=20,$y=70,$w=170,$h=60){
    $max = max(array_column($data,'c'));
    if ($max<=0) $max=1;

    $gap=4;
    $barW = ($w - (count($data)+1)*$gap) / count($data);

    $pdf->Line($x,$y,$x,$y+$h);
    $pdf->Line($x,$y+$h,$x+$w,$y+$h);

    foreach($data as $i=>$r){
        $bh = ($r['c']/$max)*($h-10);
        $bx = $x + $gap + $i*($barW+$gap);
        $by = $y+$h-$bh;

        $pdf->SetFillColor(52,152,219);
        $pdf->Rect($bx,$by,$barW,$bh,'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($bx,$y+$h+2);
        $pdf->MultiCell($barW,4,$r['mes'],0,'C');
    }

    $pdf->SetFont('Arial','B',10);
    $pdf->SetXY($x,$y-8);
    $pdf->Cell($w,6,'Consumo mensual general (kWh)',0,0,'C');
}

/* ===== GRÁFICA POR PROYECTO ===== */
function drawBarChartProyecto($pdf,$proyectos,$x=20,$y=70,$w=170,$h=60){
    $max = max(array_column($proyectos,'total'));
    if ($max<=0) $max=1;

    $gap=6;
    $count=count($proyectos);
    $barW = ($w - ($count+1)*$gap) / $count;

    $pdf->Line($x,$y,$x,$y+$h);
    $pdf->Line($x,$y+$h,$x+$w,$y+$h);

    $i=0;
    foreach($proyectos as $pro=>$p){
        $bh = ($p['total']/$max)*($h-10);
        $bx = $x + $gap + $i*($barW+$gap);
        $by = $y+$h-$bh;

        $pdf->SetFillColor(39,174,96);
        $pdf->Rect($bx,$by,$barW,$bh,'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($bx,$y+$h+2);
        $pdf->MultiCell($barW,4,$pro,0,'C');
        $i++;
    }
}

/* ===== TABLA COMPARATIVA GENERAL ===== */
function tablaComparativa($pdf,$data){
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(45,8,'Mes',1);
    $pdf->Cell(45,8,'Consumo (kWh)',1);
    $pdf->Cell(45,8, utf8_decode('Variación %'),1);
    $pdf->Cell(45,8,'Estado',1,1,'C');

    $prev=null;
    foreach($data as $r){
        [$estado,$color]=semaforoEstado($r['c'],$prev);

        $var='—';
        if($prev!==null && $prev>0){
            $var=number_format((($r['c']-$prev)/$prev)*100,2).' %';
        }

        $pdf->SetFont('Arial','',10);
        $pdf->Cell(45,8,$r['mes'],1);
        $pdf->Cell(45,8,number_format($r['c'],2),1);
        $pdf->Cell(45,8,utf8_decode($var),1,0,'C');

        $pdf->SetFillColor(...$color);
        $pdf->Cell(45,8,utf8_decode($estado),1,1,'C',true);

        $prev=$r['c'];
    }
}

/* ================= PDF ================= */

$pdf=new FPDF('P','mm','A4');
$pdf->SetAutoPageBreak(true,25);

/* ===== RESUMEN GENERAL ===== */
$pdf->AddPage();
headerGeneral($pdf);


$pdf->Ln(25);
$pdf->SetFillColor(33,37,41);
$pdf->SetTextColor(255);
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,8,utf8_decode('CONTROL DE CONSUMO DE ENERGÍA ELÉCTRICA'),0,1,'L',true);
$pdf->SetTextColor(0);

drawBarChart($pdf,$consumoMensual);
$pdf->Ln(75);

section($pdf,'CONSUMO TOTAL POR PROYECTO');
drawBarChartProyecto($pdf,$proyectos,20,$pdf->GetY()+5);

$pdf->Ln(75);
section($pdf,'COMPARATIVO GENERAL MENSUAL');
tablaComparativa($pdf,$consumoMensual);

/* ===== DETALLE POR REGISTRO ===== */
$prev=null;
foreach($data as $r){
    $pdf->AddPage();
    headerGeneral($pdf);

    section($pdf,'DETALLE DE CONSUMO');
    field($pdf,'Mes',$r['mes']);
    field($pdf,'Proyecto',$r['pro']);
    field($pdf,'Responsable',$r['p']);
    field($pdf,'Periodo',$r['fi'].' al '.$r['fn']);
    field($pdf,'Consumo (kWh)',number_format($r['c'],2));

    [$estado,$color]=semaforoEstado($r['c'],$prev);
    $pdf->SetFillColor(...$color);
    $pdf->Cell(0,8,'ESTADO DE CONSUMO: '.utf8_decode($estado),1,1,'C',true);

    $prev=$r['c'];
}

/* ===== SALIDA ===== */
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="CONTROL_CONSUMO_ENERGIA_GENERAL.pdf"');
$pdf->Output('I');
exit;
