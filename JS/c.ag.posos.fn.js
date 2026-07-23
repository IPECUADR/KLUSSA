$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

    /// url de acceso al servicio
    let t_url = '../DATABASE/fil_totales_agua_pozo.php';// URL estándar
    let url = '../DATABASE/cg_c_agua_pozos.php';
    let params = {};

    /// actvacion de servicios 


    cbx_fil_ag();
    cbx_fil_mq();
    cbx_fil_pozo();
    fil_mes();
    c_aut_c_agua_pozos(url, params);
    total(t_url, params);

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


/// variables de entorno
let url = '../DATABASE/cg_c_agua_pozos.php';
let params = {};
let llenar_tabla = [];



function c_aut_c_agua_pozos(url, params) {




  $.ajax({
    url: url,
    data: params,
    type: 'POST',
    cache: false,
    dataType: 'json',

    success: function (json) {
      console.log(json);
      $('#content_table').empty();
      llenar_tabla = Object.values(json).filter(function (item) {
        return item && typeof item === 'object';
      });




      if (!json.err) {
        var contador = 1;

        $.each(json, function (i, item) {






          if (i != "err") {







            var codigo = `
              <tr>
                <td>${contador}</td>

                <td>${item.fi}</td>
                <td>${item.fn}</td>
                <td>${item.mes}</td>

                <td>${item.maquina}</td>
                <td>${item.plataforma ?? 'SIN REGISTRAR'}</td>

                <td class="fw-bold">${item.pozo}</td>

                <td>
                  <span class="badge bg-primary text-white">
                    <i class="fas fa-cloud-sun"></i>
                    ${item.dia_ini}
                  </span>
                </td>

                <td>
                  <span class="badge bg-primary text-white">
                    <i class="fas fa-cloud-sun"></i>
                    ${item.dia_fin}
                  </span>
                </td>

                <td>
                  <span class="badge bg-dark text-white">
                    <i class="fas fa-cloud-moon"></i>
                    ${item.noche_ini}
                  </span>
                </td>

                <td>
                  <span class="badge bg-dark text-white">
                    <i class="fas fa-cloud-moon"></i>
                    ${item.noche_fin}
                  </span>
                </td>

                <td>
                  <span class="badge bg-success-subtle text-success">
                    ${item.gal} m³
                  </span>
                </td>

                <td>
                  <span class="badge bg-primary-subtle text-primary">
                    ${item.litros} L
                  </span>
                </td>

                <td>${item.proyecto}</td>

                <td id="${item.id}">
                  <button
                    type="button"
                    id="coment"
                    class="btn btn-primary btn-sm mb-1 mt-1"
                    title="Editar registro"
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button
                    type="button"
                    id="btn_delete"
                    class="btn btn-danger btn-sm mb-1 mt-1"
                    title="Eliminar registro"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            `;



















          }



          //asignacion de informacion

          $('#content_table').append(codigo);

          contador++


        })
      }
      else {

        mensaje(json.mensaje, 'info')

      }
    }
  })


}

/// mostrar datos en  el  sistema







$(document).on('click', '#bnt_reg_res_p', function () {


  $('#modal').modal('show');


  cbx_mes_res();
  cbx_agencia();
  modal_insert();
  cbx_ubicacion();
  cbx_maquina();

})







