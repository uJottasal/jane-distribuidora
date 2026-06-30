// Navbar dinâmica ao rolar a página
const navbar = document.getElementById('mainNavbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 80;
  navbar.classList.toggle('scrolled', isScrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
});

// Botão voltar ao topo
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fechar menu mobile ao clicar em um link
const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar .btn');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});

// Filtro de produtos
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    productItems.forEach((item) => {
      const showItem = filter === 'all' || item.dataset.category === filter;
      item.style.display = showItem ? 'block' : 'none';
    });
  });
});


// Contadores animados
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  const aboutSection = document.getElementById('empresa');
  const position = aboutSection.getBoundingClientRect().top;

  if (position < window.innerHeight - 150) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      const increment = Math.max(1, Math.floor(target / 80));
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current.toLocaleString('pt-BR');
      }, 20);
    });
  }
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// Formulário de contato integrado ao WhatsApp
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formFeedback.textContent = 'Preencha os campos obrigatórios.';
    formFeedback.style.color = '#e83f3f';
    return;
  }

  const name = document.getElementById('name').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const category = document.getElementById('category').value;
  const message = document.getElementById('message').value.trim();

  const text = [
    'Olá, Jane Distribuidora! Gostaria de solicitar uma cotação.',
    `Nome: ${name}`,
    company ? `Empresa: ${company}` : null,
    `Telefone: ${phone}`,
    category && category !== 'Selecione uma categoria' ? `Categoria: ${category}` : null,
    message ? `Mensagem: ${message}` : null,
  ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/556392191159?text=${encodeURIComponent(text)}`;
  formFeedback.textContent = 'Abrindo atendimento pelo WhatsApp...';
  formFeedback.style.color = '#13b86a';
  window.open(whatsappUrl, '_blank', 'noopener');
  contactForm.reset();
});

// Modal do portfólio
const portfolioModal = document.getElementById('portfolioModal');

portfolioModal.addEventListener('show.bs.modal', (event) => {
  const card = event.relatedTarget;
  const title = card.getAttribute('data-title');
  const text = card.getAttribute('data-text');
  const image = card.getAttribute('data-image');
  const modalImage = document.getElementById('portfolioModalImage');

  document.getElementById('portfolioModalLabel').textContent = title;
  document.getElementById('portfolioModalText').textContent = text;

  if (image) {
    modalImage.src = image;
    modalImage.alt = `Imagem do projeto ${title}`;
    modalImage.style.display = 'block';
  } else {
    modalImage.removeAttribute('src');
    modalImage.style.display = 'none';
  }
});
