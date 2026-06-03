


$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_planes(user_log);
   dashboard();
   grafic_2();
   grafic_3();
  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});



/// cargo la documentacion  asignada


function cargar_planes(user_log){

  
   
  $.ajax({
    url: '../DATABASE/cargar_plan.php',
    type: 'POST',
    data:{user_log},
    success: function(response){
      console.log(response);
      $('#seec_pro').empty();
      var json = JSON.parse(response);
      if(!json.err){
     
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                      <div  pk_plan ="`+item.PK_plan+`" id="" class="col-lg-6 col-sm-6 col-md-6">
                      <div class="info-box mb-3 hover-box" id="secc_proyect">
                        <span class="info-box-icon bg-success text-white elevation-1">
                          <i class="fas fa-laptop-house"></i>
                        </span>

                        <div class="info-box-content">
                          <span class="info-box-text">`+item.plan_nom+`</span>
                          <span class="info-box-number">`+item.agencia_mom+`</span>
                        </div>
                      </div>
                    </div>

 
          
          `;


         





         
         
         
         

          

         
     
          
      
        
       }



          //asignacion de informacion

         $('#seec_pro').append(codigo);
        



        })
      }
      else{

           Swal.fire({
                icon: 'info',
                title: json.mensaje,
                text:  'No existen exámenes agendados.'
                

                })
          }
    }
  })



}



/// cargar los documentos

///  cargar la documentacion asignada

$(document).on('click','#secc_proyect',function(event){


    var elemento_plan = $(this)[0].parentElement;
    id = $(elemento_plan).attr("pk_plan");
   

dashboard_pro(id);
grafic_2_p(id); 
grafic_3_p(id);

  //var PK_vacuna = $(elementoupdate).attr("PK_vacuna")

})






function  dashboard(){

$('#secc_grafica').empty();

let seccion_a = `

     <!-- Título estilizado -->
                          <h5 class="card-title text-dark fw-bold mb-3">
                             <i class="bi bi-graph-up-arrow"></i> Total Programaciones
                               </h5>


                           <canvas id="miGrafica"></canvas>


`;


$('#secc_grafica').append(seccion_a);


 $.ajax({
    url: '../DATABASE/cg_dashboard.php',  // este es el PHP que devolvió labels + values
    method: 'GET',
    dataType: 'json',
    success: function(data){

      const ctx = document.getElementById('miGrafica').getContext('2d');

      new Chart(ctx, {
        type: 'pie',  // puede ser 'bar', 'line', 'doughnut'
        data: {
          labels: data.labels,  // ["Pendiente", "Ejecutado", "Reprogramado"]
          datasets: [{
            label: 'Actividades por estado',
            data: data.values,   // [5, 8, 3]
            backgroundColor: [
              'rgba(7, 108, 51, 1)',
              'rgba(2, 41, 76, 1)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true
        }
      });

    }
  });

}


///////





function dashboard_pro(id_proyecto) {

$('#secc_grafica').empty();

  let seccion_a = `

     <!-- Título estilizado -->
                          <h5 class="card-title text-dark fw-bold mb-3">
                             <i class="bi bi-graph-up-arrow"></i> Total Programaciones
                               </h5>


                           <canvas id="miGrafica"></canvas>


`;


$('#secc_grafica').append(seccion_a);


$.ajax({
  url: '../DATABASE/cg_dashboard_proyecto.php',
  method: 'POST',
  dataType: 'json',
  data: { id_proyecto },
  success: function(data) {

    console.log(data);
    const ctx = document.getElementById('miGrafica').getContext('2d');

    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    window.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,  // ["Pendiente", "Ejecutado"]
        datasets: [{
          label: 'Cumplimiento',
          data: data.values,   // ej: [40, 60]
          backgroundColor: [
            'rgba(255, 193, 7, 0.8)',
            'rgba(40, 167, 69, 0.8)'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }
});



  
}


















function  grafic_2(){


$('#secc_grafica2').empty();

  let seccion_b = `
    <!-- Título estilizado -->
    <h5 class="card-title text-dark fw-bold mb-3">
        <i class="bi bi-graph-up-arrow"></i> Programaciones - Ejecutadas
    </h5>

    <!-- Gráfica -->
    <canvas id="miGrafica2"></canvas>


`;


$('#secc_grafica2').append(seccion_b);


$.ajax({
  url: '../DATABASE/cg_subplan_ejc.php',
  method: 'GET',
  dataType: 'json',
  success: function(data) {

    const labels = data.map(item => item.nombre_subplan);
    const totals = data.map(item => item.total);
    const percentages = data.map(item => item.porcentaje);

    const ctx = document.getElementById('miGrafica2').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ejecutado',
          data: totals,
          backgroundColor: 'rgba(68, 218, 113, 0.74)',
          borderColor: 'rgba(1, 92, 1, 0.49)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const index = context.dataIndex;
                const total = totals[index];
                const percent = percentages[index];
                return `Cantidad: ${total} (${percent}%)`;
              }
            }
          },
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Actividades Ejecutadas por Subplan'
          }
        }
      }
    });

  },
  error: function(xhr, status, error) {
    console.error('Error al cargar los datos:', error);
  }
});


}



function  grafic_2_p(id){


$('#secc_grafica2').empty();

  let seccion_b = `
    <!-- Título estilizado -->
    <h5 class="card-title text-dark fw-bold mb-3">
        <i class="bi bi-graph-up-arrow"></i> Programaciones - Ejecutadas
    </h5>

    <!-- Gráfica -->
    <canvas id="miGrafica2"></canvas>


`;


$('#secc_grafica2').append(seccion_b);


$.ajax({
  url: '../DATABASE/cg_subplan_ejc_pro.php',
  method: 'POST',
  dataType: 'json',
  data:{id},
  success: function(data) {

    const labels = data.map(item => item.nombre_subplan);
    const totals = data.map(item => item.total);
    const percentages = data.map(item => item.porcentaje);

    const ctx = document.getElementById('miGrafica2').getContext('2d');

    new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Ejecutado',
      data: totals,
      backgroundColor: 'rgba(46, 204, 113, 0.7)',   // Verde elegante
      borderColor: 'rgba(39, 174, 96, 1)',          // Verde oscuro para borde
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#2c3e50',        // Color de texto más formal
          font: {
            family: 'Arial',       // Fuente profesional
            size: 14,              // Tamaño de letra
            weight: 'bold'         // Negrita
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;  // Muestra el % en el tooltip
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%';   // Agrega el % en el eje Y
          },
          color: '#2c3e50',
          font: {
            family: 'Arial',
            size: 12
          }
        }
      },
      x: {
        ticks: {
          color: '#2c3e50',
          font: {
            family: 'Arial',
            size: 12
          }
        }
      }
    }
  }
});

  },
  error: function(xhr, status, error) {
    console.error('Error al cargar los datos:', error);
  }
});


}
















function  grafic_3(){

$('#secc_grafica3').empty();

  let seccion_c = `
 <!-- Título estilizado -->
                      <h5 class="card-title text-dark fw-bold mb-3">
                         <i class="bi bi-graph-up-arrow"></i>  Programaciones - Pendientes
                         </h5>
                 <canvas id="miGrafica3"></canvas>


`;


$('#secc_grafica3').append(seccion_c);





$.ajax({
  url: '../DATABASE/cg_subplan_ejc_dash_pen.php',
  method: 'GET',
  dataType: 'json',
  success: function(data) {

    const labels = data.map(item => item.nombre_subplan);
    const totals = data.map(item => item.total);
    const percentages = data.map(item => item.porcentaje);

    const ctx = document.getElementById('miGrafica3').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pendiente',
          data: totals,
          backgroundColor: 'rgba(20, 79, 255, 0.63)',
          borderColor: 'rgba(22, 67, 172, 0.49)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const index = context.dataIndex;
                const total = totals[index];
                const percent = percentages[index];
                return `Cantidad: ${total} (${percent}%)`;
              }
            }
          },
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Actividades Ejecutadas por Subplan'
          }
        }
      }
    });

  },
  error: function(xhr, status, error) {
    console.error('Error al cargar los datos:', error);
  }
});


}






function  grafic_3_p(id){

$('#secc_grafica3').empty();

  let seccion_c = `
 <!-- Título estilizado -->
                      <h5 class="card-title text-dark fw-bold mb-3">
                         <i class="bi bi-graph-up-arrow"></i>  Programaciones - Pendientes
                         </h5>
                 <canvas id="miGrafica3"></canvas>


`;


$('#secc_grafica3').append(seccion_c);





$.ajax({
  url: '../DATABASE/cg_subplan_ejc_dash_pen_pro.php',
  method: 'POST',
  dataType: 'json',
  data:{id}, 
  success: function(data) {

    const labels = data.map(item => item.nombre_subplan);
    const totals = data.map(item => item.total);
    const percentages = data.map(item => item.porcentaje);

    const ctx = document.getElementById('miGrafica3').getContext('2d');

    new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Pendiente',
      data: totals,
      backgroundColor: 'rgba(255, 193, 7, 0.7)',   // Amarillo elegante
      borderColor: 'rgba(204, 142, 0, 1)',         // Amarillo oscuro para borde
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#2c3e50', // texto eje Y
          font: {
            family: 'Arial',
            size: 12
          }
        }
      },
      x: {
        ticks: {
          color: '#2c3e50',
          font: {
            family: 'Arial',
            size: 12
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const total = totals[index];
            const percent = percentages[index];
            return `Cantidad: ${total} (${percent}%)`;
          }
        }
      },
      legend: {
        display: true,
        labels: {
          color: '#2c3e50',
          font: {
            family: 'Arial',
            size: 13,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Actividades Pendientes por Subplan',
        color: '#2c3e50',
        font: {
          family: 'Arial',
          size: 16,
          weight: 'bold'
        }
      }
    }
  }
});


  },
  error: function(xhr, status, error) {
    console.error('Error al cargar los datos:', error);
  }
});


}
