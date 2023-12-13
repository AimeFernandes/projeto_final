async function enviar(acao) {
  limparToken();
  const email = document.querySelector("input#email").value;
  const senha = document.querySelector("input#senha").value;

  const dados = { email: email, senha: senha };

  switch (acao) {
    case "logar":
      try {
        const respostaLogin = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(dados),
        });
        const retornoApi = await respostaLogin.json();
        if (retornoApi.login === true) {
          const token = retornoApi.token;
          localStorage.setItem("token", token);

          window.location.href = "./sistema/index.html";
        } else {
          mostrarMessage(retornoApi.message);
        }
      } catch (error) {
        mostrarMessage(error.message);
      }
      break;
    case "cadastrar":
      const respostaCadastro = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(dados),
      });

      const message = await respostaCadastro.json();
      mostrarMessage(message.message);
      break;
  }
}
function mostrarMessage(message) {
  const card = document.getElementById("alerta");
  const texto = document.getElementById("alert-text");

  texto.innerHTML = message;
  card.style.display = "flex";

  setTimeout(() => {
    card.style.display = "none";
  }, 5000);
}
function limparToken() {
  localStorage.clear();
}