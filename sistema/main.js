const baseUrl = "http://localhost:3000"
    
    getDados();

async function addProduto() {
    const inputCategoria = document.querySelector("#inputCategoria");
    const inputNome = document.querySelector("#inputNome")
    const inputPreco = document.querySelector("#inputPreco");
    const inputDescricao = document.querySelector("#inputDescricao");
    const dados = {
        categoria: inputCategoria.value,
        nome: inputNome.value,
        preco: inputPreco.value,
        descricao: inputDescricao.value
    }

    try {
        await fetch(baseUrl + "/produtos", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });
        location.reload();
    } catch (error) {
        alert("Ocorreu um erro")
        console.log(error)
    }

    //Limpar dados 
    inputCategoria.value = "";
    inputNome.value = "";
    inputPreco.value = "";
    inputDescricao.value = "";

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
            <td>${dado.categoria}</td>
            <td>${dado.nome}</td>
            <td>${dado.preco}</td>
            <td>${dado.descricao}</td>
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
        const response = await fetch(baseUrl + "/listarProdutos");
        const data = await response.json();
        exibirDados(data);
    } catch (error) {
        alert("Ocorreu um erro")
        console.log(error)
    }

}

async function buscarDados() {
    const nome = document.querySelector("#search").value;

    try {
        if (nome == "")
        await getDados();
        else {
            const response = await fetch(baseUrl + "/buscarProdutoNome/" + nome);
            const data = await response.json();
            exibirDados(data);
        }

    } catch (error) {
        alert("Ocorreu um erro")
        console.log(error)
    }

}

async function removerDados(id){

    const modalRemover = new bootstrap.Modal('#modalRemover');
    modalRemover.show();
    const btnRemover = document.querySelector("#remover");
    btnRemover.addEventListener("click", async () => {

        try {
            await fetch(baseUrl + "/deletarProduto/" + id, { method: "DELETE" });
            modalRemover.hide();
            exibirDados(agenda);
        } catch (error) {
            document.location.reload();
        }

    });
}

let idDoProdutoParaEditar;

async function preencherCampos(idProduto) {
    const id = parseInt(idProduto);
    idDoProdutoParaEditar = id;
    const editCategoria = document.querySelector("#editCategoria");
    const editNome = document.querySelector("#editNome");
    const editPreco = document.querySelector("#editPreco");
    const editDescricao = document.querySelector("#editDescricao");

    try {
        const response = await fetch(baseUrl + "/buscarProduto/" + id);
        const data = await response.json();
        editCategoria.value = data[0].categoria;
        editNome.value = data[0].nome;
        editPreco.value = data[0].preco;
        editDescricao.value = data[0].descricao;
    } catch (error) {
        alert("Ocorreu um erro " + error);
    }
}

function sair() {
        localStorage.clear();
        window.location.href = '../login.html';
}

async function editar() {
    const novaCategoria = document.querySelector("#editCategoria").value;
    console.log(novaCategoria);
    const novoNome = document.querySelector("#editNome").value;
    const novoPreco = document.querySelector("#editPreco").value;
    const novaDescricao = document.querySelector("#editDescricao").value;

    try {
        const resposta = await fetch("http://localhost:3000/editarProduto", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            novaCategoria,
            novoNome,
            novoPreco,
            novaDescricao,
            id: idDoProdutoParaEditar,
        }),
        });
        const resp = await resposta.json();
        alert(resp.message);
        location.reload();
    } catch (error) {
        alert("Erro ao editar " + error);
    }
}
