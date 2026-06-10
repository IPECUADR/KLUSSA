<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $sql = "
        SELECT
            vc.PK_vc,
            vc.fc_vc,
            vc.evidencia_vc,
            vc.FK_est_vc,

            p.PK_prs,
            p.hcl_num,
            p.nombre_prs,
            p.apellido_ps,
            p.ci_prs,

            cg.cargo,
            ag.agencia_ag,

            tv.PK_t_vc,
            tv.t_vacuna,
            tv.des_t_vacuna,

            ds.PK_ds,
            ds.Dosis,
            ds.des_ds,

            mc.PK_m_vc,
            mc.Marca,

            ev.PK_est_vc,
            ev.estado_vacuna

        FROM vacuna vc
        INNER JOIN persona p ON p.PK_prs = vc.FK_prs
        INNER JOIN cargo cg ON cg.PK_cg = p.FK_cg
        INNER JOIN agencia ag ON ag.PK_ag = p.FK_ag
        INNER JOIN t_vacuna tv ON tv.PK_t_vc = vc.FK_t_vc
        INNER JOIN dosis ds ON ds.PK_ds = vc.FK_ds
        INNER JOIN marca_vc mc ON mc.PK_m_vc = vc.FK_mc
        INNER JOIN est_vacuna ev ON ev.PK_est_vc = vc.FK_est_vc
        ORDER BY vc.fc_vc DESC, vc.PK_vc DESC
    ";

    $stmt = $pdoSalud->query($sql);
    $vacunas = $stmt->fetchAll();

    echo json_encode([
        'err' => false,
        'data' => $vacunas
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al listar vacunas'
    ], JSON_UNESCAPED_UNICODE);
}