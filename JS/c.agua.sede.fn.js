$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

   // url de carga
    let url = '../DATABASE/cg_c_agua_sedes.php';
    let params = {};


    c_aut_c_agua_sedes(url, params);
    cbx_fil_ag();
    fil_mes();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

  // variables de entorno
      let url = '../DATABASE/cg_c_agua_sedes.php';
      let params = {};
      let llenar_tabla = []; 




      
function c_aut_c_agua_sedes (url, params){

  

   
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
                <td>${item.mes}</td>
                <td>${item.m_cubicos}</td>
                <td>${item.litros}</td>
                <td>${item.fc_inicio}</td>
                <td>${item.fc_corte}</td>
                <td>${item.sede}</td>
                <td>${item.usuario}</td>
                <td id="${item.id}">
                 
                  <button type="button" class="btn btn-warning btn-sm mb-1 mt-1" id="btn_edit">
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

             mensaje(json.mensaje,'info')
             
          }
    }
  })


}

/// mostrar datos en  el  sistema







$(document).on('click', '#bnt_reg_res_p', function() {

 
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

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

      
        

          <div class="col-md-6">
          <label for="fecha_incio" class="form-label small fw-semibold text-muted">Fecha Inicio </label>
          <input type="date" class="form-control form-control-sm" id="fecha_incio" name="fecha_incio" >
        </div>

        <div class="col-md-6">
          <label for="fecha_cierre" class="form-label small fw-semibold text-muted">Fecha Cierre</label>
          <input type="date" class="form-control form-control-sm" id="fecha_cierre" name="fecha_cierre" >
        </div>
         
        <div class="col-md-6">
          <label for="cbx_mes" class="form-label small fw-semibold text-muted">Mes</label>
          <select class="form-select form-select-sm"  id="cbx_mes_res" name="cbx_mes"></select>
        </div>
        <div class="col-md-6">
          <label for="cbx_agencia" class="form-label small fw-semibold text-muted">Agencia</label>
          <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
        </div>
       <div class="col-md-6">
          <label for="ct_m_c" class="form-label small fw-semibold text-muted">Metros Cubicos</label>
          <input type="text" class="form-control form-control-sm" id="ct_m_c" name="ct_m_c" placeholder="Metros Cubicos" >
        </div>

        <div class="col-md-6">
          <label for="ct_lit" class="form-label small fw-semibold text-muted">Consumo Litros</label>
          <input type="text" class="form-control form-control-sm" id="ct_lit" name="ct_lit" placeholder="Litros" readonly>
        </div>
        <div class="col-md-12">
          <label for="responsable" class="form-label small fw-semibold text-muted">Responsable</label>
          <input type="text" class="form-control form-control-sm" id="responsable" name="responsable" placeholder="Katty Conforme">
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






/////////////// calcular 


$(document).on('input', '#ct_m_c', function () {

  const mc = parseFloat($(this).val()) || 0;

  const litros = mc * 1000;

  $('#ct_lit').val(litros.toFixed(2));

});





$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const fc_inicio = $('#fecha_incio').val().trim();
  const fc_cierre = $('#fecha_cierre').val().trim();
  const agencia = $('#cbx_agencia').val().trim();
  const mes = $('#cbx_mes_res').val().trim();
  const m_cubicos = $('#ct_m_c').val().trim();
  const litros = $('#ct_lit').val().trim();
  const responsable = $('#responsable').val().trim();

 //  valor de  la  descripcion  del  residuo
  
 
    if(fc_inicio.length === 0 ) return mensaje('La fecha de inicio es obligatoria','warning');
    if(fc_cierre.length === 0 ) return mensaje('La fecha de cierre es obligatoria','warning');
    if(fc_inicio >= fc_cierre)return mensaje('La fecha de inicio no puede ser mayor o igual a la fecha de cierre','warning');
    
    if(mes.length === 0 ) return mensaje('El mes es obligatorio','warning');
    if(agencia.length === 0 ) return mensaje('La agencia es obligatoria','warning');
    if(m_cubicos.length === 0 ) return mensaje('La cantidad en metros cubicos es obligatoria','warning');
    if(litros.length === 0 ) return mensaje('La cantidad en litros es obligatoria','warning');
    if(responsable.length === 0 ) return mensaje('El responsable es obligatorio','warning');




  /// validdacion, si los campos estan vacios


// envio de datos al  servidor

 $.ajax({
    url: '../DATABASE/insert_c_ag_sedes.php',
    type: 'POST',
    data: { fc_inicio, fc_cierre, mes, agencia, m_cubicos, litros, responsable },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');      c_aut_c_agua_sedes(url, params);  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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
            $.post('../DATABASE/del_c_ag_sedes.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                             c_aut_c_agua_sedes(url, params);

                        }
               
                })
                
        }
    });
});


/// variable de entorno



// funciones de acciones en modales 

