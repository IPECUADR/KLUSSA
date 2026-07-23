let llenar_tabla = [];

const rolUsuario = Number($('#rol_usuario').val() || 0);

const puedeAdministrarAditivos =
  rolUsuario === 1 || rolUsuario === 2;

$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

    // url de carga
    cargarAditivos();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

function cargarAditivos() {




  $.ajax({

    type: 'POST',

    url: '../DATABASE/cg_aditivos.php',

    success: function (response) {
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');


      var json = JSON.parse(response);


      if (!json.err) {

        var contador = 1;

        $.each(json, function (i, item) {







          if (i != "err") {


            const botonesAccion = puedeAdministrarAditivos
              ? `
                  <button
                    type="button"
                    class="btn btn-primary btn-sm mb-1 mt-1"
                    id="btn_editar_aditivo_maestro"
                    title="Editar aditivo"
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-danger btn-sm mb-1 mt-1"
                    id="btn_delete"
                    title="Eliminar aditivo"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                `
              : `
                  <span class="badge bg-secondary">
                    Solo consulta
                  </span>
                `;





            var codigo = `
              <tr>
                <td>${contador}</td>
                <td>${item.ad_rs}</td>

       
                <td
                  id="${item.PK_ad}"
                  data-nombre="${item.ad_rs}"
                >
                  ${botonesAccion}
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



$(document).on('click', '#bnt_reg', function (event) {

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
   
     <div class="container mt-2">
  <div class="card shadow-sm border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fas fa-vial me-2"></i>REGISTRAR ADITIVO 
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

        
        


        <form id="form_tipo_residuo">


    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">NOMBRE ADITIVO </label>
        <input type="text" class="form-control" id="ad_reg" name="aditivo" placeholder="Ejemplo: CLAY FREE" required>
    </div>








</form>


       

        

       

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


});




$(document).on('click', '#btn_registro', function () {

  // capturo datos del formulario
  const aditivos = $('#ad_reg').val().trim();
  if (aditivos.length === 0) {
    return mensaje(
      'El nombre del aditivo es obligatorio.',
      'warning'
    );
  }



  $.ajax({
    url: '../DATABASE/in_adtivo.php',
    type: 'POST',
    dataType: 'json',

    data: {
      aditivos
    },

    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },

    success: function (json) {

      console.log('Respuesta al registrar aditivo:', json);

      mensaje(
        json.mensaje,
        json.status || (json.err ? 'warning' : 'success')
      );

      if (!json.err) {
        cargarAditivos();

        $('#btn_registro').trigger('blur');
        $('#modal').modal('hide');
      }

    },

    error: function (xhr, status, error) {
      console.error('Error al registrar el aditivo:', error);
      console.error('Respuesta del servidor:', xhr.responseText);

      mensaje(
        'No fue posible registrar el aditivo.',
        'error'
      );
    },

    complete: function () {
      $('#btn_registro').prop('disabled', false);
    }
  });


});

// EDITAR ADITIVO PARA ROLES AMINISTRADORES Y DESARROLLADORES POR VICTOR ALVAREZ
$(document).on(
  'click',
  '#btn_editar_aditivo_maestro',
  function () {

    if (!puedeAdministrarAditivos) {
      mensaje(
        'No tienes permisos para editar datos maestros.',
        'warning'
      );

      return;
    }

    const celda = $(this).closest('td');
    const id = celda.attr('id');
    const nombre = celda.attr('data-nombre') || '';

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
            <span class="fw-semibold">
              EDITAR ADITIVO
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
        aria-label="Cerrar"
      >
        <i class="fa-solid fa-xmark fa-lg"></i>
      </button>
    `;

    const formulario = `
      <div class="container-fluid py-3">

        <input
          type="hidden"
          id="edit_id_aditivo"
          value="${id}"
        >

        <label
          for="edit_nombre_aditivo"
          class="form-label fw-semibold"
        >
          Nombre del aditivo
        </label>

        <input
          type="text"
          class="form-control"
          id="edit_nombre_aditivo"
          value="${nombre}"
          maxlength="150"
        >

      </div>
    `;

    const pie = `
      <div class="container-fluid border-top pt-3">
        <div class="row g-2">

          <div class="col-md-6 col-12">
            <button
              type="button"
              class="btn btn-outline-primary w-100"
              id="btn_guardar_aditivo_maestro"
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
  }
);

// GUARDAR CAMBIOS DEL ADITIVO EDITADO POR VICTOR ALVAREZ
$(document).on(
  'click',
  '#btn_guardar_aditivo_maestro',
  function () {

    if (!puedeAdministrarAditivos) {
      mensaje(
        'No tienes permisos para editar datos maestros.',
        'warning'
      );

      return;
    }

    const boton = $(this);
    const id = $('#edit_id_aditivo').val();
    const aditivo = $('#edit_nombre_aditivo').val().trim();

    if (!id) {
      mensaje(
        'No se pudo identificar el aditivo.',
        'warning'
      );

      return;
    }

    if (aditivo === '') {
      mensaje(
        'El nombre del aditivo es obligatorio.',
        'warning'
      );

      return;
    }

    $.ajax({
      url: '../DATABASE/up_aditivo.php',
      type: 'POST',
      dataType: 'json',

      data: {
        id,
        aditivo
      },

      beforeSend: function () {
        boton.prop('disabled', true);
      },

      success: function (json) {

        mensaje(
          json.mensaje,
          json.status || (json.err ? 'warning' : 'success')
        );

        if (!json.err) {
          boton.trigger('blur');
          $('#modal').modal('hide');
          cargarAditivos();
        }
      },

      error: function (xhr, status, error) {
        console.error(
          'Error al editar el aditivo:',
          error
        );

        console.error(
          'Respuesta del servidor:',
          xhr.responseText
        );

        mensaje(
          'No fue posible editar el aditivo.',
          'error'
        );
      },

      complete: function () {
        boton.prop('disabled', false);
      }
    });
  }
);


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
      $.post('../DATABASE/del_adtivo.php', {


        id_delete: id


      })
        .done(function (response) {

          const res = JSON.parse(response);
          console.log(response);

          mensaje(res.mensaje, res.status);

          if (res.status === 'success') {

            cargarAditivos();

          }

        })

    }
  });
});