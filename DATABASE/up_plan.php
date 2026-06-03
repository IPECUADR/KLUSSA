<?php

require('../DATABASE/conexion.php');

// DATOS DE INSERCIÓN
$user_up = $_POST['user_up'];
$PK_plan = $_POST['PK_plan'];
$plan_nm = $_POST['plan_nm'];
$des_plan = $_POST['des_plan'];
$an_plan = $_POST['an_plan'];
$doc_plan = $_FILES['doc_plan']['name'];

// DATOS FTP
$ftp_server = "200.105.244.50";
$ftp_user   = "Administrador";
$ftp_pass   = "@Kde.2024";
$ftp_ruta   = "/DOC/PLANES/"; // Ruta en el servidor FTP

$busqueda = "SELECT * FROM planes WHERE PK_plan = $PK_plan";
$bs = mysqli_query($con, $busqueda);

if ($bs) {
    if (isset($_FILES['doc_plan']) && $_FILES['doc_plan']['error'] === UPLOAD_ERR_OK && !empty($_FILES['doc_plan']['name'])) {

        $permitidos = ['pdf', 'docx', 'doc'];
        $archivo_nombre = $_FILES['doc_plan']['name'];
        $archivo_temp = $_FILES['doc_plan']['tmp_name'];
        $archivo_tam = $_FILES['doc_plan']['size'];
        $ext = strtolower(pathinfo($archivo_nombre, PATHINFO_EXTENSION));
        $nuevo_nombre = uniqid('plan_') . '.' . $ext;

      

        $respuesta = mysqli_fetch_array($bs);
        $archivo_server = $respuesta['doc_pln_mc_lg'];

        // Eliminar archivo anterior por FTP
        $conn_id = ftp_connect($ftp_server);
        $login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);
        ftp_pasv($conn_id, true);

        if ($conn_id && $login_result) {
            $archivo_anterior = $ftp_ruta . $archivo_server;
            if (!empty($archivo_server)) {
                @ftp_delete($conn_id, $archivo_anterior); // eliminar anterior
            }

            // Subir nuevo archivo
            if (ftp_put($conn_id, $ftp_ruta . $nuevo_nombre, $archivo_temp, FTP_BINARY)) {
                // Actualizar base de datos
                $update_reg = "UPDATE planes 
                               SET user_up_plan_aut='$user_up', 
                                   plan_nom='$plan_nm', 
                                   plan_desc='$des_plan', 
                                   plan_an='$an_plan', 
                                   doc_pln_mc_lg='$nuevo_nombre' 
                               WHERE PK_plan = $PK_plan";

                $up = mysqli_query($con, $update_reg);

                ftp_close($conn_id);

                if ($up) {
                    echo json_encode(['err' => false, 'mensaje' => 'Actualización exitosa.']);
                } else {
                    echo json_encode(['err' => true, 'mensaje' => 'Error actualizando base de datos.']);
                }
            } else {
                ftp_close($conn_id);
                echo json_encode(['err' => true, 'mensaje' => 'Error al subir el archivo por FTP.']);
            }
        } else {
            echo json_encode(['err' => true, 'mensaje' => 'No se pudo conectar al servidor FTP.']);
        }

    } else {
        // Actualización sin nuevo archivo
        $update_reg = "UPDATE planes 
                       SET user_up_plan_aut='$user_up', 
                           plan_nom='$plan_nm', 
                           plan_desc='$des_plan', 
                           plan_an='$an_plan' 
                       WHERE PK_plan = $PK_plan";

        $up = mysqli_query($con, $update_reg);

        if ($up) {
            echo json_encode(['err' => false, 'mensaje' => 'Actualización exitosa.']);
        } else {
            echo json_encode(['err' => true, 'mensaje' => 'No se encuentra el registro.']);
        }
    }
} else {
    echo json_encode(['err' => true, 'mensaje' => 'No se encuentra el registro.']);
}

mysqli_close($con);