// Mostar ficha de dispocicion de residuos peligrosos

let pk_registro = 0;

$(document).on('click', '#btn_edit', function() {

  // capturo el id del registro
  let view_info = $(this).closest('td');
  let id = view_info.attr('id');  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.id == parseInt(id));
  

  pk_registro = cp.id; // asignar a variable global si es necesario



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



   var ficha =`


  <div class="card-body px-4 py-4">
  <form id="detalle_residuo" class="container-fluid">
    <div class="row g-3">

      <!-- Fecha inicio -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label for="fc_in_ca_ag" class="fw-semibold text-secondary col-3 mb-0">Fecha inicio</label>
          <input type="date" id="fc_in_ca_ag" name="fecha_entrega" class="form-control form-control-sm bg-light border-0" value="${cp.fc_inicio}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Fecha cierre -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label for="fc_crt_ca_ag" class="fw-semibold text-secondary col-3 mb-0">Fecha cierre</label>
          <input type="date" id="fc_crt_ca_ag" name="fecha_entrega" class="form-control form-control-sm bg-light border-0" value="${cp.fc_cierre}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Mes -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label class="fw-semibold text-secondary col-3 mb-0">Mes</label>
          <input type="text" id="mes_res" name="FK_mes" class="form-control form-control-sm bg-light border-0" value="${cp.mes}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit_select">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Agencia -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label class="fw-semibold text-secondary col-3 mb-0">Agencia</label>
          <input type="text" id="agencia" name="FK_pro" class="form-control form-control-sm bg-light border-0" value="${cp.sede}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit_select">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Metros cúbicos -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label for="cm_m_c" class="fw-semibold text-secondary col-3 mb-0">Metros cúbicos</label>
          <input type="number" id="cm_m_c" class="form-control form-control-sm bg-light border-0" value="${cp.m_cubicos}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Litros -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label class="fw-semibold text-secondary col-3 mb-0">Litros</label>
          <input type="number" id="cm_m_c" class="form-control form-control-sm bg-light border-0" value="${cp.litros}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <!-- Responsable -->
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 p-2 border rounded-3">
          <label for="user_reg" class="fw-semibold text-secondary col-3 mb-0">Responsable</label>
          <input type="text" id="user_reg" class="form-control form-control-sm bg-light border-0" value="${cp.usuario}" readonly>
          <button class="btn btn-sm btn-outline-secondary" type="button" id="edit">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

    </div>
  </form>
</div>

`;


var footer = `
<div class="container-fluid border-top pt-3" >
  <div class="row g-2">





 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-info  w-100" id="btn_pdf_in">
      <i class="fas fa-file-pdf"></i> Imprimir
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



/// asignacion de valores  al modal

$('#form_modal').append(ficha);
$('#titulo_modal').append(title);

$('#form_modal_footer').append(footer);
});
$(document).on('click', '#btn_pdf_in', function () {

  let cp = llenar_tabla.find(item => item.id == parseInt(pk_registro));

  console.log(cp);

  if (!cp) {
    console.error('No se encontró el registro');
    return;
  }

  $.ajax({
    url: '../PDF/c_agua_sedes_in.php',
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
      a.download = 'EC-HSE-F-53-CONSUMO-INDIVIDUAL.pdf';
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


// generacion de pdf

$(document).on('click', '#btn_pdf', function() {



  if(!llenar_tabla){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_agua_sedes.php',
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
      a.download = 'Consumo_Agua_Sedes.pdf';
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
                  '../DATABASE/up_items_ca_sedes.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                     c_aut_c_agua_sedes(url, params); // refrescar la tabla después de la actualización
                  }
                );

    
  }


});

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
        <select class="form-control form-control-sm" id="cbx_${id_elemento}" name="${name}"></select>
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
                  '../DATABASE/up_dis_r_p.php',
                  { campo: name, update_dato: id_reg, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                     c_aut_c_agua_sedes(url, params); // refrescar la tabla después de la actualización
                  }
                );


    }
 

   
     imput_replace = `<input type="text" class="form-control" name="${name}" id="${id_elemento}" value="${newText}" readonly>`;
     console.log(imput_replace);

    select.replaceWith(imput_replace);
    $(this).remove();


  });


///////exportar en excel 


/// reporte en excel 
$("#btn_export_excel").on("click", function () {

    $.ajax({
        url: "../EXCEL/RP_C_A_S.php",
        type: "POST",
        data: { data: JSON.stringify(llenar_tabla) },
        xhrFields: { responseType: "blob" },

        success: function (blob) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "EC-HSE-F-53-CONSUMO-AGUA-SEDES.xls";
            link.click();
        }
    });

});

/// FILTROS FUNCIONALIDADES 

/// filtros 

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
  const url = '../DATABASE/fil_c_agua_sedes.php';
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
  c_aut_c_agua_sedes(url, params);
}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro(); 


});