function modal_insert() {

  $('#modal').modal('show');
  $('#titulo_modal').empty('');
  $('#form_modal').empty('');
  $('#form_modal_footer').empty('');



  var title = `
      <div class="container-fluid py-2 border-bottom" >
        <div class="row align-items-center">
          <div class="col-3 d-flex align-items-center">
            <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
          </div>
          <div class="col-6 text-center">
            <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL</span>
          </div>
          <div class="col-3 text-end">
            <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
        <i class="fa-solid fa-xmark fa-lg"></i>
      </button>
      `;

  var form = `
<form id="detalle_residuo" class="container-fluid py-3">

  <!-- ================= DATOS GENERALES ================= -->
  <div class="card border-0 shadow-sm g-4 mb-4">
   
     <div class="card-header bg-secondary text-white fw-semibold ">
     Infromacion General
    </div>

    <div class="card-body">
      <div class="row g-4">

         <div class="col-md-6">
          <label class="form-label small text-muted">Mes</label>
          <select class="form-select form-select-sm" id="cbx_mes_res" name="cbx_mes_res"></select>
        </div>

        <div class="col-md-6">
          <label class="form-label small text-muted">Agencia</label>
          <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
        </div>


        <div class="col-md-6">
          <label class="form-label small text-muted">Fecha Inicio</label>
          <input type="date" class="form-control form-control-sm" id="fecha_inicio" name="fecha_inicio">
        </div>

        <div class="col-md-6">
          <label class="form-label small text-muted">Fecha Cierre</label>
          <input type="date" class="form-control form-control-sm" id="fecha_cierre" name="fecha_cierre">
        </div>

     
        <div class="col-md-6">
          <label class="form-label small text-muted">Máquina</label>
          <select class="form-select form-select-sm" id="cbx_maquina" name="cbx_maquina"></select>
        </div>

        <div class="col-md-6">
          <label class="form-label small text-muted">Ubicación</label>
          <select class="form-select form-select-sm" id="cbx_ubicacion" name="cbx_ubicacion"></select>
        </div>

        <div class="col-md-6">
          <label class="form-label small text-muted">Plataforma</label>
          <input type="text" class="form-control form-control-sm" id="plataforma" name="plataforma" placeholder="Ejemplo: CV26-RIG-001">
        </div>

        <div class="col-md-6">
          <label class="form-label small text-muted">Pozo</label>
          <input type="text" class="form-control form-control-sm" id="pozo" name="pozo" placeholder="Ejemplo: CVDD26-199">
        </div>

      </div>
    </div>
  </div>

  <!-- ================= TURNO DIA ================= -->
  <div class="card shadow-sm g-4 mb-4">
    <div class="card-header bg-success text-white fw-semibold ">
    <i class="fas fa-cloud-sun"></i>  Consumo de Agua – Turno Día
    </div>

    <div class="card-body">
      <div class="row g-4">

        <div class="col-md-3">
          <label class="form-label small text-muted">Inicio</label>
          <input type="number" id="dia_ini" class="form-control form-control-sm" name="dia_inicio">
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Fin</label>
          <input type="number" id="dia_fin" class="form-control form-control-sm" name="dia_fin">
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Consumo (m³)</label>
          <input type="text" class="form-control form-control-sm bg-light text-center fw-bold" id="dia_consumo" name="dia_consumo" readonly>
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Consumo (L)</label>
          <input type="text" class="form-control form-control-sm bg-light text-center fw-bold" id="dia_litros" name="dia_litros" readonly>
        </div>

      </div>
    </div>
  </div>

  <!-- ================= TURNO NOCHE ================= -->
  <div class="card  shadow-sm rounded-4 mb-4">
    <div class="card-header bg-dark text-white fw-semibold ">
     <i class="fas fa-cloud-moon"></i>  Consumo de Agua – Turno Noche
    </div>

    <div class="card-body">
      <div class="row g-4">

        <div class="col-md-3">
          <label class="form-label small text-muted">Inicio</label>
          <input type="number" id="noche_inicio" class="form-control form-control-sm" name="noche_inicio">
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Fin</label>
          <input type="number" id="noche_fin" class="form-control form-control-sm" name="noche_fin">
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Consumo (m³)</label>
          <input type="text" class="form-control form-control-sm bg-light text-center fw-bold" id="noche_consumo" name="noche_consumo" readonly>
        </div>

        <div class="col-md-3">
          <label class="form-label small text-muted">Consumo (L)</label>
          <input type="text" class="form-control form-control-sm bg-light text-center fw-bold" id="noche_litros" name="noche_litros" readonly>
        </div>

      </div>
    </div>
  </div>

  <!-- ================= RESPONSABLE ================= -->
  <div class="card shadow-sm rounded-4">
    <div class="card-header bg-secondary text-white fw-semibold ">
      Responsable
    </div>

    <div class="card-body">
      <div class="row g-4">

        <div class="col-md-12">
          <label class="form-label small text-muted">Responsable</label>
          <input type="text" class="form-control form-control-sm" name="responsable" id="resposable">
        </div>

      </div>
    </div>
  </div>
  

  <div class="card shadow-sm rounded-4 mt-2">
    <div class="card-header bg-primary text-white fw-semibold ">
      Comentario
    </div>

    <div class="card-body">
      <div class="row g-4">

        <div class="col-md-12">
          <label class="form-label small text-muted">Comentario</label>
          <textarea type="text" class="form-control form-control-sm" name="coment_in" id="coment_in"> -
          
          
          </textarea>
        </div>

      </div>
    </div>
  </div>

</form>
        
        
        
        `;
  var footer = `

        <div class="container-fluid border-top pt-3" >
        <div class="row g-2">



          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-primary w-100" id="btn_registro">
            <i class="fas fa-save"></i>  Guardar Registro
            </button>
          </div>



      <div class="col-md-6 col-12">
      
            <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
              <i class="fas fa-times-circle"></i> Cancelar
            </button>
          </div>

        </div>
      </div>



      </div>
        `;


  $('#modal').modal('show');
  $('#titulo_modal').append(title);
  $('#form_modal').append(form);
  $('#form_modal_footer').append(footer);


}


//// Funcion para llenar el combo de mes de residuo peligroso
function cbx_mes_res(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',

    success: function (response) {
      var json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_mes_res').empty();

        $('#cbx_mes_res').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            var option =
              '<option value="' +
              item.PK_mes +
              '">' +
              item.mes_res +
              '</option>';

            $('#cbx_mes_res').append(option);
          }
        });

        if (valorSeleccionado !== '') {
          $('#cbx_mes_res').val(String(valorSeleccionado));
        }
      }
    }
  });
}

