<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $sql = "
        SELECT
            p.PK_prs,
            p.hcl_num,
            p.nombre_prs,
            p.apellido_ps,
            p.ci_prs,
            p.email_prs,
            p.num_cel_prs,
            p.fc_nan_prc,
            p.edad_prs,
            p.FK_est_p,
            sx.sexo_p,
            cg.cargo,
            ga.g_atencion,
            ag.agencia_ag,
            ep.est_p,
            gs.g_sanginio
        FROM persona p
        INNER JOIN sexo_p sx ON sx.PK_sexo_p = p.FK_sexo_p
        INNER JOIN cargo cg ON cg.PK_cg = p.FK_cg
        INNER JOIN g_atencion ga ON ga.PK_g_atn = p.FK_g_atn
        INNER JOIN agencia ag ON ag.PK_ag = p.FK_ag
        INNER JOIN estado_p ep ON ep.PK_est_p = p.FK_est_p
        INNER JOIN grupo_sg gs ON gs.PK_g_sg = p.FK_g_sg
        ORDER BY p.hcl_num ASC
    ";

    $stmt = $pdoSalud->query($sql);
    $pacientes = $stmt->fetchAll();

    echo json_encode([
        'err' => false,
        'data' => $pacientes
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al listar pacientes'
    ], JSON_UNESCAPED_UNICODE);
}