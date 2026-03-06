document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("esporos");

  function criarEsporo() {
    const esporo = document.createElement("div");
    esporo.classList.add("esporo");

    esporo.style.left = Math.random() * window.innerWidth + "px";

    const duracao = 8 + Math.random() * 8; // bem mais lento
    esporo.style.animationDuration = `${duracao}s, ${2 + Math.random() * 3}s`;

    container.appendChild(esporo);

    setTimeout(() => {
      esporo.remove();
    }, duracao * 1100);
  }

  setInterval(criarEsporo, 180);
});