/// Funcion para llenar el combo de maquina
function cbx_maquina(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_ma_pz.php',
    type: 'POST',

    success: function (response) {
      var json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_maquina').empty();

        $('#cbx_maquina').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            var option =
              '<option value="' +
              item.PK_maquina +
              '">' +
              item.serie_maquina +
              '</option>';

            $('#cbx_maquina').append(option);
          }
        });

        if (valorSeleccionado !== '') {
          $('#cbx_maquina').val(String(valorSeleccionado));
        }
      }
    }
  });
}

/// Funcion para llenar el combo de ubicacion
function cbx_ubicacion(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_ubicacion.php',
    type: 'POST',

    success: function (response) {
      var json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_ubicacion').empty();

        $('#cbx_ubicacion').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            var option =
              '<option value="' +
              item.PK_ub +
              '">' +
              item.ubicacion +
              '</option>';

            $('#cbx_ubicacion').append(option);
          }
        });

        if (valorSeleccionado !== '') {
          $('#cbx_ubicacion').val(String(valorSeleccionado));
        }
      }
    },

    error: function (xhr, status, error) {
      console.error('Error al cargar ubicaciones:', error);
    }
  });
}








//// Funcion para llenar el combo de agencia

function cbx_agencia(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',

    success: function (response) {
      var json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_agencia').empty();

        $('#cbx_agencia').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            var option =
              '<option value="' +
              item.PK_pro +
              '">' +
              item.proyecto +
              '</option>';

            $('#cbx_agencia').append(option);
          }
        });

        if (valorSeleccionado !== '') {
          $('#cbx_agencia').val(String(valorSeleccionado));
        }
      }
    }
  });
}


/// funcion para  fechas automatico y  carga de cbx

$(document).on('change', '#cbx_mes_res', function () {

  mes = this.value;

  let an = new Date().getFullYear(); // año actual

  mes = mes.padStart(2, '0'); // 01,02,03...

  console.log('Mes seleccionado:', mes); // Verificar el valor del mes seleccionado 

  if (mes !== '') {

    fc_in = an + '-' + mes + '-01';
    fc_fn = an + '-' + mes + '-28';


    $('#fecha_inicio').val(fc_in);
    $('#fecha_cierre').val(fc_fn);

  } else { mensaje('Selecciona un mes', 'warning'); }

});








$(document).on('click', '#btn_registro', function () {

  // capturo datos del formulario

  const fc_inicio = $('#fecha_inicio').val().trim();
  const fc_cierre = $('#fecha_cierre').val().trim();
  const agencia = $('#cbx_agencia').val().trim();
  const mes = $('#cbx_mes_res').val().trim();
  const maquina = $('#cbx_maquina').val().trim();
  const ubicacion = $('#cbx_ubicacion').val().trim();
  const plataforma = $('#plataforma').val().trim();
  const pozo = $('#pozo').val().trim();
  const responsable = $('#resposable').val().trim();
  const coment = $('#coment_in').val().trim();


  // dia 
  const dia_ini = $('#dia_ini').val().trim();
  const dia_fin = $('#dia_fin').val().trim();
  const cdia = $('#dia_consumo').val().trim();
  const d_li = $('#dia_litros').val().trim();

  // noche
  const noche_ini = $('#noche_inicio').val().trim();
  const noche_fin = $('#noche_fin').val().trim();
  const cnoche = $('#noche_consumo').val().trim();
  const n_li = $('#noche_litros').val().trim();



  //  valor de  la  descripcion  del  residuo


  if (fc_inicio.length === 0) return mensaje('La fecha de inicio es obligatoria', 'warning');
  if (fc_cierre.length === 0) return mensaje('La fecha de cierre es obligatoria', 'warning');
  if (fc_inicio > fc_cierre) return mensaje('La fecha de inicio no puede ser mayor o igual a la fecha de cierre', 'warning');
  if (agencia.length === 0) return mensaje('La agencia es obligatoria', 'warning');
  if (mes.length === 0) return mensaje('El mes es obligatorio', 'warning');
  if (maquina.length === 0) return mensaje('La maquina es obligatoria', 'warning');
  if (ubicacion.length === 0) return mensaje('La ubicación es obligatoria', 'warning');
  if (plataforma.length === 0) return mensaje('La plataforma es obligatoria', 'warning');
  if (maquina.length === 0) return mensaje('La maquina es obligatoria', 'warning');
  if (pozo.length === 0) return mensaje('El pozo es obligatorio', 'warning');
  if (responsable.length === 0) return mensaje('El responsable es obligatorio', 'warning');
  if (coment.length === 0) return mensaje('El comentario es obligatorio', 'warning');

  ///consumo dia - validaciones
  if (!dia_ini || !dia_fin) return mensaje('La lectura del turno dia no puede ser en blanco, por favor ingrese un valor', 'info');

  if (dia_ini < 0) return mensaje('La lectura inicial no puede ser negativa | Turno Dia', 'warning');
  if (dia_fin < 0) return mensaje('La lectura final no puede ser negativa | Turno Dia', 'warning');
  if (cdia < 0) return mensaje('El consumo no puede ser negativo | Turno Dia', 'warning');
  if (d_li < 0) return mensaje('Los litros no pueden ser negativos | Turno Dia', 'warning');

  /// consumo noche - validaciones 

  if (!noche_ini || !noche_fin) return mensaje('La lectura del turno noche no puede ser en blanco, por favor ingrese un valor', 'info');
  if (noche_ini < 0) return mensaje('La lectura inicial no puede ser negativa | Turno Noche', 'warning');
  if (noche_fin < 0) return mensaje('La lectura final no puede ser negativa | Turno Noche', 'warning');
  if (cnoche < 0) return mensaje('El consumo no puede ser negativo | Turno Noche', 'warning');
  if (n_li < 0) return mensaje('Los litros no pueden ser negativos | Turno Noche', 'warning');



  // envio de datos al  servidor

  $.ajax({
    url: '../DATABASE/insert_pozos_cag.php',
    type: 'POST',
    data: {

      fc_inicio,
      fc_cierre,
      agencia,
      mes,
      maquina,
      ubicacion,
      plataforma,
      pozo,
      responsable,
      coment,
      dia_ini,
      dia_fin,
      cdia,
      d_li,
      noche_ini,
      noche_fin,
      cnoche,
      n_li



    },
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {

      console.log('Respuesta del servidor:', response);

      var json = JSON.parse(response);

      if (!json.err) { mensaje(json.mensaje, 'success'); c_aut_c_agua_pozos(url, params); $('#modal').modal('hide'); } else { mensaje(json.mensaje, 'error') }



    },
    error: function (xhr, status, error) {
      console.error(error);
      mensaje('Ocurrió un error en la solicitud', 'error');
    },
    complete: function () {
      $('#btn_registro').prop('disabled', false);
    }
  });


});



