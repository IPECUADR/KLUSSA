<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) die('Sin datos');

$data = json_decode($_POST['cp'], true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data) || empty($data)) {
    die('Datos inválidos');
}

/* ================= AGRUPAR PARA GRÁFICA ================= */
$porMes = [];
foreach ($data as $r) {
    $mes = $r['mes_res'] ?? 'N/D';
    $porMes[$mes] = ($porMes[$mes] ?? 0) + 1;
}

/* ================= PDF ================= */
class PDF extends FPDF {

    function Header(){
        $this->SetFillColor(245,247,250);
        $this->Rect(0,0,210,35,'F');

        $logo = __DIR__ . '/../IMAGE/kde.png';
        if (file_exists($logo)) {
            $this->Image($logo,12,7,22);
        }

        $this->SetFont('Arial','B',14);
        $this->SetXY(40,10);
        $this->Cell(130,7,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),0,2,'C');

        $this->SetFont('Arial','',10);
        $this->Cell(130,6,utf8_decode('Disposición de Residuos'),0,0,'C');

        $this->SetFont('Arial','I',8);
        $this->SetXY(170,10);
        $this->MultiCell(35,4,"EC-HSE-F-54\nREV-1\n2024",0,'R');

        $this->Line(10,35,200,35);
        $this->Ln(20);
    }

    function Section($title){
        $this->SetFillColor(0,70,140);
        $this->SetTextColor(255);
        $this->SetFont('Arial','B',11);
        $this->Cell(0,8,utf8_decode("  $title"),0,1,'L',true);
        $this->SetTextColor(0);
        $this->Ln(3);
    }

    function Card($x,$y,$w,$h,$title,$value){
        $this->SetFillColor(245,247,250);
        $this->Rect($x,$y,$w,$h,'F');
        $this->Rect($x,$y,$w,$h);

        $this->SetXY($x,$y+5);
        $this->SetFont('Arial','',9);
        $this->Cell($w,5,utf8_decode($title),0,2,'C');

        $this->SetFont('Arial','B',16);
        $this->Cell($w,8,$value,0,0,'C');
    }

    /* ===== GRÁFICA DE BARRAS ===== */
    function BarChart($x,$y,$w,$h,$data){
        $max = max($data);
        $barW = $w / count($data);

        $this->SetDrawColor(200);
        $this->Rect($x,$y,$w,$h);

        $i = 0;
        foreach ($data as $label => $val) {
            $barH = ($val / $max) * ($h - 15);
            $bx = $x + ($i * $barW) + 5;
            $by = $y + $h - $barH - 10;

            $this->SetFillColor(60,130,200);
            $this->Rect($bx,$by,$barW-10,$barH,'F');

            $this->SetFont('Arial','',7);
            $this->SetXY($bx,$y+$h-8);
            $this->Cell($barW-10,4,$label,0,0,'C');

            $this->SetXY($bx,$by-5);
            $this->Cell($barW-10,4,$val,0,0,'C');

            $i++;
        }
    }
}

/* ================= GENERAR ================= */
$pdf = new PDF();
$pdf->SetAutoPageBreak(true,20);

/* ===== PORTADA / RESUMEN ===== */
$pdf->AddPage();

$pdf->Card(20,50,50,25,'REGISTROS',count($data));
$pdf->Card(80,50,50,25,'MESES',count($porMes));
$pdf->Card(140,50,50,25,'GESTORES',count(array_unique(array_column($data,'gestor_res'))));

$pdf->Ln(90);

/* ===== GRÁFICA ===== */
$pdf->Section('RESIDUOS POR MES');
$pdf->BarChart(20,100,170,60,$porMes);
$pdf->Ln(70);

/* ===== TABLA ===== */
$pdf->Section('REGISTROS GENERALES');

$pdf->SetFont('Arial','B',9);
$pdf->SetFillColor(230,235,245);

$pdf->Cell(10,8,'#',1,0,'C',true);
$pdf->Cell(25,8,'Mes',1,0,'C',true);
$pdf->Cell(30,8,'Fecha',1,0,'C',true);
$pdf->Cell(30,8,'Proyecto',1,0,'C',true);
$pdf->Cell(50,8,utf8_decode('Clasificación RHOMB '),1,0,'C',true);
$pdf->Cell(35,8,'Gestor',1,1,'C',true);

$pdf->SetFont('Arial','',9);
$i = 1;

foreach ($data as $r) {
    $pdf->Cell(10,8,$i++,1);
    $pdf->Cell(25,8,$r['mes_res'],1);
    $pdf->Cell(30,8,$r['fc_disp'],1);
    $pdf->Cell(30,8,utf8_decode($r['proyecto']),1);
    $pdf->Cell(50,8,utf8_decode($r['clf_sis_r']),1);
    $pdf->Cell(35,8,utf8_decode($r['gestor_res']),1,1);
}

/* ===== SALIDA ===== */
header('Content-Type: application/pdf');
$pdf->Output('I','REPORTE_AMBIENTAL_GRAFICAS.pdf');
exit;
