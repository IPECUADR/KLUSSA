<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require('fpdf/fpdf.php');

/* =====================================================
   1. RECIBIR DATA
===================================================== */
$data = [];

if (!empty($_POST['cp'])) {
    $json = json_decode($_POST['cp'], true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($json)) {
        $data = $json;
    }
}

if (empty($data)) {
    die('Sin datos válidos para generar el reporte');
}

/* =====================================================
   2. AGRUPAR CONSUMO POR MES
===================================================== */
$consumo_mes = [];

foreach ($data as $row) {
    if (!isset($row['mes'], $row['m_cubicos'])) continue;
    $consumo_mes[$row['mes']] = ($consumo_mes[$row['mes']] ?? 0) + floatval($row['m_cubicos']);
}

/* =====================================================
   3. CLASE PDF
===================================================== */
class PDF extends FPDF
{
    public $baseX = 35; // alineación con cabecera

    function Header()
    {
        $logo = __DIR__ . '/../IMAGE/kde.png';
        if (file_exists($logo)) {
            $this->Image($logo, 10, 8, 22);
        }

        // Título
        $this->SetFont('Arial','B',14);
        $this->SetXY($this->baseX,10);
        $this->Cell(220,10,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),1,0,'C');

        // Código
        $this->SetFont('Arial','B',9);
        $this->SetXY(260,10);
        $this->MultiCell(30,5,"EC-HSE-F-53\nREV-4\nENE-2024",1,'C');

        // Subtítulo
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',11);
        $this->SetXY($this->baseX,20);
        $this->Cell(220,8,utf8_decode('CONTROL DE CONSUMO DE AGUA SEDE'),1,1,'C',true);

        $this->Ln(5);
        $this->SetTextColor(0,0,0);
    }

    function TableHeader()
    {
        $this->SetX($this->baseX);
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',9);

        $cols = [
            'N°'=>10,'MES'=>30,'m³'=>20,'LITROS'=>25,
            'F. INICIO'=>32,'F. CORTE'=>32,
            'SEDE'=>45,'RESPONSABLE'=>40
        ];

        foreach ($cols as $txt=>$w) {
            $this->Cell($w,8,utf8_decode($txt),1,0,'C',true);
        }

        $this->Ln();
        $this->SetTextColor(0,0,0);
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA
===================================================== */
function graficaBarras($pdf, $data)
{
    if (empty($data)) return;

    $max = max($data);
    if ($max <= 0) return;

    $x0 = 40;
    $y0 = 160;
    $hMax = 80;
    $w = 20;
    $esp = 15;

    $pdf->Line($x0, $y0 - $hMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 220, $y0);

    $x = $x0 + 10;

    foreach ($data as $mes => $val) {
        $h = ($val / $max) * $hMax;

        $pdf->SetFillColor(0,32,96);
        $pdf->Rect($x, $y0 - $h, $w, $h, 'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($x - 5, $y0 - $h - 6);
        $pdf->Cell($w + 10,5,number_format($val,2),0,0,'C');

        $pdf->SetXY($x - 10, $y0 + 2);
        $pdf->Cell($w + 20,5,utf8_decode($mes),0,0,'C');

        $x += $w + $esp;
    }
}

/* =====================================================
   5. GENERAR PDF
===================================================== */
$pdf = new PDF('L','mm','A4');
$pdf->AddPage();
$pdf->SetFont('Arial','',9);
$pdf->TableHeader();

$i = 1;
$total_m3 = 0;
$total_lt = 0;
$fill = false;

foreach ($data as $r) {

    $total_m3 += floatval($r['m_cubicos'] ?? 0);
    $total_lt += floatval($r['litros'] ?? 0);

    $pdf->SetX($pdf->baseX);
    $pdf->SetFillColor(245,247,250);
    $pdf->SetDrawColor(200,200,200);

    $pdf->Cell(10,7,$i++,1,0,'C',$fill);
    $pdf->Cell(30,7,utf8_decode($r['mes'] ?? ''),1,0,'C',$fill);
    $pdf->Cell(20,7,number_format($r['m_cubicos'] ?? 0,2),1,0,'R',$fill);
    $pdf->Cell(25,7,number_format($r['litros'] ?? 0,2),1,0,'R',$fill);
    $pdf->Cell(32,7,$r['fc_inicio'] ?? '',1,0,'C',$fill);
    $pdf->Cell(32,7,$r['fc_corte'] ?? '',1,0,'C',$fill);
    $pdf->Cell(45,7,utf8_decode($r['sede'] ?? ''),1,0,'C',$fill);
    $pdf->Cell(40,7,utf8_decode($r['usuario'] ?? ''),1,1,'C',$fill);

    $fill = !$fill;

    if ($pdf->GetY() > 180) {
        $pdf->AddPage();
        $pdf->TableHeader();
    }
}

/* =====================================================
   6. TOTALES
===================================================== */
$pdf->SetX($pdf->baseX);
$pdf->SetFont('Arial','B',9);
$pdf->SetFillColor(230,235,245);

$pdf->Cell(40,8,'TOTAL',1,0,'C',true);
$pdf->Cell(20,8,number_format($total_m3,2),1,0,'R',true);
$pdf->Cell(25,8,number_format($total_lt,2),1,0,'R',true);
$pdf->Cell(149,8,'',1,1,true);

/* =====================================================
   7. GRÁFICA
===================================================== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,10,utf8_decode('Gráfica de Consumo de Agua por Mes (m³)'),0,1,'C');
graficaBarras($pdf, $consumo_mes);

/* =====================================================
   8. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Agua_Sede.pdf');
