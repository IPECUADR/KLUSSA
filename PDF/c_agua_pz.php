<?php
require('fpdf/fpdf.php');

/* =====================================================
   1. RECIBIR DATA
===================================================== */
$data = isset($_POST['cp']) ? json_decode($_POST['cp'], true) : [];

if (!is_array($data) || empty($data)) {
    die('Sin datos para generar el reporte');
}

/* =====================================================
   2. AGRUPAR CONSUMO (GALONES)
===================================================== */
$consumo_mes      = [];
$consumo_maquina  = [];
$consumo_pozo     = [];

foreach ($data as $r) {

    $gal = floatval($r['gal'] ?? 0);

    $consumo_mes[$r['mes']] =
        ($consumo_mes[$r['mes']] ?? 0) + $gal;

    $consumo_maquina[$r['maquina']] =
        ($consumo_maquina[$r['maquina']] ?? 0) + $gal;

    $consumo_pozo[$r['pozo']] =
        ($consumo_pozo[$r['pozo']] ?? 0) + $gal;
}

/* =====================================================
   3. CLASE PDF (HEADER OFICIAL)
===================================================== */
class PDF extends FPDF
{
    public $baseX = 35;

    function Header()
    {
        // Logo LOCAL
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
        $this->SetXY($this->baseX,22);
        $this->Cell(220,8,utf8_decode('CONTROL DE CONSUMO DE AGUA'),1,1,'C',true);

        $this->Ln(12);
        $this->SetTextColor(0,0,0);
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA DE BARRAS
===================================================== */
function graficaBarras($pdf, $data, $unidad = 'gl')
{
    if (empty($data)) return;

    $max = max($data);
    if ($max <= 0) return;

    $x0 = 40;
    $y0 = 170;
    $hMax = 80;
    $w = 18;
    $esp = 14;

    // Ejes
    $pdf->Line($x0, $y0 - $hMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 220, $y0);

    $x = $x0 + 10;

    foreach ($data as $label => $val) {

        $h = ($val / $max) * $hMax;

        $pdf->SetFillColor(0,32,96);
        $pdf->Rect($x, $y0 - $h, $w, $h, 'F');

        // Valor
        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($x - 6, $y0 - $h - 6);
        $pdf->Cell($w + 12,5,number_format($val,2)." $unidad",0,0,'C');

        // Etiqueta
        $pdf->SetXY($x - 10, $y0 + 2);
        $pdf->MultiCell($w + 20,4,utf8_decode($label),0,'C');

        $x += $w + $esp;
    }
}

/* =====================================================
   5. GENERAR PDF (3 HOJAS)
===================================================== */
$pdf = new PDF('L','mm','A4');

/* ====== HOJA 1: POR MES ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,10,utf8_decode('Consumo de Agua por Mes (Galones)'),0,1,'C');
graficaBarras($pdf, $consumo_mes);

/* ====== HOJA 2: POR MÁQUINA ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,10,utf8_decode('Consumo de Agua por Máquina (Galones)'),0,1,'C');
graficaBarras($pdf, $consumo_maquina);

/* ====== HOJA 3: POR POZO ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,10,utf8_decode('Consumo de Agua por Pozo (Galones)'),0,1,'C');
graficaBarras($pdf, $consumo_pozo);

/* =====================================================
   6. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Agua.pdf');
