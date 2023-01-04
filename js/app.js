document.addEventListener('DOMContentLoaded', function(){

    const email =  {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los inputs 
    const inputEmail = document.querySelector('#email'); 
    const inputAsunto = document.querySelector('#asunto'); 
    const inputMensaje = document.querySelector('#mensaje'); 
    const form = document.querySelector('#formulario'); 
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); 
    const btnReset = document.querySelector('#formulario button[type="reset"]'); 
    const spinner = document.querySelector('#spinner'); 

    //Asignar eventos 
    inputEmail.addEventListener('input', validate);
    inputAsunto.addEventListener('input', validate); 
    inputMensaje.addEventListener('input', validate);

    form.addEventListener('submit', sendEmail); 

    btnReset.addEventListener('click', function(e){
        e.preventDefault(); 
        Swal.fire({
            title: '¿Seguro que deseas reiniciar el formulario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            
            if (result.isConfirmed) {
              resetForm();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Formulario Reiniciado',
                showConfirmButton: false,
                timer: 1500
              })
              
            } else if (result.isDenied) {
              Swal.fire('No se reinicio formulario', '', 'info')
            }
          })
        

    })

    function sendEmail(e){
        e.preventDefault(); 
        spinner.classList.add('flex'); 
        spinner.classList.remove('hidden'); 
        setTimeout(() => {
            spinner.classList.remove('flex'); 
            spinner.classList.add('hidden'); 
           resetForm(); 
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Email enviado Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          })
        }, 3000);

    }
    
    function validate(e){

        if(e.target.value.trim() === ''){ 
                showAlert(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
                email[e.target.name]  = '';
                validateEmailObject();
                return;
        }
        if(e.target.id === 'email' && !validateEmail(e.target.value)){
            showAlert('El email no es Valido', e.target.parentElement );
            email[e.target.name]  = '';
            validateEmailObject(); 
            return;
        }

        clearAlert(e.target.parentElement); 

        //Asignar Valores a objeto 
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar el email
        validateEmailObject(); 



    }//function validate

    function showAlert(message, references){
        clearAlert(references);
        //Generar HTML 
        const alert = document.createElement('P'); 
        alert.textContent = message; 
        alert.classList.add('bg-red-600', 'text-white', 'text-center', 'p-2', 'rounded'); 

        //Insertar en el HTML 
        references.appendChild(alert); 

    }//function showAlert 

    function clearAlert(references){
        //Comprobar si ya existe alerta 
        const alertPreviw = references.querySelector('.bg-red-600'); 
        if(alertPreviw){
            alertPreviw.remove();
        } 

    }//function clearAlert

    function validateEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ; 
        const result = regex.test(email); 
        return result;
    }

    function validateEmailObject(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50'); 
            btnSubmit.disabled= true; 
            return;
        }
        btnSubmit.classList.remove('opacity-50'); 
        btnSubmit.disabled = false; 
    }

    function resetForm(){
        //Reiniciar 
        email.email = ''; 
        email.mensaje = ''; 
        email.asunto = '';
        form.reset();
        validateEmailObject(); 
    }

    


});