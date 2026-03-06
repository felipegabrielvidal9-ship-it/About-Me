const texto = "RUN";
let i = 0;
setInterval(() => {
  document.getElementById("mensagem").textContent = texto.slice(0, i);
  i = i > texto.length ? 0 : i + 1;
}, 400);


