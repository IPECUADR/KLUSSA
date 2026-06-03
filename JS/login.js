  $('#back_home').click(function(){

   location.href="../INDEX.php";
  
   });


//al porecionar el boton en la interface
   $('#btn_login').click(function(){
   
   
    validar();
    
  
  
  });
 // al precionar enter 

 window.addEventListener("keydown",(e)=>{
  if(e.keyCode == 13){
   
    validar();


  }

 });

  function validar(){

    username=$('#imp_user').val();
    password =$('#imp_pass').val();
     


    if( username.length !== 0  ||  password.length !== 0){

     if(username.length !== 0 ){

             if(password.length !== 0){
               
               
                            
                        $.ajax({
                          url: 'DATABASE/login.php',
                          type: 'POST',
                          data:{username, password},
                          success: function(response){
                          console.log(response);
                          var json = JSON.parse(response);
                        
                          console.log(json.rol);
                          
                          if(!json.err){
                              

                        


                                  

                                  const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                toast.onmouseenter = Swal.stopTimer;
                                                toast.onmouseleave = Swal.resumeTimer;
                                              }
                                            });
                                            Toast.fire({
                                              icon: "success",
                                              title: "Bienvenido", 
                                              text: json.nom_user+" "+ json.ap
                                            });


                                          




                                location.href="CONTROLLERS/HOME.php";


                                
                              
                          }else{
                              Swal.fire({
                              icon: 'error',
                              title: json.mensaje,
                              text:  'Error'
                              // ,footer: '<a href>Como solucionarlo?</a>'
                              })
                              
                          }
                          }
                      })




             }else{

                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "error",
                    title: "No ingreso su contraseña"
                  });
 
               
             }

         }else{

                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "error",
                  title: "No ingreso su usuario!!"
                });


         }

        }else{


      const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "No has ingresado nada"
          });


        }

  }