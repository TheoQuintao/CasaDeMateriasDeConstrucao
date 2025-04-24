import 'Data/banco.js'

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
                    event.stopProgress()
                }
                
                form.classList.add('was-validated')
            }, false)
        })
})()

// Navegação entre passos
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
        const currentStep = document.querySelector('.form-step.active');
        const nextStepId = this.getAttribute('data-next');
        const nextStep = document.getElementById('step' + nextStepId);
        
        // Validação antes de avançar
        if (currentStep.querySelectorAll(':invalid').length === 0) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
            
            // Atualizar progresso
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector(`.step[data-step="${nextStepId}"]`).classList.add('active');
            
            // Atualizar dados de revisão no último passo
            if (nextStepId === '3') {
                document.getElementById('reviewNome').textContent = `Nome: ${document.getElementById('nome').value}`;
                document.getElementById('reviewCpf').textContent = `CPF: ${document.getElementById('cpf').value}`;
                document.getElementById('reviewEmail').textContent = `E-mail: ${document.getElementById('email').value}`;
                document.getElementById('reviewTelefone').textContent = `Telefone: ${document.getElementById('telefone').value}`;
                
                const endereco = `${document.getElementById('logradouro').value}, ${document.getElementById('numero').value}`;
                const complemento = document.getElementById('complemento').value ? ` - ${document.getElementById('complemento').value}` : '';
                const cidadeEstado = `${document.getElementById('cidade').value}/${document.getElementById('estado').value}`;
                const cep = `CEP: ${document.getElementById('cep').value}`;
                
                document.getElementById('reviewEndereco').textContent = `${endereco}${complemento} - ${document.getElementById('bairro').value} - ${cidadeEstado} - ${cep}`;
            }
        } else {
            currentStep.querySelectorAll(':invalid')[0].focus();
        }
    });
});

document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', function() {
        const currentStep = document.querySelector('.form-step.active');
        const prevStepId = this.getAttribute('data-prev');
        const prevStep = document.getElementById('step' + prevStepId);
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        
        // Atualizar progresso
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector(`.step[data-step="${prevStepId}"]`).classList.add('active');
    });
});

// Validação de senha
document.getElementById('senha').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const lengthHint = document.getElementById('lengthHint');
    const numberHint = document.getElementById('numberHint');
    const specialHint = document.getElementById('specialHint');
    
    // Reset
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#dc3545';
    lengthHint.classList.remove('valid');
    numberHint.classList.remove('valid');
    specialHint.classList.remove('valid');
    
    let strength = 0;
    
    // Verificar comprimento
    if (password.length >= 8) {
        strength += 25;
        lengthHint.classList.add('valid');
    }
    
    // Verificar números
    if (/\d/.test(password)) {
        strength += 25;
        numberHint.classList.add('valid');
    }
    
    // Verificar caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 25;
        specialHint.classList.add('valid');
    }
    
    // Verificar letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength += 25;
    }
    
    // Atualizar barra de força
    strengthBar.style.width = strength + '%';
    
    // Mudar cor baseada na força
    if (strength >= 75) {
        strengthBar.style.backgroundColor = '#28a745';
    } else if (strength >= 50) {
        strengthBar.style.backgroundColor = '#ffc107';
    }
});

// Validação de confirmação de senha
document.getElementById('confirmarSenha').addEventListener('input', function() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = this.value;
    
    if (confirmarSenha && senha !== confirmarSenha) {
        this.setCustomValidity('As senhas não coincidem');
    } else {
        this.setCustomValidity('');
    }
});

// Máscaras para campos
document.getElementById('cpf').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11);
    }
    if (value.length > 14) {
        value = value.substring(0, 14);
    }
    
    this.value = value;
});

document.getElementById('telefone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    }
    if (value.length > 10) {
        value = value.substring(0, 10) + '-' + value.substring(10);
    }
    if (value.length > 15) {
        value = value.substring(0, 15);
    }
    
    this.value = value;
});

document.getElementById('cep').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
    }
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    
    this.value = value;
});

// Buscar CEP
document.getElementById('buscarCep').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';
                } else {
                    alert('CEP não encontrado');
                }
            })
            .catch(() => {
                alert('Erro ao buscar CEP');
            });
    } else {
        alert('CEP inválido');
    }
});