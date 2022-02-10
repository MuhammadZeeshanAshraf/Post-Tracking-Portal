import Swal from 'sweetalert2'

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
