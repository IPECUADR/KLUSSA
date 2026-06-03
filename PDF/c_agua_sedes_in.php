<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) die('Sin datos');

$data = json_decode($_POST['cp'], true);
if (!$data) die('JSON inválido');

/* aceptar 1 o varios registros */
if (isset($data['mes'])) {
    $data = [$data];
}

class PDF extends FPDF
{
    function Header()
    {
        /* BANDA SUPERIOR */
        $this->SetFillColor(210,235,255);
        $this->Rect(0,0,297,28,'F');

        /* LOGO */
        if (file_exists('../IMAGE/kde.png')) {
            $this->Image('../IMAGE/kde.png',10,6,20);
        }

        /* TITULO */
        $this->SetFont('Arial','B',14);
        $this->SetTextColor(0,70,140);
        $this->SetXY(10,10);
        $this->Cell(0,8,utf8_decode('PLANILLA DE CONSUMO DE AGUA POTABLE'),0,1,'C');

        /* CODIGO */
        $this->SetFont('Arial','I',9);
        $this->SetXY(250,10);
        $this->Cell(35,5,'AG-HSE-F-21',0,1,'R');

        /* LINEA */
        $this->Line(10,28,287,28);
        $this->Ln(18);
        $this->SetTextColor(0);
    }
}

$pdf = new PDF('L','mm','A4');
$pdf->AddPage();

/* ================= DATOS GENERALES ================= */
$pdf->SetFont('Arial','B',10);
$pdf->Cell(40,7,'Sede:',0,0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(80,7,utf8_decode($data[0]['sede']),0,0);

$pdf->SetFont('Arial','B',10);
$pdf->Cell(40,7,'Periodo:',0,0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(0,7,$data[0]['fc_inicio'].' al '.$data[0]['fc_corte'],0,1);

$pdf->Ln(4);

/* ================= TABLA ================= */
$pdf->SetFont('Arial','B',9);
$pdf->SetFillColor(225,240,255);

$pdf->Cell(10,8,'#',1,0,'C',true);
$pdf->Cell(40,8,'Mes',1,0,'C',true);
$pdf->Cell(35,8,utf8_decode ('Consumo (m³)'),1,0,'C',true);
$pdf->Cell(40,8,'Consumo (Litros)',1,0,'C',true);
$pdf->Cell(45,8,'Responsable',1,0,'C',true);
$pdf->Cell(60,8,'Observacion',1,1,'C',true);

$pdf->SetFont('Arial','',9);
$cont = 1;
$total_m3 = 0;
$total_l = 0;

foreach ($data as $r) {

    $total_m3 += $r['m_cubicos'];
    $total_l  += $r['litros'];

    $pdf->Cell(10,8,$cont,1,0,'C');
    $pdf->Cell(40,8,utf8_decode($r['mes']),1);
    $pdf->Cell(35,8,number_format($r['m_cubicos'],2),1,0,'R');
    $pdf->Cell(40,8,number_format($r['litros'],0),1,0,'R');
    $pdf->Cell(45,8,utf8_decode($r['usuario']),1);
    $pdf->Cell(60,8,'Lectura mensual',1,1);

    $cont++;
}

/* ================= TOTALES ================= */
$pdf->SetFont('Arial','B',10);
$pdf->SetFillColor(200,230,250);

$pdf->Cell(50,9,'TOTAL CONSUMO',1,0,'C',true);
$pdf->Cell(35,9,number_format($total_m3,2).utf8_decode (' m³'),1,0,'R',true);
$pdf->Cell(40,9,number_format($total_l,0).' L',1,0,'R',true);
$pdf->Cell(105,9,'',1,1,true);

/* ================= FIRMAS ================= */
$pdf->Ln(12);
$pdf->SetFont('Arial','',10);

$pdf->Cell(90,6,'_________________________',0,0,'C');
$pdf->Cell(90,6,'_________________________',0,1,'C');

$pdf->Cell(90,6,'Responsable',0,0,'C');
$pdf->Cell(90,6,'Revisado por',0,1,'C');

/* ================= SALIDA ================= */
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="PLANILLA_CONSUMO_AGUA.pdf"');
$pdf->Output('I');
exit;