function mensaje(mensaje, icono) {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });


}













/// eliminacion de registros//
$(document).on('click', '#btn_delete', function (event) {

  // MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

  var delete_info = $(this)[0].parentElement;
  id = $(delete_info).attr("id");

  console.log(id);

  Swal.fire({
    title: "¿Deseas eliminar el registro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      $.post('../DATABASE/del_c_ag_pozos.php', {


        id_delete: id


      })
        .done(function (response) {

          const res = JSON.parse(response);
          console.log(response);

          mensaje(res.mensaje, res.status);

          if (res.status === 'success') {

            c_aut_c_agua_pozos(url, params);

          }

        })

    }
  });
});


/// variable de entorno



// funciones de acciones en modales 

// Mostar ficha de dispocicion de residuos peligrosos




function armar_formulario(ficha, footer) {




  $('#modal').modal('show');





  $('#titulo_modal').empty('');
  $('#form_modal').empty('');
  $('#form_modal_footer').empty('');



  /// contenido dinamico


  var title = `
        <div class="container-fluid py-2 border-bottom" >
          <div class="row align-items-center">
            <div class="col-3 d-flex align-items-center">
              <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
            </div>
            <div class="col-6 text-center">
              <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL | AGUA POZOS</span>
            </div>
            <div class="col-3 text-end">
              <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
          <i class="fa-solid fa-xmark fa-lg"></i>
        </button>
        `;







  /// asignacion de valores  al modal

  $('#form_modal').append(ficha);
  $('#titulo_modal').append(title);

  $('#form_modal_footer').append(footer);


}


