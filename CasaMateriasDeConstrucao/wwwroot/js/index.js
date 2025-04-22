(function () {
    'use strict'
  
    // Selecionar todos os formulários que precisam de validação
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop sobre eles e prevenir envio
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()