document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("entrar");
  const btnPular = document.getElementById("pular");
  const audio = document.getElementById("intro-audio");
  const abertura = document.getElementById("abertura");
  const logo = document.querySelector(".logo");
  const wordMy = document.getElementById("word-my");
  const wordWorld = document.getElementById("word-world");
  const conteudo = document.getElementById("conteudo");

  // BOTÃO ENTRAR
  btn.addEventListener("click", async () => {
    btn.style.display = "none"; // some botão

    try {
      audio.currentTime = 0;
      audio.volume = 1;
      await audio.play();
    } catch (e) { console.log("Erro no áudio:", e); }

    const duracao = audio.duration || 6;

    // zoom do logo central (UPSIDE DOWN)
    logo.style.transition = `transform ${duracao}s cubic-bezier(0.85,0,0.15,1)`;
    logo.style.transform = "scale(2)";

    // MY e WORLD deslizam pra fora suavemente
    setTimeout(() => {
      wordMy.classList.add("out-left");
      wordWorld.classList.add("out-right");
    }, 500); // ajusta o tempo que quiser

    // quando áudio acabar, some abertura e mostra conteúdo
    audio.addEventListener("ended", () => {
      abertura.style.display = "none";
      conteudo.classList.remove("hidden");
    });
  });

  // BOTÃO PULAR
  btnPular.addEventListener("click", () => {
    // Para o áudio imediatamente
    audio.pause();
    audio.currentTime = 0;

    // Some a abertura
    abertura.style.display = "none";

    // Mostra conteúdo
    conteudo.classList.remove("hidden");

    // opcional: já manda MY e WORLD para fora
    wordMy.classList.add("out-left");
    wordWorld.classList.add("out-right");
  });
});

const btn = document.getElementById("entrar");
const btnPular = document.getElementById("pular");
const audio = document.getElementById("intro-audio");
const abertura = document.getElementById("abertura");
const logo = document.querySelector(".logo");
const wordMy = document.getElementById("word-my");
const wordWorld = document.getElementById("word-world");
const conteudo = document.getElementById("conteudo");

btn.addEventListener("click", async () => {
  btn.style.display = "none"; // some botão entrar
  btnPular.style.display = "none"; // esconde botão pular se clicar em entrar

  try {
    audio.currentTime = 0;
    audio.volume = 1;
    await audio.play();
  } catch (e) { console.log("Erro no áudio:", e); }

  const duracao = audio.duration || 6;

  // Zoom do logo central (UPSIDE DOWN)
  logo.style.transition = `transform ${duracao}s cubic-bezier(0.85,0,0.15,1)`;
  logo.style.transform = "scale(2)";

  // MY e WORLD deslizam pra fora suavemente
  setTimeout(() => {
    wordMy.classList.add("out-left");
    wordWorld.classList.add("out-right");
  }, 15500);

  // Quando áudio acabar, some abertura e mostra conteúdo
  audio.addEventListener("ended", () => {
    abertura.style.display = "none";
    conteudo.classList.remove("hidden");
    btnPular.style.display = "none"; // esconde botão pular também


    
  });
});

