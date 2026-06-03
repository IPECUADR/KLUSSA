<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) {
    die('Sin datos');
}

$r = json_decode($_POST['cp'], true);
if (!is_array($r)) {
    die('Datos inválidos');
}

class PDF extends FPDF
{
   function Header()
{
    /* ===== FONDO TENUE ===== */
    $this->SetFillColor(245,248,252); // azul/gris muy suave
    $this->Rect(0,0,210,34,'F');

    /* ===== LOGO ===== */
    if (file_exists('../IMAGE/kde.png')) {
        $this->Image('../IMAGE/kde.png',12,8,22);
    }

    /* ===== TÍTULO CENTRADO ===== */
    $this->SetFont('Arial','B',15);
    $this->SetTextColor(33,37,41);
    $this->SetXY(10,13);
    $this->Cell(0,8,utf8_decode('CONSUMO DE ENERGÍA ELÉCTRICA'),0,1,'C');

    /* ===== CÓDIGO DOCUMENTO ===== */
    $this->SetFont('Arial','I',9);
    $this->SetTextColor(90,90,90);
    $this->SetXY(160,14);
    $this->Cell(35,5,'EC-HSE-F-53',0,1,'R');

    /* ===== LÍNEA SEPARADORA ===== */
    $this->SetDrawColor(200,200,200);
    $this->Line(10,34,200,34);

    /* ===== RESET ===== */
    $this->SetTextColor(0);
    $this->Ln(24);
}


    function section($title)
    {
        $this->SetFillColor(33,37,41);
        $this->SetTextColor(255);
        $this->SetFont('Arial','B',11);
        $this->Cell(0,8,utf8_decode("  $title"),0,1,'L',true);
        $this->SetTextColor(0);
        $this->Ln(4);
    }

    function field($label,$value)
    {
        $this->SetFont('Arial','B',10);
        $this->Cell(50,7,utf8_decode($label),0,0);
        $this->SetFont('Arial','',10);
        $this->Cell(0,7,utf8_decode($value),0,1);
    }
}

$pdf = new PDF();
$pdf->AddPage();

/* ================= DATOS GENERALES ================= */
$pdf->section('DATOS GENERALES');

$pdf->field('Proyecto:', $r['pro']);
$pdf->field('Mes:', $r['mes']);
$pdf->field('Periodo:', $r['fi'].' al '.$r['fn']);
$pdf->field('Responsable:', $r['p']);

$pdf->Ln(6);

/* ================= TABLA DE CONSUMO ================= */
$pdf->section('DETALLE DE CONSUMO');

$pdf->SetFont('Arial','B',10);
$pdf->SetFillColor(240,240,240);
$pdf->Cell(60,8,'Concepto',1,0,'C',true);
$pdf->Cell(60,8,'Detalle',1,0,'C',true);
$pdf->Cell(60,8,'Observación',1,1,'C',true);

$pdf->SetFont('Arial','',10);
$pdf->Cell(60,10,'Consumo registrado',1);
$pdf->SetFont('Arial','B',12);
$pdf->SetTextColor(40,167,69);
$pdf->Cell(60,10,number_format($r['c'],2).' kWh',1,0,'C');
$pdf->SetFont('Arial','',10);
$pdf->SetTextColor(0);
$pdf->Cell(60,10,'Lectura mensual',1,1,'C');

/* ================= OBSERVACIONES ================= */
$pdf->Ln(6);
$pdf->section('OBSERVACIONES');

$pdf->SetFont('Arial','',10);
$pdf->MultiCell(0,8,utf8_decode(
    'El consumo registrado corresponde al periodo indicado. '.
    'Este documento forma parte del control ambiental y energético de la organización.'
),1);

/* ================= FIRMAS ================= */
$pdf->Ln(12);
$pdf->SetFont('Arial','',10);

$pdf->Cell(80,20,'',0,0);
$pdf->Cell(30,20,'',0,0);
$pdf->Cell(80,20,'',0,1);

$pdf->Cell(80,6,'_________________________',0,0,'C');
$pdf->Cell(30,6,'',0,0);
$pdf->Cell(80,6,'_________________________',0,1,'C');

$pdf->Cell(80,6,'Responsable',0,0,'C');
$pdf->Cell(30,6,'',0,0);
$pdf->Cell(80,6,'Revisado por',0,1,'C');

/* ================= SALIDA ================= */
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="PLANILLA_CONSUMO_ENERGIA.pdf"');
$pdf->Output('I');
exit;