/// turno dia 
$(document).on('click', '#coment', function () {

  const celda = $(this).closest('td');
  const id = celda.attr('id');

  const cp = llenar_tabla.find(function (item) {
    return String(item.id) === String(id);
  });

  if (!cp) {
    mensaje('No se encontró la información del registro.', 'error');
    return;
  }

  pk_registro = cp.id;

  const ficha = `
    <form id="form_editar_agua_pozo" class="container-fluid py-3">

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-secondary text-white fw-semibold">
          Información general
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Fecha de inicio
              </label>

              <input
                type="date"
                class="form-control form-control-sm"
                id="fecha_inicio"
                value="${cp.fi || ''}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Fecha de cierre
              </label>

              <input
                type="date"
                class="form-control form-control-sm"
                id="fecha_cierre"
                value="${cp.fn || ''}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Mes
              </label>

              <select
                class="form-select form-select-sm"
                id="cbx_mes_res"
              >
                <option value="">Cargando...</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Proyecto
              </label>

              <select
                class="form-select form-select-sm"
                id="cbx_agencia"
              >
                <option value="">Cargando...</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Máquina
              </label>

              <select
                class="form-select form-select-sm"
                id="cbx_maquina"
              >
                <option value="">Cargando...</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Ubicación
              </label>

              <select
                class="form-select form-select-sm"
                id="cbx_ubicacion"
              >
                <option value="">Cargando...</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Plataforma
              </label>

              <input
                type="text"
                class="form-control form-control-sm"
                id="plataforma"
                value="${cp.plataforma || ''}"
                placeholder="Ejemplo: CV26-RIG-001"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Pozo
              </label>

              <input
                type="text"
                class="form-control form-control-sm"
                id="pozo"
                value="${cp.pozo || ''}"
                placeholder="Ejemplo: CVDD26-199"
              >
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-success text-white fw-semibold">
          <i class="fas fa-cloud-sun me-1"></i>
          Consumo de agua, turno día
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Medición inicial
              </label>

              <input
                type="number"
                step="any"
                class="form-control form-control-sm"
                id="dia_ini"
                value="${cp.dia_ini ?? 0}"
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Medición final
              </label>

              <input
                type="number"
                step="any"
                class="form-control form-control-sm"
                id="dia_fin"
                value="${cp.dia_fin ?? 0}"
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Consumo (m³)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="dia_consumo"
                readonly
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Consumo (L)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="dia_litros"
                readonly
              >
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-dark text-white fw-semibold">
          <i class="fas fa-cloud-moon me-1"></i>
          Consumo de agua, turno noche
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Medición inicial
              </label>

              <input
                type="number"
                step="any"
                class="form-control form-control-sm"
                id="noche_inicio"
                value="${cp.noche_ini ?? 0}"
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Medición final
              </label>

              <input
                type="number"
                step="any"
                class="form-control form-control-sm"
                id="noche_fin"
                value="${cp.noche_fin ?? 0}"
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Consumo (m³)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="noche_consumo"
                readonly
              >
            </div>

            <div class="col-md-3">
              <label class="form-label small text-muted">
                Consumo (L)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="noche_litros"
                readonly
              >
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-primary text-white fw-semibold">
          Totales calculados
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Consumo total (m³)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="edit_total_m3"
                readonly
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small text-muted">
                Consumo total (L)
              </label>

              <input
                type="text"
                class="form-control form-control-sm bg-light fw-bold"
                id="edit_total_litros"
                readonly
              >
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-header bg-secondary text-white fw-semibold">
          Responsable y comentario
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-12">
              <label class="form-label small text-muted">
                Responsable
              </label>

              <input
                type="text"
                class="form-control form-control-sm"
                id="resposable"
                value="${cp.responsable || ''}"
              >
            </div>

            <div class="col-12">
              <label class="form-label small text-muted">
                Comentario diario
              </label>

              <textarea
                class="form-control"
                id="comentario_pozo"
                rows="4"
                placeholder="Ingrese un comentario sobre el registro..."
              >${cp.comts_c_ag_pz || ''}</textarea>
            </div>

          </div>
        </div>
      </div>

    </form>
  `;

  const footer = `
    <div class="container-fluid border-top pt-3">
      <div class="row g-2">

        <div class="col-md-6 col-12">
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            id="btn_guardar_c_ag_pozo"
          >
            <i class="fas fa-save"></i>
            Guardar cambios
          </button>
        </div>

        <div class="col-md-6 col-12">
          <button
            type="button"
            class="btn btn-outline-danger w-100"
            data-bs-dismiss="modal"
          >
            <i class="fas fa-times-circle"></i>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  `;

  armar_formulario(ficha, footer);

  cbx_mes_res(cp.FK_mes);
  cbx_agencia(cp.FK_pro);
  cbx_maquina(cp.FK_maquina);
  cbx_ubicacion(cp.FK_ubicacion);

  recalcularEdicionAguaPozo();

});

//// funcion para recalcular los consumos en el modal de edicion por victor Alvarez
function recalcularEdicionAguaPozo() {

  const diaIni = parseFloat($('#dia_ini').val()) || 0;
  const diaFin = parseFloat($('#dia_fin').val()) || 0;

  const nocheIni = parseFloat($('#noche_inicio').val()) || 0;
  const nocheFin = parseFloat($('#noche_fin').val()) || 0;

  const consumoDia = diaFin - diaIni;
  const consumoNoche = nocheFin - nocheIni;

  const consumoDiaValido = consumoDia >= 0 ? consumoDia : 0;
  const consumoNocheValido = consumoNoche >= 0 ? consumoNoche : 0;

  const totalMetrosCubicos =
    consumoDiaValido + consumoNocheValido;

  const totalLitros = totalMetrosCubicos * 1000;

  $('#dia_consumo').val(consumoDiaValido.toFixed(2));
  $('#dia_litros').val((consumoDiaValido * 1000).toFixed(2));

  $('#noche_consumo').val(consumoNocheValido.toFixed(2));
  $('#noche_litros').val((consumoNocheValido * 1000).toFixed(2));

  $('#edit_total_m3').val(totalMetrosCubicos.toFixed(2));
  $('#edit_total_litros').val(totalLitros.toFixed(2));
}

