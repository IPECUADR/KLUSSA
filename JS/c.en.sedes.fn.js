$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
    /// url de acceso al servicio

    let url = '../DATABASE/cg_c_energia.php';
    let params = {};


    /// auto ejecucion 
    fil_mes(); 
    cbx_fil_ag();   
    c_energia_sedes(url, params);

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

/// variables de entorno 
    let url = '../DATABASE/cg_c_energia.php';
    let params = {};
    let llenar_tabla = []; 


function c_energia_sedes (url, params){

  

   
  $.ajax({
    
    type: 'POST',
    url:url ,
    data:params, 
  
    success: function(response){
      console.log(response);
      $('#content_table').empty();
     llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
 
     var json = JSON.parse(response);
 


      
      if(!json.err){
          var contador=1;

        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo = `
              <tr>
                <td>${contador}</td>
               
                <td>${item.pro}</td>
                 <td>${item.mes}</td>
               
                <td>${item.fi}</td>
                <td>${item.fn}</td>
                <td>  <span class="badge bg-success-subtle text-success">${item.c}</span></td>
                <td>${item.p}</td>
             
                <td id="${item.id}">

                <button type="button" class="btn btn-warning btn-sm mb-1 mt-1" id="btn_t_dia">
                <i class="fas fa-edit"></i>
                  </button>
                 
    

                   
                
                  <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
`;


         





         
         
         
         

          

         
     
          
      
        
       }



          //asignacion de informacion

         $('#content_table').append(codigo);
        
         contador ++


        })
      }
      else{

         mensaje(json.mensaje,'info');
         
          }
    }
  })


}

/// mostrar datos en  el  sistema







$(document).on('click', '#bnt_reg', function() {

 
$('#modal').modal('show');


    cbx_mes_res();
    cbx_agencia();
    modal_insert();
 

})






      function modal_insert(){

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

        var form =`
        
      <form id="detalle_residuo" class="container-fluid py-2">

        <div class="card border-0 shadow-sm">
          <div class="card-body">

            <!-- ================= DATOS GENERALES ================= -->
            <div class="mb-3">
             

              <div class="row g-3">

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">AGENCIA</label>
                  <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
                </div>

                  <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">MES</label>
                  <select class="form-select form-select-sm" id="cbx_mes_res"  name="cbx_mes_res"></select>
                </div>


                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">FECHA INICIO</label>
                  <input type="date" class="form-control form-control-sm" id="fecha_inicio" name="fecha_inicio">
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">FECHA CIERRE</label>
                  <input type="date" class="form-control form-control-sm" id="fecha_cierre" name="fecha_cierre">
                </div>

              
              

            

          
              </div>
            </div>


      

            <!-- ================= RESPONSABLE ================= -->
            <div class="row g-3">

            
              <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">CONSUMO</label>
                  <input type="text" class="form-control form-control-sm" id="c_en" name="c_en" placeholder="KW/h">
                </div>

              <div class="col-md-6">
                <label class="form-label small fw-semibold text-muted">RESPONSABLE</label>
                <input type="text" class="form-control form-control-sm" name="responsable" id="resposable" placeholder="Katty Conforme">
              </div>


            </div>

          </div>
        </div>

      </form>


        
        
        
        `;
        var footer =`

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




      function cbx_mes_res(){
        $.ajax({
          url: '../DATABASE/cbx_mes_res_p.php',
          type: 'POST',
          success: function(response){
            var json = JSON.parse(response);
            if(!json.err){
              $('#cbx_mes_res').empty();
              $('#cbx_mes_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
              $.each(json, function(i,item){
                if(i!="err"){
                  var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
                  $('#cbx_mes_res').append(option);
                }
              });
            }
          }
        });
      }













      function cbx_agencia(){
        $.ajax({
          url: '../DATABASE/cg_agencia_cbx.php',
          type: 'POST',
          success: function(response){
            var json = JSON.parse(response);
            if(!json.err){
              $('#cbx_agencia').empty();
              $('#cbx_agencia').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
              $.each(json, function(i,item){
                if(i!="err"){
                  var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
                  $('#cbx_agencia').append(option);
                }
              });
            }
          }
        });
      }











$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario

    const agencia = $('#cbx_agencia').val().trim();
    const mes = $('#cbx_mes_res').val().trim();

    
    const fc_inicio = $('#fecha_inicio').val().trim();
    const fc_cierre = $('#fecha_cierre').val().trim();
  
    const c_en = $('#c_en').val().trim();
    const responsable = $('#resposable').val().trim();

 //  valor de  la  descripcion  del  residuo
  
 
    if(fc_inicio.length === 0 ) return mensaje('La fecha de inicio es obligatoria','warning');
    if(fc_cierre.length === 0 ) return mensaje('La fecha de cierre es obligatoria','warning');
    if(fc_inicio >= fc_cierre)return mensaje('La fecha de inicio no puede ser mayor o igual a la fecha de cierre','warning');
    if(agencia.length === 0 ) return mensaje('La agencia es obligatoria','warning');
    if(mes.length === 0 ) return mensaje('El mes es obligatorio','warning');
  
    if(c_en.length === 0 ) return mensaje('El consumo de energía es obligatorio','warning');
    if(responsable.length === 0 ) return mensaje('El responsable es obligatorio','warning');




  /// validdacion, si los campos estan vacios


// envio de datos al  servidor

 $.ajax({
    url: '../DATABASE/insert_c_energia.php',
    type: 'POST',
    data: { fc_inicio: fc_inicio, fc_cierre: fc_cierre, agencia: agencia, mes: mes, c_en: c_en, responsable: responsable },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success'); c_energia_sedes(url, params);  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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
    $(document).on('click','#btn_delete',function(event){

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
                $.post('../DATABASE/del_c_energia.php', { 
                  
                  
                  id_delete: id  


                })
                    .done(function(response) {
                      
                            const res = JSON.parse(response);
                            console.log(response);

                                  mensaje(res.mensaje, res.status);

                            if (res.status === 'success') {
                        
                                c_energia_sedes(url, params);

                            }
                  
                    })
                    
            }
        });
    });


/// variable de entorno



// funciones de acciones en modales 

// Mostar ficha de dispocicion de residuos peligrosos




function armar_formulario(ficha, footer){




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

      $(document).on('click', '#btn_t_dia', function() {

        // capturo el id del registro
        let view_info = $(this).closest('td');
        let id = view_info.attr('id');  // más limpio que parentElement

        console.log('ID capturado:', id);
        console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

        // buscar el objeto correspondiente en el JSON global
        let cp = llenar_tabla.find(item => item.id == parseInt(id));
        

        pk_registro = cp.id; // asignar a variable global si es necesario


      let ficha =   `



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
            <button type="button" class="btn btn-outline-info w-100" id="btn_pdf">
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

  let cp = llenar_tabla.find(item => item.id == parseInt(pk_registro));

  console.log(cp);

  if (!cp) {
    console.error('No se encontró el registro');
    return;
  }

  $.ajax({
    url: '../PDF/c_en_in.php',
    type: 'POST',
    data: {
      cp: JSON.stringify(cp) // 👈 CLAVE
    },
    xhrFields: {
      responseType: 'blob'
    },
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
      console.error('Error AJAX:', error, xhr.responseText);
    }
  });

});

