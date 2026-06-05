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
     
      if (username.length === 0 && password.length === 0) {
          mensaje("error", "No has ingresado nada");
          return;
        }

        if (username.length === 0) {
          mensaje("error", "No ingreso su usuario");
          return;
        }

        if (password.length === 0) {
          mensaje("error", "No ingreso su contraseña");
          return;
        }

          
        
        
          $.post(
            'DATABASE/login.php',
            { 
              
              username, 
              password

            },
            function (json) {

                console.log(json);

                if (!json.err) {

                 

                          location.href = 'web/rutas.php?ruta=home';

                 

                } else {
                    mensaje( json.icon, json.mensaje);
                }

            },
            'json'
        ).fail(() => {
            mensaje('error', 'Error de servidor');
        });
        

                
        
  

   

    }





function mensaje(icon, mensaje) {

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
            icon: icon,
            title: mensaje
          });

}