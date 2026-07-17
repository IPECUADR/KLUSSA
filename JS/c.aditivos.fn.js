$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

    let url = '../DATABASE/cg_c_aditivos.php';
    let params = {};

    c_adtivos(url, params);
    total_aditivos(params);


    /// DEPENDENCIAS DE FILTROS
    cbx_fil_ag();
    fil_mes();
    cbx_fil_mq();
    cbx_fil_adt();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

/// variables de entorno
let url = '../DATABASE/cg_c_aditivos.php';
let params = {};
let llenar_tabla = [];
let pk_registro_aditivo = 0;



function c_adtivos(url, params) {




  $.ajax({

    type: 'POST',
    url: url,
    data: params,

    success: function (response) {
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      var json = JSON.parse(response);




      if (!json.err) {
        var contador = 1;

        $.each(json, function (i, item) {






          if (i != "err") {








            var codigo = `
              <tr>

                <td>${contador}</td>
                 <td>${item.fr}</td>
                 <td>${item.mes}</td>
                 <td>${item.mq}</td>
                 <td>${item.pz}</td>
                 <td>${item.ad}</td>   
                  <td>  <span class="badge bg-success-subtle text-success">${item.kg}</span></td>
                  <td>  <span class="badge bg-success-subtle text-success">${item.lt}</span></td>
                  <td>${item.pro}</td>
                  <td>${item.rp}</td>
           
                
             
                  <td id="${item.id}">

                 
                  
                    <button
                      type="button"
                      class="btn btn-primary btn-sm mb-1 mt-1"
                      id="btn_editar_aditivo"
                      title="Editar registro">
                      <i class="fas fa-edit"></i>
                    </button>
                    
                  
                    <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1" title="Eliminar registro">
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

        mensaje(json.mensaje, 'info');

      }
    }
  })


}

/// mostrar datos en  el  sistema







$(document).on('click', '#bnt_reg', function () {


  $('#modal').modal('show');


  cbx_mes_res();
  cbx_agencia();
  modal_insert();
  cbx_maquina();
  cbx_aditivos();

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

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      <!-- ================= DATOS GENERALES ================= -->
      <div class="mb-4">
        <h6 class="fw-semibold text-secondary mb-3">
          Datos Generales
        </h6>

        <div class="row g-3">

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">FECHA</label>
            <input type="date" class="form-control form-control-sm" id="fc_reg" name="fc_reg">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">MES</label>
            <select class="form-select form-select-sm" id="cbx_mes_res" name="cbx_mes_res"></select>
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">MAQUINA</label>
            <select class="form-select form-select-sm" id="cbx_maquina" name="cbx_maquina"></select>
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">POZO</label>
            <input type="text" class="form-control form-control-sm" id="pz" name="pz">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">AGENCIA</label>
            <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">ADITIVO</label>
            <select class="form-select form-select-sm" id="cbx_aditivo" name="cbx_aditivo"></select>
          </div>

        </div>
      </div>

      <!-- ================= CONSUMOS ================= -->
      <div class="mb-4">
        <h6 class="fw-semibold text-secondary mb-3">
          Consumo
        </h6>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">CONSUMO KG</label>
            <input type="number" step="0.01" min="0" class="form-control form-control-sm" id="c_kg" name="c_kg" placeholder="0.00">
          </div>

          <div class="col-md-6">
            <label class="form-label small fw-semibold text-muted">CONSUMO L</label>
            <input type="number" step="0.01" min="0" class="form-control form-control-sm" id="c_lit" name="c_lit" placeholder="0.00">
          </div>
        </div>
      </div>

      <!-- ================= RESPONSABLE ================= -->
      <div>
      

        <div class="row">
          <div class="col-12">
            <label class="form-label small fw-semibold text-muted">RESPONSABLE</label>
            <input type="text" class="form-control form-control-sm" name="responsable" id="resposable" placeholder="Katty Conforme">
          </div>
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


//Funcion para controlar la unidad de consumo de aditivos por Victor Alvarez, bloqueando el campo de litros si se ingresa un valor en kg y viceversa.
function controlarUnidadAditivo(
  selectorKg,
  selectorLitros
) {
  const campoKg = $(selectorKg);
  const campoLitros = $(selectorLitros);

  const kg = Number(campoKg.val()) || 0;
  const litros = Number(campoLitros.val()) || 0;

  if (kg > 0) {
    campoLitros
      .val('')
      .prop('disabled', true)
      .attr(
        'title',
        'El campo Litros está bloqueado porque se ingresó un consumo en KG.'
      );

    campoKg
      .prop('disabled', false)
      .removeAttr('title');

    return;
  }

  if (litros > 0) {
    campoKg
      .val('')
      .prop('disabled', true)
      .attr(
        'title',
        'El campo KG está bloqueado porque se ingresó un consumo en Litros.'
      );

    campoLitros
      .prop('disabled', false)
      .removeAttr('title');

    return;
  }

  campoKg
    .prop('disabled', false)
    .removeAttr('title');

  campoLitros
    .prop('disabled', false)
    .removeAttr('title');
}

/* Control de unidad en el formulario registrar*/
$(document).on('input', '#c_kg, #c_lit', function () {
  controlarUnidadAditivo('#c_kg', '#c_lit');
});

/* Control de unidad en el formulario editar registro*/
$(document).on(
  'input',
  '#edit_kg_aditivo, #edit_litros_aditivo',
  function () {
    controlarUnidadAditivo(
      '#edit_kg_aditivo',
      '#edit_litros_aditivo'
    );
  }
);

//Funcion para formulario de editar registro de consumo de aditivos por victor alvarez
$(document).on('click', '#btn_editar_aditivo', function () {

  const celda = $(this).closest('td');
  const id = celda.attr('id');

  const cp = llenar_tabla.find(function (item) {
    return String(item.id) === String(id);
  });

  if (!cp) {
    mensaje('No se encontró la información del registro.', 'error');
    return;
  }

  pk_registro_aditivo = cp.id;

  $('#titulo_modal').empty();
  $('#form_modal').empty();
  $('#form_modal_footer').empty();

  const titulo = `
    <div class="container-fluid py-2 border-bottom">
      <div class="row align-items-center">

        <div class="col-3 d-flex align-items-center">
          ../IMAGE/lg.png
        </div>

        <div class="col-6 text-center">
          <span class="fw-semibold" style="font-size:0.95rem;">
            EDITAR CONSUMO DE ADITIVOS
          </span>
        </div>

        <div class="col-3 text-end">
          <small class="text-light opacity-75 fw-semibold">
            EC-HSE-F-53
          </small>
        </div>

      </div>
    </div>

    <button
      type="button"
      class="btn btn-link text-danger p-0"
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      <i class="fa-solid fa-xmark fa-lg"></i>
    </button>
  `;

  const formulario = `
    <form id="form_editar_aditivo" class="container-fluid py-3">

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-secondary text-white fw-semibold">
          Datos generales
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label small fw-semibold text-muted">
                Fecha
              </label>

              <input
                type="date"
                class="form-control form-control-sm"
                id="edit_fecha_aditivo"
                value="${cp.fr || ''}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small fw-semibold text-muted">
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
              <label class="form-label small fw-semibold text-muted">
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
              <label class="form-label small fw-semibold text-muted">
                Pozo
              </label>

              <input
                type="text"
                class="form-control form-control-sm"
                id="edit_pozo_aditivo"
                value="${cp.pz || ''}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small fw-semibold text-muted">
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
              <label class="form-label small fw-semibold text-muted">
                Aditivo
              </label>

              <select
                class="form-select form-select-sm"
                id="cbx_aditivo"
              >
                <option value="">Cargando...</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-success text-white fw-semibold">
          Consumo
        </div>

        <div class="card-body">
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label small fw-semibold text-muted">
                Consumo en kg
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                class="form-control form-control-sm"
                id="edit_kg_aditivo"
                value="${cp.kg ?? 0}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label small fw-semibold text-muted">
                Consumo en litros
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                class="form-control form-control-sm"
                id="edit_litros_aditivo"
                value="${cp.lt ?? 0}"
              >
            </div>

          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-header bg-primary text-white fw-semibold">
          Responsable
        </div>

        <div class="card-body">
          <label class="form-label small fw-semibold text-muted">
            Responsable
          </label>

          <input
            type="text"
            class="form-control form-control-sm"
            id="edit_responsable_aditivo"
            value="${cp.rp || ''}"
          >
        </div>
      </div>

    </form>
  `;

  const pie = `
    <div class="container-fluid border-top pt-3">
      <div class="row g-2">

        <div class="col-md-6 col-12">
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            id="btn_guardar_edicion_aditivo"
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

  $('#titulo_modal').append(titulo);
  $('#form_modal').append(formulario);
  $('#form_modal_footer').append(pie);

  $('#modal').modal('show');

  cbx_mes_res(cp.FK_mes);
  cbx_maquina(cp.FK_maquina);
  cbx_agencia(cp.FK_pro);
  cbx_aditivos(cp.FK_ad_rs);

  controlarUnidadAditivo(
    '#edit_kg_aditivo',
    '#edit_litros_aditivo'
  );

});


//Funcion para el guardado de la edicion de registro de consumo de aditivos por victor alvarez
$(document).on('click', '#btn_guardar_edicion_aditivo', function () {

  const boton = $(this);

  const id = pk_registro_aditivo;
  const fecha = $('#edit_fecha_aditivo').val();
  const mes = $('#cbx_mes_res').val();
  const maquina = $('#cbx_maquina').val();
  const pozo = $('#edit_pozo_aditivo').val().trim();
  const proyecto = $('#cbx_agencia').val();
  const aditivo = $('#cbx_aditivo').val();
  const kg = $('#edit_kg_aditivo').prop('disabled') ? '0' : ($('#edit_kg_aditivo').val().trim() || '0');
  const litros = $('#edit_litros_aditivo').prop('disabled') ? '0' : ($('#edit_litros_aditivo').val().trim() || '0');
  const responsable = $('#edit_responsable_aditivo').val().trim();

  if (!id) {
    mensaje('No se pudo identificar el registro.', 'error');
    return;
  }

  if (fecha === '') {
    mensaje('La fecha es obligatoria.', 'warning');
    return;
  }

  if (!mes) {
    mensaje('Selecciona el mes.', 'warning');
    return;
  }

  if (!maquina) {
    mensaje('Selecciona la máquina.', 'warning');
    return;
  }

  if (pozo === '') {
    mensaje('El pozo es obligatorio.', 'warning');
    return;
  }

  if (!proyecto) {
    mensaje('Selecciona el proyecto.', 'warning');
    return;
  }

  if (!aditivo) {
    mensaje('Selecciona el aditivo.', 'warning');
    return;
  }


  const kgNumero = Number(kg);
  const litrosNumero = Number(litros);

  if (
    !Number.isFinite(kgNumero) ||
    !Number.isFinite(litrosNumero)
  ) {
    mensaje(
      'Los consumos deben ser valores numéricos.',
      'warning'
    );
    return;
  }

  if (kgNumero < 0 || litrosNumero < 0) {
    mensaje(
      'Los consumos no pueden ser negativos.',
      'warning'
    );
    return;
  }

  if (kgNumero === 0 && litrosNumero === 0) {
    mensaje(
      'Ingresa un consumo mayor que cero en kg o litros.',
      'warning'
    );
    return;
  }

  if (responsable === '') {
    mensaje('El responsable es obligatorio.', 'warning');
    return;
  }

  $.ajax({
    url: '../DATABASE/up_c_aditivos.php',
    type: 'POST',
    dataType: 'json',

    data: {
      id,
      fecha,
      mes,
      maquina,
      pozo,
      proyecto,
      aditivo,
      kg,
      litros,
      responsable
    },

    beforeSend: function () {
      boton.prop('disabled', true);
    },

    success: function (json) {

      mensaje(json.mensaje, json.status);

      if (!json.err) {
        boton.trigger('blur');
        $('#modal').modal('hide');

        c_adtivos(url, params);
        total_aditivos(params);
      }

    },

    error: function (xhr, status, error) {
      console.error('Error al actualizar aditivo:', error);
      console.error('Respuesta del servidor:', xhr.responseText);

      mensaje(
        'No fue posible actualizar el registro.',
        'error'
      );
    },

    complete: function () {
      boton.prop('disabled', false);
    }
  });

});


// funciones de cbx para llenar selects
function cbx_mes_res(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',

    success: function (response) {
      const json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_mes_res').empty();
        $('#cbx_mes_res').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            const option = `
              <option value="${item.PK_mes}">
                ${item.mes_res}
              </option>
            `;

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













function cbx_agencia(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',

    success: function (response) {
      const json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_agencia').empty();
        $('#cbx_agencia').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            const option = `
              <option value="${item.PK_pro}">
                ${item.proyecto}
              </option>
            `;

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


//Funcion para llenar el select de maquinas
function cbx_maquina(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',

    success: function (response) {
      const json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_maquina').empty();
        $('#cbx_maquina').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            const option = `
              <option value="${item.PK_maquina}">
                ${item.serie_maquina}
              </option>
            `;

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

//Funcion para llenar el select de aditivos
function cbx_aditivos(valorSeleccionado = '') {
  $.ajax({
    url: '../DATABASE/cbx_aditivos.php',
    type: 'POST',

    success: function (response) {
      const json = JSON.parse(response);

      if (!json.err) {
        $('#cbx_aditivo').empty();
        $('#cbx_aditivo').append(
          '<option value="">SELECCIONE UNA OPCIÓN</option>'
        );

        $.each(json, function (i, item) {
          if (i !== 'err') {
            const option = `
              <option value="${item.PK_ad}">
                ${item.ad_rs}
              </option>
            `;

            $('#cbx_aditivo').append(option);
          }
        });

        if (valorSeleccionado !== '') {
          $('#cbx_aditivo').val(String(valorSeleccionado));
        }
      }
    }
  });
}









$(document).on('click', '#btn_registro', function () {

  // capturo datos del formulario

  const agencia = $('#cbx_agencia').val().trim();
  const mes = $('#cbx_mes_res').val().trim();
  const fc_reg = $('#fc_reg').val().trim();
  const pozo = $('#pz').val().trim();
  const ad = $('#cbx_aditivo').val().trim();
  const lit = $('#c_lit').prop('disabled') ? '0' : ($('#c_lit').val().trim() || '0');
  const kg = $('#c_kg').prop('disabled') ? '0' : ($('#c_kg').val().trim() || '0');
  const mq = $('#cbx_maquina').val().trim();
  const responsable = $('#resposable').val().trim();
  const kgNumero = Number(kg);
  const litrosNumero = Number(lit);

  //  valor de  la  descripcion  del  residuo


  if (fc_reg.length === 0) return mensaje('La fecha  es obligatoria', 'warning');
  if (pozo.length === 0) return mensaje('El pozo es obligatoria', 'warning');
  if (agencia.length === 0) return mensaje('La agencia es obligatoria', 'warning');
  if (mes.length === 0) return mensaje('El mes es obligatorio', 'warning');
  if (ad.length === 0) return mensaje('El aditivo es obligatorio', 'warning');


  if (!Number.isFinite(kgNumero) || !Number.isFinite(litrosNumero)) {
    return mensaje(
      'Los consumos en kg y litros deben ser numéricos.',
      'warning'
    );
  }

  if (kgNumero < 0 || litrosNumero < 0) {
    return mensaje(
      'Los consumos no pueden ser negativos.',
      'warning'
    );
  }

  if (kgNumero === 0 && litrosNumero === 0) {
    return mensaje(
      'Ingresa un consumo mayor que cero en kg o litros.',
      'warning'
    );
  }

  if (kgNumero > 0 && litrosNumero > 0) {
    return mensaje(
      'Ingresa el consumo solamente en KG o solamente en Litros.',
      'warning');
  }
  if (mq.length === 0) return mensaje('La maquina es obligatoria', 'warning');
  if (responsable.length === 0) return mensaje('El responsable es obligatorio', 'warning');




  /// validdacion, si los campos estan vacios


  // envio de datos al  servidor

  $.ajax({
    url: '../DATABASE/intert_c_aditivo.php',
    type: 'POST',
    dataType: 'json',
    data: { fc_reg, pozo, agencia, mes, ad, kg, lit, mq, responsable },

    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },


    success: function (json) {

      console.log('Respuesta del registro:', json);

      if (!json.err) {
        mensaje(json.mensaje, 'success');

        c_adtivos(url, params);
        total_aditivos(params);
        $('#btn_registro').trigger('blur');
        $('#modal').modal('hide');
      } else {
        mensaje(json.mensaje, 'error');
      }

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
      $.post('../DATABASE/del_c_aditivo.php', {


        id_delete: id


      })
        .done(function (response) {

          const res = JSON.parse(response);
          console.log(response);

          mensaje(res.mensaje, res.status);

          if (res.status === 'success') {

            c_adtivos(url, params);
            total_aditivos(params);

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

$(document).on('click', '#btn_t_dia', function () {

  // capturo el id del registro
  let view_info = $(this).closest('td');
  let id = view_info.attr('id');  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.id == parseInt(id));


  pk_registro = cp.id; // asignar a variable global si es necesario


  let ficha = `



<div class="p-4 border rounded-4 bg-white shadow-sm">

<div class="mb-4 pb-2 border-bottom">
  <h6 class="fw-semibold text-uppercase text-secondary mb-1">
    Consumo de energía
  </h6>
  <div class="small text-muted">
    <span class="fw-semibold">${cp.mes}</span>
    <span class="mx-1">|</span>
     <span class="fw-semibold">${cp.pro}</span>
  </div>
</div>


  <div class="d-flex align-items-center py-2 border-bottom">
    <label class="fw-semibold text-secondary me-3" style="min-width:130px;">
      Mes
    </label>
    <input type="text" id="mes_res" name="FK_mes"
      class="form-control-plaintext flex-grow-1 text-end fw-bold text-dark"
      value="${cp.mes}" readonly>
    <button class="btn btn-sm text-muted border-0 ms-2" type="button" id="edit_select">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  <!-- Lectura -->
  <div class="d-flex align-items-center py-2 border-bottom">
    <label class="fw-semibold text-secondary me-3" style="min-width:130px;">
      Lectura
    </label>
    <input type="text" id="c_en_ag"
      class="form-control-plaintext flex-grow-1 text-end text-dark"
      value="${cp.c}" readonly>
    <button class="btn btn-sm text-muted border-0 ms-2" type="button" id="edit">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  <!-- Fecha inicio -->
  <div class="d-flex align-items-center py-2 border-bottom">
    <label class="fw-semibold text-secondary me-3" style="min-width:130px;">
      Fecha inicio
    </label>
    <input type="text" id="fc_in_en_ag"
      class="form-control-plaintext flex-grow-1 text-end text-dark"
      value="${cp.fi}" readonly>
    <button class="btn btn-sm text-muted border-0 ms-2" type="button" id="edit">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  <!-- Fecha fin -->
  <div class="d-flex align-items-center py-2 border-bottom">
    <label class="fw-semibold text-secondary me-3" style="min-width:130px;">
      Fecha fin
    </label>
    <input type="text" id="fc_fn_en_ag"
      class="form-control-plaintext flex-grow-1 text-end text-dark"
      value="${cp.fn}" readonly>
    <button class="btn btn-sm text-muted border-0 ms-2" type="button" id="edit">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  <!-- Agencia -->
  <div class="d-flex align-items-center py-2 border-bottom">
    <label class="fw-semibold text-secondary me-3" style="min-width:130px;">
      Responsable
    </label>
    <input type="text" id="rp_rg_en_ag"
      class="form-control-plaintext flex-grow-1 text-end text-dark"
      value="${cp.p}" readonly>
    <button class="btn btn-sm text-muted border-0 ms-2" type="button" id="edit">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  <!-- Responsable -->
  <div class="d-flex align-items-center pt-3 mt-2">
    <label class="fw-semibold text-uppercase text-muted me-3" style="min-width:130px;">
      Agencia
    </label>
    <input type="text" id="agencia" name="FK_ag"
      class="form-control-plaintext flex-grow-1 text-end fw-bold text-primary"
      value="${cp.pro}" readonly>
    <button class="btn btn-sm text-primary border-0 ms-2" type="button" id="edit_select">
      <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

</div>


`;


  var footer = `
      <div class="container-fluid border-top pt-3" >
        <div class="row g-2">





          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-info w-100" id="btn_gurdar_dia">
          <i class="fas fa-file-pdf"></i> Generar PDF
            </button>
          </div>


      <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
             <i class="fas fa-store-slash"></i> Cerrar
            </button>
          </div>

        </div>
      </div>
      `;


  armar_formulario(ficha, footer);






});






// generacion de pdf

$(document).on('click', '#btn_pdf', function () {

  var delete_info = $(this)[0].parentElement;
  id = $(delete_info).attr("id");

  let cp = llenar_tabla.find(item => item.id == parseInt(id));

  if (!cp) {
    console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_energia_rp.php',
    type: 'POST',
    data: { cp: JSON.stringify(cp) },
    xhrFields: { responseType: 'blob' },
    success: function (blob) {
      if (blob.size === 0) {
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-RESIDUOS_PELIGROSOS.pdf';
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

///


// generacion de pdf

$(document).on('click', '#btn_pdf_g', function () {



  if (!llenar_tabla) {
    console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_aditivos.php',
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
      a.download = 'EC-HSE-F-53-CONSUMO_ADITIVOS.pdf';
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

///


/// editar imputs 

$(document).on('click', '#edit', function () {

  var input = $(this).siblings('input'); // busca el input hermano


  if (input.prop('readonly')) {

    input.prop('readonly', false);

    $(this).attr('title', 'Guardar fecha');
    $(this).find('i').removeClass('fa-pencil').addClass('fa-floppy-disk');


  } else {

    input.prop('readonly', true);
    $(this).attr('title', 'Editar fecha');
    $(this).find('i').removeClass('fa-floppy-disk').addClass('fa-pencil');


    // Aquí puedes agregar la lógica para guardar la nueva fecha en la base de datos si es necesario

    var campo = input.attr('id');
    update_dato = input.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);

    if (update_dato.length === 0) {
      mensaje('El campo no puede estar vacío', 'warning');
      return;


    }

    $.post(
      '../DATABASE/up_c_en_im.php',
      { campo: campo, update_dato: update_dato, id: pk_registro },
      function (response) {


        var json = JSON.parse(response);

        console.log('Respuesta del servidor:', response);
        mensaje(json.mensaje, json.status);
        c_energia_sedes(); // refrescar la tabla después de la actualización
      }
    );


  }


});

//// editar selects 


id_elemento = '';
// editar  select
$(document).on('click', '#edit_select', function () {



  var input = $(this).siblings('input');
  id_elemento = input.attr('id');
  var name = input.attr('name');
  console.log('Campo a editar:', name);

  // Ejecutar función cbx_<campo>
  var cargar_cbx = `cbx_${id_elemento}`;

  if (typeof window[cargar_cbx] === "function") {
    window[cargar_cbx]();
  } else {
    console.log("Función no encontrada:", cargar_cbx);
    return;
  }

  // Crear select
  var select = `
        <select class="form-control-plaintext form-control-sm" id="cbx_${id_elemento}" name="${name}"></select>
    `;

  // Botón que aparecerá junto al select
  var botonGuardar = `
        <button type="button" class="btn btn-success btn-sm ml-2" id="btn_guardar">
            <i class="fa-solid fa-check"></i>
        </button>
    `;


  // Reemplazar input → select
  input.replaceWith(select);

  // Insertar botón después del select
  $(this).after(botonGuardar);

});


// Guardar selección del select editado
$(document).on('click', '#btn_guardar', function () {
  var select = $(this).siblings('select');
  var name = select.attr('name');
  let newText = select.find("option:selected").text();

  id_reg = select.val();

  if (id_reg.length === 0) {
    mensaje('Debes seleccionar una opción', 'warning');

  } else {


    $.post(
      '../DATABASE/up_c_en.php',
      { campo: name, update_dato: id_reg, id: pk_registro },
      function (response) {


        var json = JSON.parse(response);

        console.log('Respuesta del servidor:', response);
        mensaje(json.mensaje, json.status);
        c_energia_sedes(); // refrescar la tabla después de la actualización
      }
    );


  }



  imput_replace = `<input type="text" class="form-control-plaintext" name="${name}" id="${id_elemento}" value="${newText}" readonly>`;
  console.log(imput_replace);

  select.replaceWith(imput_replace);
  $(this).remove();


});


// exportar a excel



$("#btn_excel").on("click", function () {

  $.ajax({
    url: "../EXCEL/RP_C_AD.php",
    type: "POST",
    data: { data: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: "blob" },

    success: function (blob) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "EC-HSE-F-53-CONSUMO_ADITIVOS.xls";
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



function cbx_fil_adt() {
  $.ajax({
    url: '../DATABASE/cbx_aditivos.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_adt').empty();
        $('#cbx_fil_adt').append('<option value="">ADITIVO</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_ad + '">' + item.ad_rs + '</option>';
            $('#cbx_fil_adt').append(option);
          }
        });
      }
    }
  });
}





/// ejecucion del filtro 
/// FILTROS

/// ejecucion del filtro 
/// FILTROS

function verificacar_filtro() {

  /// vaibles de archivo y parametros de busqueda 
  url = '../DATABASE/fil_c_aditivos.php';
  params = {};


  /// variables de busqueda
  const mes = $('#cbx_fil_mes').val();
  const agencia = $('#cbx_fil_ag').val();
  const adt = $('#cbx_fil_adt').val();
  const mq = $('#cbx_fil_mq').val();

  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_fil_ag').attr('name');
  const campo3 = $('#cbx_fil_adt').attr('name');
  const campo4 = $('#cbx_fil_mq').attr('name');


  // Agregar filtros solo si tienen valor
  if (mes) {
    params.mes = mes;
    params.campo1 = campo1;
  }

  if (agencia) {
    params.agencia = agencia;
    params.campo2 = campo2;
  }
  if (adt) {
    params.adt = adt;
    params.campo3 = campo3;
  }

  if (mq) {
    params.mq = mq;
    params.campo4 = campo4;
  }



  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }

  console.log('Filtros enviados:', params);

  c_adtivos(url, params);
  total_aditivos(params);

}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro();


});

// funcion para calcular totales de aditivos por victor alvarez
function total_aditivos(params = {}) {

  $.ajax({
    url: '../DATABASE/fil_totales_aditivos.php',
    type: 'POST',
    dataType: 'json',
    data: params,

    success: function (json) {

      const contenedor = $('#resumen_totales_aditivos');

      contenedor.empty();

      console.log('Totales de aditivos:', json);

      if (json.err) {
        contenedor.html(`
          <div class="col-12">
            <div class="alert alert-info mb-0">
              ${json.mensaje || 'No existen valores para los filtros seleccionados.'}
            </div>
          </div>
        `);

        return;
      }

      const kilogramos = Number(json.total_kg ?? 0).toLocaleString(
        'es-EC',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

      const litros = Number(json.total_litros ?? 0).toLocaleString(
        'es-EC',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

      contenedor.html(`
        <div class="col-12 col-md-6">
          <div class="border border-success rounded-3 p-3 h-100 bg-light">
            <small class="text-muted d-block mb-1">
              Kilogramos
            </small>

            <span class="fw-bold text-success">
              ${kilogramos} kg
            </span>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="border border-primary rounded-3 p-3 h-100 bg-light">
            <small class="text-muted d-block mb-1">
              Litros
            </small>

            <span class="fw-bold text-primary">
              ${litros} L
            </span>
          </div>
        </div>
      `);

    },

    error: function (xhr, status, error) {
      console.error('Error al calcular totales de aditivos:', error);
      console.error('Respuesta del servidor:', xhr.responseText);

      $('#resumen_totales_aditivos').html(`
        <div class="col-12">
          <div class="alert alert-danger mb-0">
            No fue posible calcular las sumatorias.
          </div>
        </div>
      `);
    }
  });
}