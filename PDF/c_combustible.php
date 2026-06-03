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
   2. AGRUPAR CONSUMO POR MES (GALONES)
===================================================== */
$consumo_mes = [];

foreach ($data as $row) {
    $mes = $row['mes'];
    $gal = floatval($row['gl']);
    $consumo_mes[$mes] = ($consumo_mes[$mes] ?? 0) + $gal;
}

/* =====================================================
   3. CLASE PDF
===================================================== */
class PDF extends FPDF
{
    public $baseX = 35;
    public $tablaWidth = 258;

    function Header()
    {
        // Logo LOCAL
        $logo = __DIR__ . '/../IMAGE/kde.png';
        if (file_exists($logo)) {
            $this->Image($logo, 10, 8, 22);
        }

        // Título
        $this->SetFont('Arial','B',14);
        $this->SetXY($this->baseX,5);
        $this->Cell(220,15,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),1,0,'C');

        // Código
        $this->SetFont('Arial','B',9);
        $this->SetXY(260,5);
        $this->MultiCell(30,5,"EC-HSE-F-53\nREV-4\nENE-2024",1,'C');

        // Subtítulo
        $this->SetFillColor(52,73,94);
        $this->SetTextColor(255);
        $this->SetFont('Arial','B',11);
        $this->SetXY($this->baseX,20);
        $this->Cell(220,8,utf8_decode('CONTROL DE CONSUMO DE COMBUSTIBLE'),1,1,'C',true);

        $this->Ln(5);
        $this->SetTextColor(0);
    }

    function TablaHeader()
    {
        $x = ($this->GetPageWidth() - $this->tablaWidth) / 2;
        $this->SetX($x);

        $this->SetFont('Arial','B',8);
        $this->SetFillColor(52,73,94);
        $this->SetTextColor(255);

        $this->Cell(8,8,'#',1,0,'C',true);
        $this->Cell(18,8,'Fecha',1,0,'C',true);
        $this->Cell(18,8,'Mes',1,0,'C',true);
        $this->Cell(40,8,'Vehículo',1,0,'C',true);
        $this->Cell(28,8,'Serie',1,0,'C',true);
        $this->Cell(28,8,'Comb.',1,0,'C',true);
        $this->Cell(18,8,'Gal',1,0,'C',true);
        $this->Cell(20,8,'Litros',1,0,'C',true);
        $this->Cell(50,8,'Clasificación',1,0,'C',true);
        $this->Cell(30,8,'Proyecto',1,1,'C',true);

        $this->SetTextColor(0);
    }

    function fila($row, $i)
    {
        $x = ($this->GetPageWidth() - $this->tablaWidth) / 2;
        $y = $this->GetY();

        $this->SetFont('Arial','',8);
        $this->SetX($x);

        $this->Cell(8,7,$i,1,0,'C');
        $this->Cell(18,7,$row['fc'],1,0,'C');
        $this->Cell(18,7,$row['mes'],1,0,'C');

        // Vehículo (MultiCell)
        $xVeh = $this->GetX();
        $yVeh = $this->GetY();
        $this->MultiCell(40,7,utf8_decode($row['vehiculo']),1,'C');
        $h = $this->GetY() - $yVeh;

        // Reposicionar
        $this->SetXY($xVeh + 40, $yVeh);

        $this->Cell(28,$h,$row['serie'],1,0,'C');
        $this->Cell(28,$h,utf8_decode($row['com']),1,0,'C');
        $this->Cell(18,$h,number_format($row['gl'],2),1,0,'R');
        $this->Cell(20,$h,number_format($row['li'],2),1,0,'R');
        $this->Cell(50,$h,utf8_decode($row['clf']),1,0,'C');
        $this->Cell(30,$h,utf8_decode($row['ag']),1,1,'C');
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA
===================================================== */
function graficaBarras($pdf, $data)
{
    if (empty($data)) return;

    $x0 = 30;
    $y0 = 160;
    $hMax = 80;
    $w = 18;
    $gap = 12;

    $max = max($data);
    if ($max <= 0) return;

    $pdf->Line($x0, $y0 - $hMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 230, $y0);

    $x = $x0 + 10;

    foreach ($data as $mes => $val) {
        $h = ($val / $max) * $hMax;
        $pdf->SetFillColor(52,73,94);
        $pdf->Rect($x, $y0 - $h, $w, $h, 'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($x - 5, $y0 - $h - 6);
        $pdf->Cell($w + 10,5,number_format($val,2),0,0,'C');

        $pdf->SetXY($x - 10, $y0 + 2);
        $pdf->Cell($w + 20,5,utf8_decode($mes),0,0,'C');

        $x += $w + $gap;
    }
}

/* =====================================================
   5. GENERAR PDF
===================================================== */
$pdf = new PDF('L','mm','A4');
$pdf->AddPage();
$pdf->TablaHeader();

$i = 1;
$total_gal = 0;
$total_lt  = 0;

foreach ($data as $r) {
    $pdf->fila($r, $i++);
    $total_gal += $r['gl'];
    $total_lt  += $r['li'];

    if ($pdf->GetY() > 180) {
        $pdf->AddPage();
        $pdf->TablaHeader();
    }
}

/* ===== TOTALES ===== */
$x = ($pdf->GetPageWidth() - $pdf->tablaWidth) / 2;
$pdf->SetX($x);
$pdf->SetFont('Arial','B',8);
$pdf->Cell(140,8,'TOTAL',1,0,'C');
$pdf->Cell(18,8,number_format($total_gal,2),1,0,'R');
$pdf->Cell(20,8,number_format($total_lt,2),1,1,'R');

/* =====================================================
   6. GRÁFICA
===================================================== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,10,utf8_decode('Gráfica de Consumo de Combustible por Mes (Galones)'),0,1,'C');
graficaBarras($pdf, $consumo_mes);

/* =====================================================
   7. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Combustible.pdf');