///





// generacion de pdf

$(document).on('click', '#btn_pdf_g', function() {



  if(!llenar_tabla){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_energia_rp.php',
    type: 'POST',
    data: { cp: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: 'blob' },
    success: function(blob) {
      if(blob.size === 0){
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
    error: function(xhr, status, error){
      console.error('Error AJAX:', error);
    }
  });

});

///


/// editar imputs 

$(document).on('click', '#edit', function() {

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

    var campo  = input.attr('id');
    update_dato = input.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);

        if(update_dato.length === 0){
            mensaje('El campo no puede estar vacío', 'warning');
            return;


         }

          $.post(
                  '../DATABASE/up_c_en_im.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                    c_energia_sedes(url, params); // refrescar la tabla después de la actualización
                  }
                );

    
  }


});

//// editar selects 


 id_elemento = '';
// editar  select
$(document).on('click', '#edit_select', function() {



    var input = $(this).siblings('input'); 
     id_elemento  = input.attr('id');
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
$(document).on('click', '#btn_guardar', function() {
    var select = $(this).siblings('select');
    var name = select.attr('name');
    let newText = select.find("option:selected").text();
    
    id_reg = select.val();

    if(id_reg.length === 0){
        mensaje('Debes seleccionar una opción', 'warning');
        
    }else{


      $.post(
                  '../DATABASE/up_c_en.php',
                  { campo: name, update_dato: id_reg, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                    c_energia_sedes(url, params); // refrescar la tabla después de la actualización
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
                url: "../EXCEL/RP_C_EN.php",
                type: "POST",
                data: { data: JSON.stringify(llenar_tabla) },
                xhrFields: { responseType: "blob" },

                success: function (blob) {
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "EC-HSE-F-53-RESIDUOS_PELIGROSOS.xls";
                    link.click();
                }
            });

        });


/// filtros 

//// 

function fil_mes(){
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_mes').empty();
        $('#cbx_fil_mes').append('<option value="">MES</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
            $('#cbx_fil_mes').append(option);
          }
        });
      }
    }
  });
}


function cbx_fil_ag(){
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_ag').empty();
        $('#cbx_fil_ag').append('<option value="">AGENCIA</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
            $('#cbx_fil_ag').append(option);
          }
        });
      }
    }
  });
}

/// ejecucion del filtro 
/// FILTROS

function verificacar_filtro() {
  
/// vaibles de archivo y parametros de busqueda 
  const url = '../DATABASE/fil_c_energia.php';
  let params = {};


  /// variables de busqueda
  const mes    = $('#cbx_fil_mes').val();
  const agencia   = $('#cbx_fil_ag').val();


  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_fil_ag').attr('name');



  // Agregar filtros solo si tienen valor
  if (mes) {
    params.mes = mes;
    params.campo1 = campo1;
  }

  if (agencia) {
    params.agencia = agencia;
    params.campo2 = campo2;
  }


  
  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }
  
  console.log('Filtros enviados:', params);

  c_energia_sedes(url, params);

}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro(); 


});