$(document).on(
  'input',
  '#dia_ini, #dia_fin, #noche_inicio, #noche_fin',
  function () {
    recalcularEdicionAguaPozo();
  }
);


/// funcion para guardar los cambios en el modal de edicion por victor Alvarez
$(document).on('click', '#btn_guardar_c_ag_pozo', function () {

  const boton = $(this);

  const id = pk_registro;

  const fc_inicio = $('#fecha_inicio').val();
  const fc_cierre = $('#fecha_cierre').val();

  const mes = $('#cbx_mes_res').val();
  const agencia = $('#cbx_agencia').val();
  const maquina = $('#cbx_maquina').val();
  const ubicacion = $('#cbx_ubicacion').val();

  const plataforma = $('#plataforma').val().trim();
  const pozo = $('#pozo').val().trim();

  const dia_ini = $('#dia_ini').val();
  const dia_fin = $('#dia_fin').val();

  const noche_ini = $('#noche_inicio').val();
  const noche_fin = $('#noche_fin').val();

  const responsable = $('#resposable').val().trim();
  const comentario = $('#comentario_pozo').val().trim();

  if (!id) {
    mensaje('No se pudo identificar el registro.', 'error');
    return;
  }

  if (fc_inicio === '') {
    mensaje('La fecha de inicio es obligatoria.', 'warning');
    return;
  }

  if (fc_cierre === '') {
    mensaje('La fecha de cierre es obligatoria.', 'warning');
    return;
  }

  if (fc_inicio > fc_cierre) {
    mensaje(
      'La fecha de inicio no puede ser mayor que la fecha de cierre.',
      'warning'
    );
    return;
  }

  if (!mes) {
    mensaje('Selecciona el mes.', 'warning');
    return;
  }

  if (!agencia) {
    mensaje('Selecciona el proyecto.', 'warning');
    return;
  }

  if (!maquina) {
    mensaje('Selecciona la máquina.', 'warning');
    return;
  }

  if (!ubicacion) {
    mensaje('Selecciona la ubicación.', 'warning');
    return;
  }

  if (plataforma === '') {
    mensaje('Ingresa la plataforma.', 'warning');
    return;
  }

  if (pozo === '') {
    mensaje('Ingresa el pozo.', 'warning');
    return;
  }

  if (responsable === '') {
    mensaje('Ingresa el responsable.', 'warning');
    return;
  }

  if (
    dia_ini === '' ||
    dia_fin === '' ||
    noche_ini === '' ||
    noche_fin === ''
  ) {
    mensaje('Completa las mediciones de ambos turnos.', 'warning');
    return;
  }

  if (parseFloat(dia_fin) < parseFloat(dia_ini)) {
    mensaje(
      'La medición final del turno día no puede ser menor que la inicial.',
      'warning'
    );
    return;
  }

  if (parseFloat(noche_fin) < parseFloat(noche_ini)) {
    mensaje(
      'La medición final del turno noche no puede ser menor que la inicial.',
      'warning'
    );
    return;
  }

  $.ajax({
    url: '../DATABASE/up_c_ag_pozos.php',
    type: 'POST',
    dataType: 'json',

    data: {
      id,
      fc_inicio,
      fc_cierre,
      mes,
      agencia,
      maquina,
      ubicacion,
      plataforma,
      pozo,
      dia_ini,
      dia_fin,
      noche_ini,
      noche_fin,
      responsable,
      comentario
    },

    beforeSend: function () {
      boton.prop('disabled', true);
    },

    success: function (json) {
      mensaje(json.mensaje, json.status);

      if (!json.err) {
        $('#modal').modal('hide');

        c_aut_c_agua_pozos(url, params);
        total(t_url, params);
        cbx_fil_pozo();
      }
    },

    error: function (xhr, status, error) {
      console.error('Error al actualizar el registro:', error);
      console.error('Respuesta del servidor:', xhr.responseText);

      mensaje('No fue posible actualizar el registro.', 'error');
    },

    complete: function () {
      boton.prop('disabled', false);
    }
  });

});




/// calculo consumo dia
$(document).on('input', '#dia_fin, #dia_ini', function () {
  const dia_ini = parseFloat($('#dia_ini').val()) || 0;
  const dia_fin = parseFloat($('#dia_fin').val()) || 0;
  const consumo = dia_fin - dia_ini;
  const litros = consumo * 1000;
  $('#dia_consumo').val(consumo.toFixed(2));
  $('#dia_litros').val(litros.toFixed(2));

});

/// guardar consumo dia
let pk_registro = 0;

