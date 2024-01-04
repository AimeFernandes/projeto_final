const baseUrl = "http://localhost:3000"

async function enviar(acao) {
  limparToken();
  const email = document.querySelector("input#email").value;
  const senha = document.querySelector("input#senha").value;

  const dados = { email: email, password: senha };
  //const dadosADM = { email: "admin@gmail.com", password: "1234" };
  switch (acao) {
    case "logar":
      try {
        const respostaLogin = await fetch(baseUrl + "/loginADM", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(dados),
        });
        const retornoApi = await respostaLogin.json();
        console.log("Essa é a repostado login: ", respostaLogin)
        if (retornoApi.login === true) {
          const token = retornoApi.token;
          localStorage.setItem("token", token);

          const decodedToken = parseJwt(token)
          if(decodedToken.isAdmin){
            window.location.href = "./sistema/index.html";
          } else{
            mostrarMessage("Acesso não autorizado.");
          }
          } else {
          mostrarMessage(retornoApi.message);
        }
      } catch (error) {
        mostrarMessage(error.message);
      }
      break;
      case "logarFuncionario":
      try {
        const respostaLogin = await fetch(baseUrl + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(dados),
        });
        const retornoApi = await respostaLogin.json();
        if (retornoApi.login === true) {
          const token = retornoApi.token;
          localStorage.setItem("token", token);

          window.location.href = "./sistema/funcionario.html";
        } else {
          mostrarMessage(retornoApi.message);
        }
      } catch (error) {
        mostrarMessage(error.message);
      }
      break;
    case "cadastrar":
      const respostaCadastro = await fetch(baseUrl + "/cadastro", {
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


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
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