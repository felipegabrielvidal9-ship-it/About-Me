document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("entrar");
  const btnPular = document.getElementById("pular");
  const audio = document.getElementById("intro-audio");
  const abertura = document.getElementById("abertura");
  const conteudo = document.getElementById("conteudo");
  const logo = document.querySelector(".logo");
  const wordMy = document.getElementById("word-my");
  const wordWorld = document.getElementById("word-world");

  // botão PULAR começa centralizado
  btnPular.classList.add("centered");

  // CLICK em Entrar
  btnEntrar.addEventListener("click", async () => {
    btnEntrar.style.display = "none";

    try { audio.currentTime = 0; await audio.play(); } 
    catch (e) { console.log("Erro no áudio:", e); }

    const duracao = audio.duration || 6;
    logo.style.transition = `transform ${duracao}s cubic-bezier(0.85,0,0.15,1)`;
    logo.style.transform = "scale(2)";

    setTimeout(() => {
      wordMy.classList.add("out-left");
      wordWorld.classList.add("out-right");
    }, 500);

    audio.addEventListener("ended", () => {
      abertura.style.display = "none";
      conteudo.classList.remove("hidden");
    });

    // Depois que entra, move Pular pro canto
    btnPular.classList.remove("centered");
    btnPular.classList.add("corner");
  });

  // CLICK em Pular
  btnPular.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    abertura.style.display = "none";
    conteudo.classList.remove("hidden");

    // garante que o botão vá pro canto se ainda estiver centralizado
    btnPular.classList.remove("centered");
    btnPular.classList.add("corner");
  });
});