$(document).on('click', '#btn_gurdar_dia', function () {


  id = pk_registro;
  const dia_ini = $('#dia_ini').val().trim();
  const dia_fin = $('#dia_fin').val().trim();
  const consumo = $('#dia_consumo').val().trim();
  const litros = $('#dia_litros').val().trim();

  console.log('Datos a guardar:', { id, dia_ini, dia_fin, consumo, litros });

  // capturo datos del formulario


  if (dia_fin === dia_ini) return mensaje('La lectura final no puede ser igual a la inicial', 'warning');
  if (dia_ini < 0) return mensaje('La lectura inicial no puede ser negativa', 'warning');
  if (dia_fin < 0) return mensaje('La lectura final no puede ser negativa', 'warning');
  if (consumo < 0) return mensaje('El consumo no puede ser negativo', 'warning');
  if (litros < 0) return mensaje('Los litros no pueden ser negativos', 'warning');


  // envio de datos al  servidor

  $.post(
    '../DATABASE/up_dia_c_pozo.php',
    { id: id, dia_ini: dia_ini, dia_fin: dia_fin, consumo: consumo, litros: litros },
    function (response) {


      var json = JSON.parse(response);

      console.log('Respuesta del servidor:', response);
      mensaje(json.mensaje, json.status);
      c_aut_c_agua_pozos(url, params);

      // refrescar la tabla después de la actualización
    }
  );



});


/// turno noche
$(document).on('click', '#btn_t_noche', function () {
  // capturo el id del registro
  let view_info = $(this).closest('td');
  let id = view_info.attr('id');  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.id == parseInt(id));


  pk_registro = cp.id; // asignar a variable global si es necesario


  let ficha = `
        
      
          <hr>

            <!-- ================= TURNO NOCHE ================= -->
            <div class="mb-3">
              <h6 class="fw-bold text-success mb-2">
              Consumo de Agua – Turno Noche
              </h6>

              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Inicio Turno Noche</label>
                  <input type="number" id="noche_inicio" value="${cp.dia_fin}" class="form-control form-control-sm" name="noche_inicio" placeholder="Lectura inicial">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Fin Turno Noche</label>
                  <input type="number" id="noche_fin" value="${cp.noche_fin}" class="form-control form-control-sm" name="noche_fin" placeholder="Lectura final">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Noche (m³)</label>
                  <input type="text" class="form-control form-control-sm" id="noche_consumo" name="noche_consumo" readonly>
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Noche (L)</label>
                  <input type="text" class="form-control form-control-sm" id="noche_litros" name="noche_litros" readonly>
                </div>
              </div>
            </div>

            <hr>`;
  var footer = `
      <div class="container-fluid border-top pt-3" >
        <div class="row g-2">





          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-primary w-100" id="btn_gurdar_noche">
            <i class="fas fa-save"></i>  Guardar Registro
            </button>
          </div>


      <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
              <i class="fas fa-times-circle"></i> Cerrar
            </button>
          </div>

        </div>
      </div>
      `;

  armar_formulario(ficha, footer);
});



/// calculo consumo noche

/// calculo consumo dia
$(document).on('input', '#noche_fin, #noche_inicio', function () {
  const noche_ini = parseFloat($('#noche_inicio').val()) || 0;
  const noche_fin = parseFloat($('#noche_fin').val()) || 0;
  const consumo = noche_fin - noche_ini;
  const litros = consumo * 1000;
  $('#noche_consumo').val(consumo.toFixed(2));
  $('#noche_litros').val(litros.toFixed(2));

});


/// guardar turno noche


$(document).on('click', '#btn_gurdar_noche', function () {


  id = pk_registro;
  const noche_ini = $('#noche_inicio').val().trim();
  const noche_fin = $('#noche_fin').val().trim();
  const consumo = $('#noche_consumo').val().trim();
  const litros = $('#noche_litros').val().trim();

  console.log('Datos a guardar:', { id, noche_ini, noche_fin, consumo, litros });

  // capturo datos del formulario


  if (noche_fin === noche_ini) return mensaje('La lectura final no puede ser igual a la inicial', 'warning');
  if (noche_ini < 0) return mensaje('La lectura inicial no puede ser negativa', 'warning');
  if (noche_fin < 0) return mensaje('La lectura final no puede ser negativa', 'warning');
  if (consumo < 0) return mensaje('El consumo no puede ser negativo', 'warning');
  if (litros < 0) return mensaje('Los litros no pueden ser negativos', 'warning');


  // envio de datos al  servidor

  $.post(
    '../DATABASE/up_noche_c_pozo.php',
    { id: id, noche_ini: noche_ini, noche_fin: noche_fin, consumo: consumo, litros: litros },
    function (response) {


      var json = JSON.parse(response);

      console.log('Respuesta del servidor:', response);
      mensaje(json.mensaje, json.status);
      c_aut_c_agua_pozos(url, params);

      // refrescar la tabla después de la actualización
    }
  );



});



// generacion de pdf

