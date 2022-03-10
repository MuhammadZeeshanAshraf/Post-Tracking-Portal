import Swal from 'sweetalert2'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

 export function sweetAlertError(title, text) {
     console.log(title);
     console.log(text)
    Swal.fire({
        icon: 'warning',
        type: 'error',
        title: title,
        text: text,
        footer: '<a href="#">Why do I have this issue?</a>'
    });
}

export function sweetAlertSuccess(title){
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}


export function sweetAlertInfo(title){
    Swal.fire({
        position: 'top-center',
        icon: 'info',
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}
toastr.options =
{
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function successToast(title, message){
    toastr.remove();
    toastr.success(title, message);
}

export function errorToast(title, message){
    toastr.remove();
    toastr.error(title, message);
}

export function warningToast(title, message){
    toastr.remove();
    toastr.warning(title, message);
}