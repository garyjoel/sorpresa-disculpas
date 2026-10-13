const question = document.getElementById('question');
const subtext = document.getElementById('subtext');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const success = document.getElementById('success');
const restartBtn = document.getElementById('restart-btn');
const mainImage = document.getElementById('main-image');
const imagePlaceholder = mainImage.nextElementSibling;
const placeholderHint = document.getElementById('placeholder-hint');

const initialQuestion = '¿Podríamos no estar así… piénsalo? 🥺';
const initialSubtext = 'Un “sí” y lo arreglamos ✨';

// Cada etapa tiene su propia imagen. Coloca los archivos dentro de la carpeta img/.
// Si un archivo no existe, se mostrará el espacio reservado para la imagen.
const stages = [
  {
    question: initialQuestion,
    subtext: initialSubtext,
    image: 'img/inicio.jpg',
    alt: 'Imagen para la pregunta inicial'
  },
  {
    question: '¿Segura que no? 🥺',
    subtext: 'Piénsalo una vez más…',
    image: 'img/segura.jpg',
    alt: 'Imagen para el mensaje ¿Segura que no?'
  },
  {
    question: '¿Ni un poquito? 💗',
    subtext: 'Tomate tu tiempo para pensarlo',
    image: 'img/poquito.jpg',
    alt: 'Imagen para el mensaje ¿Ni un poquito?'
  },
  {
    question: 'Me vas a romper el corazón 💔',
    subtext: 'Mira que me estoy poniendo triste…',
    image: 'img/corazon-roto.jpg',
    alt: 'Imagen para el mensaje del corazón roto'
  },
  {
    question: 'Dame una oportunidad 💗',
    subtext: 'Prometo poner de mi parte.',
    image: 'img/oportunidad.jpg',
    alt: 'Imagen para pedir una oportunidad'
  },
  {
    question: '¿Y si lo intentamos? 🌷',
    subtext: 'Un pasito a la vez, ¿sí?',
    image: 'img/intentarlo.jpg',
    alt: 'Imagen para intentarlo de nuevo'
  }
];

let noCount = 0;
let noScale = 1;

function setMainImage(path, alt) {
  // Restablece el estado del marcador antes de cargar una imagen diferente.
  mainImage.style.display = 'block';
  imagePlaceholder.style.display = 'none';
  mainImage.onerror = () => {
    mainImage.style.display = 'none';
    imagePlaceholder.style.display = 'grid';
    placeholderHint.innerHTML = `Coloca tu archivo en <code>${path}</code>`;
  };
  mainImage.onload = () => {
    mainImage.style.display = 'block';
    imagePlaceholder.style.display = 'none';
  };
  mainImage.alt = alt;
  mainImage.src = path;
  placeholderHint.innerHTML = `Coloca tu archivo en <code>${path}</code>`;
}

function showStage(index) {
  const stage = stages[index];
  question.textContent = stage.question;
  subtext.textContent = stage.subtext;
  setMainImage(stage.image, stage.alt);
}

function resetPage() {
  stopFireworks();
  noCount = 0;
  noScale = 1;
  showStage(0);
  noBtn.style.display = '';
  noBtn.style.transform = 'scale(1)';
  noBtn.style.opacity = '1';
  noBtn.style.minWidth = '';
  noBtn.style.paddingLeft = '';
  noBtn.style.paddingRight = '';
  noBtn.style.pointerEvents = 'auto';
  noBtn.setAttribute('aria-hidden', 'false');
  yesBtn.style.transform = 'scale(1)';
  success.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

noBtn.addEventListener('click', () => {
  noCount += 1;
  // Los seis estados incluyen la pregunta inicial y cinco mensajes diferentes.
  if (noCount < stages.length) {
    showStage(noCount);
  }

  noScale = Math.max(0, noScale - 0.17);
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = String(noScale);
  noBtn.style.minWidth = `${94 * noScale}px`;
  noBtn.style.paddingLeft = `${24 * noScale}px`;
  noBtn.style.paddingRight = `${24 * noScale}px`;
  noBtn.style.pointerEvents = noScale <= 0.02 ? 'none' : 'auto';
  noBtn.setAttribute('aria-hidden', noScale <= 0.02 ? 'true' : 'false');
  yesBtn.style.transform = `scale(${Math.min(1.12, 1 + noCount * 0.025)})`;

  if (noScale <= 0.02) {
    noBtn.style.display = 'none';
    question.textContent = 'Ya solo queda una opción… 💖';
    subtext.textContent = '¿Me das ese sí? ✨';
    setMainImage(
      'img/final2.jpg',
      'Imagen de la última oportunidad'
    );
  }
});


// Fuegos artificiales en canvas: se activan al pulsar Sí.
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fireworksCtx = fireworksCanvas.getContext('2d');
let fireworksFrame = null;
let fireworksEndTime = 0;
let particles = [];

function resizeFireworksCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  fireworksCanvas.width = Math.floor(window.innerWidth * ratio);
  fireworksCanvas.height = Math.floor(window.innerHeight * ratio);
  fireworksCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
window.addEventListener('resize', resizeFireworksCanvas);
resizeFireworksCanvas();

function burstFireworks() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.55 + 30;
  const colors = ['#ff5ca8', '#ffd166', '#7cdbff', '#b69cff', '#ffffff', '#65e6a5'];
  const count = 48;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 1.2 + Math.random() * 4.2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 45 + Math.random() * 35,
      maxLife: 80,
      size: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animateFireworks() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  fireworksCtx.clearRect(0, 0, width, height);

  if (Date.now() < fireworksEndTime && Math.random() < 0.12) {
    burstFireworks();
  }

  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.035;
    p.vx *= 0.99;
    p.vy *= 0.99;
    p.life -= 1;
    fireworksCtx.globalAlpha = Math.max(0, p.life / p.maxLife);
    fireworksCtx.fillStyle = p.color;
    fireworksCtx.beginPath();
    fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fireworksCtx.fill();
  }
  fireworksCtx.globalAlpha = 1;

  if (Date.now() < fireworksEndTime || particles.length > 0) {
    fireworksFrame = requestAnimationFrame(animateFireworks);
  } else {
    fireworksCtx.clearRect(0, 0, width, height);
    fireworksFrame = null;
  }
}

function startFireworks() {
  if (fireworksFrame) cancelAnimationFrame(fireworksFrame);
  particles = [];
  fireworksEndTime = Date.now() + 3800;
  burstFireworks();
  burstFireworks();
  fireworksFrame = requestAnimationFrame(animateFireworks);
}

function stopFireworks() {
  if (fireworksFrame) cancelAnimationFrame(fireworksFrame);
  fireworksFrame = null;
  particles = [];
  fireworksCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

yesBtn.addEventListener('click', () => {
  success.classList.remove('hidden');
  startFireworks();
  restartBtn.focus();
});

restartBtn.addEventListener('click', resetPage);
success.addEventListener('click', (event) => {
  if (event.target === success) resetPage();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !success.classList.contains('hidden')) resetPage();
});

// Asegura que se actualice la imagen inicial y que aparezca el nombre correcto en el marcador.
showStage(0);
