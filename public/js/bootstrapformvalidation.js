(function () {
    'use strict'
  
    // Fetch all forms that we want to apply validation to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop through each form and prevent submission if it's invalid
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            // If the form is invalid, prevent submission and add Bootstrap's validation class
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')

            // Apply custom validation colors (green for valid, red for invalid)
            const inputs = form.querySelectorAll('input, textarea')
            inputs.forEach((input) => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid')
                    input.classList.remove('is-valid')
                } else {
                    input.classList.remove('is-invalid')
                    input.classList.add('is-valid')
                }
            })
        }, false)
    })
})()
