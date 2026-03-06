const abertura = document.getElementById("abertura");
const btnPular = document.getElementById("pular");
const conteudo = document.getElementById("conteudo");
const audio = document.getElementById("intro-audio");

// Função para criar partículas do portal
function criarParticula() {
  const particula = document.createElement("div");
  particula.classList.add("portal-particle");
  particula.style.left = Math.random() * window.innerWidth + "px";
  particula.style.top = window.innerHeight + "px";
  particula.style.width = Math.random() * 4 + 2 + "px";
  particula.style.height = particula.style.width;
  particula.style.animationDuration = 5 + Math.random() * 3 + "s";
  abertura.appendChild(particula);

  setTimeout(() => {
    particula.remove();
  }, 7000);
}

// Criar partículas continuamente
setInterval(criarParticula, 150);

// Partículas seguindo o mouse
document.addEventListener("mousemove", (e) => {
  const particula = document.createElement("div");
  particula.classList.add("portal-particle");
  particula.style.left = e.clientX + "px";
  particula.style.top = e.clientY + "px";
  particula.style.width = "4px";
  particula.style.height = "4px";
  particula.style.opacity = 0.8;
  particula.style.animationDuration = "1s";
  abertura.appendChild(particula);
  setTimeout(() => particula.remove(), 1000);
});

// Botão de pular funcionando
btnPular.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  abertura.style.display = "none";
  conteudo.classList.remove("hidden");
});
