<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $sql = "
        SELECT
            e.PK_examen,
            e.fc_prog_exam,
            e.resultado_exam,
            e.v_medica,
            e.cal_cert_exam,

            p.PK_prs,
            p.hcl_num,
            p.nombre_prs,
            p.apellido_ps,
            p.ci_prs,

            cg.cargo,
            ag.agencia_ag,

            te.tp_examen,
            pa.an_prog,
            ee.PK_est_exam,
            ee.estado_exam,
            ve.valor_vrd_ex
        FROM examen e
        INNER JOIN persona p ON p.PK_prs = e.FK_prs
        INNER JOIN cargo cg ON cg.PK_cg = p.FK_cg
        INNER JOIN agencia ag ON ag.PK_ag = p.FK_ag
        INNER JOIN t_examen te ON te.PK_t_ex = e.FK_t_ex
        INNER JOIN prog_a pa ON pa.PK_prog_a = e.FK_prog_a
        INNER JOIN est_exam ee ON ee.PK_est_exam = e.FK_est_exam
        INNER JOIN v_verdad_ex ve ON ve.PK_v_vrd_ex = e.FK_v_vrd_ex
        ORDER BY e.fc_prog_exam DESC, e.PK_examen DESC
    ";

    $stmt = $pdoSalud->query($sql);
    $examenes = $stmt->fetchAll();

    echo json_encode([
        'err' => false,
        'data' => $examenes
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al listar exámenes'
    ], JSON_UNESCAPED_UNICODE);
}