$(document).on('click', '#btn_pdf', function () {





  if (!llenar_tabla) {
    console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_agua_pz.php',
    type: 'POST',
    data: { cp: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: 'blob' },
    success: function (blob) {
      if (blob.size === 0) {
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-AGUA-POZOS.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function (xhr, status, error) {
      console.error('Error AJAX:', error);
    }
  });

});




// exportar a excel



$("#btn_export_excel").on("click", function () {

  $.ajax({
    url: "../EXCEL/RP_C_A_PZ.php",
    type: "POST",
    data: { data: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: "blob" },

    success: function (blob) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "EC-HSE-F-53-AGUA-POZOS.xls";
      link.click();
    }
  });

});



/// filtros 

//// 

function fil_mes() {
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_mes').empty();
        $('#cbx_fil_mes').append('<option value="">MES</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_mes + '">' + item.mes_res + '</option>';
            $('#cbx_fil_mes').append(option);
          }
        });
      }
    }
  });
}


function cbx_fil_ag() {
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_ag').empty();
        $('#cbx_fil_ag').append('<option value="">AGENCIA</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_pro + '">' + item.proyecto + '</option>';
            $('#cbx_fil_ag').append(option);
          }
        });
      }
    }
  });
}

/// cargar cbx maquina

function cbx_fil_mq() {
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_mq').empty();
        $('#cbx_fil_mq').append('<option value="">MAQUINA</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_maquina + '">' + item.serie_maquina + '</option>';
            $('#cbx_fil_mq').append(option);
          }
        });
      }
    }
  });
}

/// cargar cbx pozo por victor Alvarez
function cbx_fil_pozo() {
  $.ajax({
    url: '../DATABASE/cbx_pozos_agua.php',
    type: 'POST',
    dataType: 'json',

    success: function (json) {
      $('#cbx_fil_pozo').empty();

      $('#cbx_fil_pozo').append(
        '<option value="">POZO</option>'
      );

      if (json.err) {
        console.warn(json.mensaje);
        return;
      }

      $.each(json, function (i, item) {
        if (i !== 'err') {
          var option =
            '<option value="' +
            item.pozo +
            '">' +
            item.pozo +
            '</option>';

          $('#cbx_fil_pozo').append(option);
        }
      });
    },

    error: function (xhr, status, error) {
      console.error('Error al cargar los pozos:', error);
      console.error('Respuesta del servidor:', xhr.responseText);
    }
  });
}

/// ejecucion del filtro 
/// FILTROS

function verificacar_filtro() {

  /// vaibles de archivo y parametros de busqueda 
  const url = '../DATABASE/fil_c_ag_pozos.php';
  let t_url = '../DATABASE/fil_totales_agua_pozo.php';// URL estándar
  let params = {};


  /// variables de busqueda
  const mes = $('#cbx_fil_mes').val();
  const agencia = $('#cbx_fil_ag').val();
  const mq = $('#cbx_fil_mq').val();
  const pozo = $('#cbx_fil_pozo').val();

  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_fil_ag').attr('name');
  const campo3 = $('#cbx_fil_mq').attr('name');


  // Agregar filtros solo si tienen valor
  if (mes) {
    params.mes = mes;
    params.campo1 = campo1;
  }

  if (agencia) {
    params.agencia = agencia;
    params.campo2 = campo2;
  }

  if (mq) {
    params.mq = mq;
    params.campo3 = campo3;
  }

  // Agregar filtro de pozo solo si tiene valor por victor Alvarez
  if (pozo) {
    params.pozo = pozo;
  }



  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }

  console.log('Filtros enviados:', params);

  c_aut_c_agua_pozos(url, params);
  total(t_url, params)

}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro();


});


let t_url = '../DATABASE/fil_totales_agua_pozo.php';

function total(t_url, params) {

  $.post(t_url, params, function (r) {

    $('#resumen_totales').empty();

    console.log('Respuesta total:', r);

    if (r.err) {
      $('#resumen_totales').html(`
        <div class="col-12">
          <div class="alert alert-info mb-0">
            No existen valores para los filtros seleccionados.
          </div>
        </div>
      `);

      return;
    }

    $.each(r, function (i, item) {

      if (i !== 'err') {

        const litros = Number(item.t_lit_apz ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const metrosCubicos = Number(item.t_m3_apz ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const totales = `
          <div class="col-12 col-md-6">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">
                Litros
              </small>

              <span class="fw-bold text-primary">
                ${litros} L
              </span>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="border border-success rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">
                Metros cúbicos
              </small>

              <span class="fw-bold text-success">
                ${metrosCubicos} m³
              </span>
            </div>
          </div>
        `;

        $('#resumen_totales').append(totales);
      }
    });

  }, 'json').fail(function () {

    $('#resumen_totales').html(`
      <div class="col-12">
        <div class="alert alert-danger mb-0">
          No fue posible calcular las sumatorias.
        </div>
      </div>
    `);

  });

}