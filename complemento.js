document.addEventListener('DOMContentLoaded', function () {
  // Inicializar todos os Modals (usando Bootstrap)
  var modalElems = document.querySelectorAll('.modal');
  modalElems.forEach(function(modal) {
    new bootstrap.Modal(modal);
  });

  // Inicializar Dropdowns (usando Bootstrap)
  var dropdownElems = document.querySelectorAll('.dropdown-toggle');
  dropdownElems.forEach(function(dropdown) {
    new bootstrap.Dropdown(dropdown);
  });

  // Inicializar Tooltips (usando Bootstrap)
  var tooltipElems = document.querySelectorAll('.tooltipped');
  tooltipElems.forEach(function(tooltip) {
    new bootstrap.Tooltip(tooltip);
  });

  // Inicializar (usando Bootstrap)
  var collapsibleElems = document.querySelectorAll('.collapse');
  collapsibleElems.forEach(function(collapsible) {
    new bootstrap.Collapse(collapsible);
  });

  // Efeito de clique nos botões 
  const buttons = document.querySelectorAll('.btn, .waves-effect');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('animate__pulse'); // Usando a animação 
      setTimeout(() => {
        button.classList.remove('animate__pulse'); // Remove após o efeito
      }, 300);
    });
  });

  // Função para criar notificações dinâmicas (usando Toast do Bootstrap)
  function createToast(message, duration = 4000) {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add('fade');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="toast-body">
        ${message}
      </div>
    `;

    toastContainer.appendChild(toast);
    new bootstrap.Toast(toast, { delay: duration }).show();
  }

  // Função para criar o container de toasts (se não existir)
  function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.classList.add('position-fixed', 'top-0', 'end-0', 'p-3');
    document.body.appendChild(container);
    return container;
  }

  // Exemplo de Toast ao carregar a página
  createToast('Bem-vindo ao Bootstrap!', 5000);

  // Limitar a quantidade de cartões criados
  const MAX_CARTOES = 6; // Limite de cartões permitidos
  let contadorCartoes = 0; // Variável para manter o controle

  // Função para adicionar conteúdo dinâmico
  const dynamicContentButton = document.getElementById('add-content-btn');
  if (dynamicContentButton) {
    dynamicContentButton.addEventListener('click', () => {
      if (contadorCartoes < MAX_CARTOES) {
        const container = document.querySelector('.dynamic-content');
        const newCard = `
          <div class="col-12 col-md-4 mb-4">
            <div class="card">
              <img src="https://i.imgur.com/GsP0HNn.jpeg" class="card-img-top" alt="Novo Cartão">
              <div class="card-body">
                <h5 class="card-title">Novo Cartão ${contadorCartoes + 1}</h5>
                <p class="card-text">Este cartão foi adicionado dinamicamente!</p>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${contadorCartoes + 1}">Saiba Mais</button>
              </div>
            </div>
          </div>
        `;
        container.innerHTML += newCard; // Adiciona o novo cartão ao container
        contadorCartoes++; // Incrementa o contador
        createToast('Novo cartão adicionado!', 3000); // Notificação do cartão
      } else {
        createToast('O máximo de 10 cartões foi atingido!', 3000); // Limite de cartao
      }
    });
  }

  // Envio do formulário e exibição de mensagem de sucesso
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Previne o envio real do formulário

      // Validaçao de campos obrigatorios
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('mensagem').value;

      if (nome && email && mensagem) {
        // Mensagem de sucesso envio
        createToast('Contato Enviado!', 3000);
        // Clear
        contactForm.reset();
      } else {
        // Campo em branco
        createToast('Por favor, preencha todos os campos.', 4000);
      }
    });
  }
});
