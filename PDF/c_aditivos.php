<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) die('Sin datos');

$data = json_decode($_POST['cp'], true);
if (!is_array($data) || count($data) === 0) die('Datos inválidos');

/* ================= ORDENAR ================= */
usort($data, fn($a,$b)=>strtotime($a['fr']) <=> strtotime($b['fr']));

/* ================= AGRUPAR ================= */
$mensual = [];
foreach ($data as $r) {
    $mes = $r['mes'];
    if (!isset($mensual[$mes])) {
        $mensual[$mes] = ['mes'=>$mes,'kg'=>0,'lt'=>0];
    }
    $mensual[$mes]['kg'] += (float)$r['kg'];
    $mensual[$mes]['lt'] += (float)$r['lt'];
}
$mensual = array_values($mensual);

/* ================= PDF ================= */
class PDF extends FPDF {

    function Header(){
        // Fondo encabezado
        $this->SetFillColor(245,247,250);
        $this->Rect(0,0,210,32,'F');

        // Logo LOCAL
        $logo = __DIR__ . '/../IMAGE/kde.png';
        if (file_exists($logo)) {
            $this->Image($logo,12,6,22);
        }

        // Título
        $this->SetFont('Arial','B',14);
        $this->SetXY(40,8);
        $this->Cell(130,8,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),0,2,'C');

        // Subtítulo
        $this->SetFont('Arial','',10);
        $this->Cell(130,6,utf8_decode('CONTROL DE CONSUMO DE ADITIVOS'),0,0,'C');

        // Código
        $this->SetFont('Arial','I',8);
        $this->SetXY(170,8);
        $this->MultiCell(35,4,"EC-HSE-F-53\nREV-4\nENE-2024",0,'R');

        // Línea
        $this->SetDrawColor(180);
        $this->Line(10,32,200,32);

        $this->Ln(15);
    }

    function Section($title){
        $this->Ln(3);
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255);
        $this->SetFont('Arial','B',11);
        $this->Cell(0,8,utf8_decode("  $title"),0,1,'L',true);
        $this->SetTextColor(0);
        $this->Ln(2);
    }

    function Card($x,$y,$w,$h,$title,$value){
        $this->SetFillColor(245,247,250);
        $this->Rect($x,$y,$w,$h,'F');
        $this->SetDrawColor(220);
        $this->Rect($x,$y,$w,$h);

        $this->SetFont('Arial','',9);
        $this->SetXY($x+5,$y+5);
        $this->Cell($w-10,5,utf8_decode($title),0,2,'C');

        $this->SetFont('Arial','B',14);
        $this->Cell($w-10,8,$value,0,0,'C');
    }
}

/* ================= FUNCIONES ================= */
function chartMensual($pdf,$data){
    $x=20; $y=90; $w=170; $h=70;
    $max = max(array_column($data,'kg')) ?: 1;

    $gap=6;
    $bw = ($w-(count($data)+1)*$gap)/count($data);

    $pdf->Line($x,$y,$x,$y+$h);
    $pdf->Line($x,$y+$h,$x+$w,$y+$h);

    foreach($data as $i=>$r){
        $bh = ($r['kg']/$max)*($h-10);
        $bx = $x+$gap+$i*($bw+$gap);
        $by = $y+$h-$bh;

        $pdf->SetFillColor(0,112,192);
        $pdf->Rect($bx,$by,$bw,$bh,'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($bx,$y+$h+2);
        $pdf->Cell($bw,4,$r['mes'],0,0,'C');
    }
}

function tablaMensual($pdf,$data){
    $pdf->SetFont('Arial','B',10);
    $pdf->SetFillColor(230,235,245);
    $pdf->Cell(70,8,'MES',1,0,'C',true);
    $pdf->Cell(60,8,'TOTAL KG',1,0,'C',true);
    $pdf->Cell(60,8,'TOTAL LT',1,1,'C',true);

    $fill=false;
    foreach($data as $r){
        $pdf->SetFillColor(245,247,250);
        $pdf->SetFont('Arial','',10);
        $pdf->Cell(70,8,$r['mes'],1,0,'C',$fill);
        $pdf->Cell(60,8,number_format($r['kg'],2),1,0,'R',$fill);
        $pdf->Cell(60,8,number_format($r['lt'],2),1,1,'R',$fill);
        $fill=!$fill;
    }
}

/* ================= GENERAR ================= */
$pdf = new PDF();
$pdf->SetAutoPageBreak(true,20);

/* ===== RESUMEN ===== */
$pdf->AddPage();

$totalKg = array_sum(array_column($mensual,'kg'));
$totalLt = array_sum(array_column($mensual,'lt'));

$pdf->Card(20,45,50,25,'TOTAL KG',number_format($totalKg,2));
$pdf->Card(80,45,50,25,'TOTAL LT',number_format($totalLt,2));
$pdf->Card(140,45,50,25,'REGISTROS',count($data));

chartMensual($pdf,$mensual);

$pdf->Ln(85);
$pdf->Section('RESUMEN MENSUAL');
tablaMensual($pdf,$mensual);

/* ===== DETALLE ===== */
foreach($data as $r){
    $pdf->AddPage();
    $pdf->Section('DETALLE DE REGISTRO');

    $pdf->SetFont('Arial','',10);
    foreach([
        'Fecha'=>$r['fr'],'Mes'=>$r['mes'],'Máquina'=>$r['mq'],
        'Pozo'=>$r['pz'],'Aditivo'=>$r['ad'],
        'Consumo KG'=>$r['kg'],'Consumo LT'=>$r['lt'],
        'Proyecto'=>$r['pro'],'Responsable'=>$r['rp']
    ] as $k=>$v){
        $pdf->Cell(60,8,$k.':',0,0);
        $pdf->Cell(0,8,$v,0,1);
    }
}

/* ===== SALIDA ===== */
header('Content-Type: application/pdf');
$pdf->Output('I','REPORTE_CONSUMO_ADITIVOS.pdf');
exit;
