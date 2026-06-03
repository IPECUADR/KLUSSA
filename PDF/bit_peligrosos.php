<?php
require('fpdf/fpdf.php');

if(isset($_POST['cp'])){

$cp = json_decode($_POST['cp'], true);

$pdf = new FPDF('P','mm','A4');
$pdf->AddPage();
$pdf->SetAutoPageBreak(false);

/* ----------- BARRA LATERAL MODERNA ----------- */

$pdf->SetFillColor(35,52,70);
$pdf->Rect(0,0,9,297,'F');


/* ----------- HEADER ----------- */

/* ----------- HEADER MODERNO ----------- */

$pdf->SetXY(18,10);

/* TITULO */

$pdf->SetFont('Arial','B',16);
$pdf->Cell(120,8,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),0,1);

$pdf->SetX(18);
$pdf->SetFont('Arial','',10);
$pdf->Cell(120,6,'Control de residuos peligrosos / especiales',0,0);


/* CAJA LOGO */

$pdf->SetXY(150,10);
$pdf->SetDrawColor(180,180,180);

$pdf->Cell(45,18,'',1,2,'C'); // marco logo


/* INSERTAR LOGO */

if(file_exists('../IMAGE/kde.png')){
$pdf->Image('../IMAGE/kde.png',163,11,20);
}


/* CODIGO DOCUMENTO */

$pdf->SetFont('Arial','B',10);
$pdf->SetXY(150,28);

$pdf->Cell(45,8,'EC-HSE-F-53',1,1,'C');


$pdf->Ln(8);

/* ----------- FUNCION SECCION ----------- */

function section($pdf,$title){

$pdf->Ln(5);

$pdf->SetFillColor(45,45,45);
$pdf->SetTextColor(255,255,255);
$pdf->SetFont('Arial','B',10);

$pdf->Cell(0,6,utf8_decode(" ".$title),0,1,'L',true);

$pdf->SetTextColor(0,0,0);

}

/* ----------- FUNCION CAMPO ----------- */

function campo($pdf,$label,$valor){

$pdf->SetFont('Arial','B',9);
$pdf->Cell(45,6,utf8_decode($label),0,0);

$pdf->SetFont('Arial','',9);
$pdf->Cell(50,6,utf8_decode($valor ?? ''),0,0);

}


/* ----------- INFORMACION GENERAL ----------- */

$pdf->SetY(35);

section($pdf,'INFORMACIÓN GENERAL');

campo($pdf,'Mes:',$cp['mes_res']);
campo($pdf,'Fecha:',$cp['fc_disp']);
$pdf->Ln();

campo($pdf,'Agencia:',$cp['proyecto']);
campo($pdf,'Ubicación:',$cp['ubicacion']);
$pdf->Ln();


/* ----------- RESPONSABLES ----------- */

section($pdf,'GESTIÓN');

campo($pdf,'Gestora:',$cp['gestor_res']);
campo($pdf,'Responsable:',$cp['resp_des']);
$pdf->Ln();

campo($pdf,'Máquina:',$cp['serie_maquina']);
campo($pdf,'Manifiesto:',$cp['mnft']);
$pdf->Ln();


/* ----------- CANTIDADES ----------- */

section($pdf,'CANTIDADES');

$pdf->SetFont('Arial','',9);

$pdf->Cell(45,7,'Ton',0,0,'C');
$pdf->Cell(45,7,'Kg',0,0,'C');
$pdf->Cell(45,7,'Gal',0,0,'C');
$pdf->Cell(45,7,'Lit',0,1,'C');

$pdf->SetFont('Arial','B',11);

$pdf->Cell(45,8,$cp['ct_tn'],0,0,'C');
$pdf->Cell(45,8,$cp['ct_kg'],0,0,'C');
$pdf->Cell(45,8,$cp['ct_gl'],0,0,'C');
$pdf->Cell(45,8,$cp['ct_lit'],0,1,'C');


/* ----------- RESIDUO ----------- */

section($pdf,'RESIDUO');

$pdf->SetFont('Arial','',9);

$pdf->MultiCell(0,5,
utf8_decode(
'Código: '.($cp['code_res'] ?? '')."\n".
'Descripción: '.($cp['descrip_residuo'] ?? '')
));


/* ----------- DISPOSICION ----------- */

section($pdf,'DISPOSICIÓN FINAL');

$pdf->SetFont('Arial','',9);

$pdf->MultiCell(0,5,utf8_decode($cp['des_des'] ?? ''));


/* ----------- COSTOS ----------- */

section($pdf,'COSTOS');

$costo_gestor = $cp['ct_gestor_des'] ?? 0;
$costo_transporte = $cp['ct_trasporte_des'] ?? 0;
$total = $costo_gestor + $costo_transporte;

$pdf->SetFont('Arial','',9);

$pdf->Cell(120,7,'Servicio gestor',0,0);
$pdf->Cell(60,7,'$ '.number_format($costo_gestor,2),0,1,'R');

$pdf->Cell(120,7,'Transporte',0,0);
$pdf->Cell(60,7,'$ '.number_format($costo_transporte,2),0,1,'R');

$pdf->SetFont('Arial','B',12);

$pdf->Cell(120,9,'TOTAL',0,0);
$pdf->Cell(60,9,'$ '.number_format($total,2),0,1,'R');


/* ----------- FIRMA ----------- */

$pdf->Ln(12);

$pdf->Cell(70,0,'','T');
$pdf->Ln(4);

$pdf->SetFont('Arial','',9);
$pdf->Cell(70,5,utf8_decode($cp['resp_des'] ?? ''),0,1);
$pdf->Cell(70,5,utf8_decode($cp['cargo'] ?? ''),0,1);


/* ----------- OUTPUT ----------- */

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="bitacora_residuos.pdf');

$pdf->Output('I');

exit;

}
?>