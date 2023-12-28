const baseUrl = "http://localhost:3000"
    
    getDados();

async function addPeca() {
    const inputNome = document.querySelector("#inputNome")
    const inputPreco = document.querySelector("#inputPreco");
    const inputDescricao = document.querySelector("#inputDescricao");
    const inputQuantidade = document.querySelector("#inputQuantidade");
    const dados = {
        nome: inputNome.value,
        preco: inputPreco.value,
        descricao: inputDescricao.value,
        quantidade: inputQuantidade.value
    }

    try {
        await fetch(baseUrl + "/addPeca", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });
        location.reload();
    } catch (error) {
        alert("Ocorreu um erro" + error)
    }

    //Limpar dados 
    inputNome.value = "";
    inputPreco.value = "";
    inputDescricao.value = "";
    inputQuantidade.value = "";

    //Fechar janela
    const m = document.querySelector("#exampleModal");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
    exibirDados();
}

async function exibirDados(agenda) {

    const tbody = document.querySelector("#dadosEstoque");

    let linhas = "";
    agenda.forEach((dado, index) => {
        linhas += `<tr>
            <td>${index + 1}</td>
            <td>${dado.nome}</td>
            <td>${dado.preco}</td>
            <td>${dado.descricao}</td>
            <td>${dado.quantidade}</td>
            <td><i class="bi bi-pencil-square" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#editModal" onclick="preencherCampos('${dado.id}')"></i></td>
            <td><i class="bi bi-trash" style="cursor: pointer" onclick="removerDados(${dado.id})"></i></td>
        </tr>`;
    });

    if (linhas == "") {
        linhas = `
        <tr>
            <td colspan="5" style="text-align:center">Não há dados cadastrados</td>
        </tr>
        `;
    }

    tbody.innerHTML = linhas;

}

async function getDados(){

    try {
        const response = await fetch(baseUrl + "/listarPecas");
        const data = await response.json();
        exibirDados(data);
    } catch (error) {
        alert("Ocorreu um erro: "+ error)
    }

}

async function buscarDados() {
    const nome = document.querySelector("#search").value;

    try {
        if (nome == "")
        await getDados();
        else {
            const response = await fetch(baseUrl + "/buscarPecaPorNome/" + nome);
            const data = await response.json();
            exibirDados(data);
        }

    } catch (error) {
        alert("Ocorreu um erro")
    }

}

async function removerDados(id){

    const modalRemover = new bootstrap.Modal('#modalRemover');
    modalRemover.show();
    const btnRemover = document.querySelector("#remover");
    btnRemover.addEventListener("click", async () => {

        try {
            await fetch(baseUrl + "/deletarPeca/" + id, { method: "DELETE" });
            modalRemover.hide();
            exibirDados(agenda);
        } catch (error) {
            document.location.reload();
        }

    });
}

let idDoPecaParaEditar;

async function preencherCampos(idPeca) {
    const id = parseInt(idPeca);
    idDoPecaParaEditar = id;
    const editNome = document.querySelector("#editNome");
    const editPreco = document.querySelector("#editPreco");
    const editDescricao = document.querySelector("#editDescricao");
    const editQuantidade = document.querySelector("#editQuantidade");

    try {
        const response = await fetch(baseUrl + "/buscarPecaPorId/" + id);
        const data = await response.json();
        editNome.value = data[0].nome;
        editPreco.value = data[0].preco;
        editDescricao.value = data[0].descricao;
        editQuantidade.value = data[0].quantidade;
    } catch (error) {
        alert("Ocorreu um erro " + error);
    }
}

function sair() {
        localStorage.clear();
        window.location.href = '../login.html';
}

async function editar() {
    const novoNome = document.querySelector("#editNome").value;
    const novoPreco = document.querySelector("#editPreco").value;
    const novaDescricao = document.querySelector("#editDescricao").value;
    const novaQuantidade = document.querySelector("#editQuantidade").value;

    try {
        const resposta = await fetch("http://localhost:3000/editarPeca", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            novoNome,
            novoPreco,
            novaDescricao,
            novaQuantidade,
            id: idDoPecaParaEditar,
        }),
        });
        const resp = await resposta.json();
        alert(resp.message);
        location.reload();
    } catch (error) {
        alert("Erro ao editar " + error);
    }
}
