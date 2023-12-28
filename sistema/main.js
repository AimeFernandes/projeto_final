const baseUrl = "http://localhost:3000"

getDados();

async function addPeca() {

    const cadastro = document.querySelector("#cadastro")
    cadastro.addEventListener("click", async() =>{

        const inputNome = document.querySelector("#inputNome").value
        const inputPreco = document.querySelector("#inputPreco").value
        const inputDescricao = document.querySelector("#inputDescricao").value
        const inputQuantidade = document.querySelector("#inputQuantidade").value

        const dados = {
            nome: inputNome,
            quantidade: inputQuantidade,
            preco: inputPreco,
            descricao: inputDescricao
        }

        console.log("Dados: ", dados)

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
    })

}

async function exibirDados(data) {

    const tbody = document.querySelector("#dadosEstoque");
    console.log(data)

    let linhas = "";

    if(!data || data.length == 0){
        linhas = `
            <tr>
                <td colspan="5" style="text-align:center"> Não há peças cadastradas</td>
            </tr>
        `
    }else {
        data.forEach((dado, index) => {
            linhas += `<tr>
                <td>${index + 1}</td>
                <td>${dado.nome}</td>
                <td>${dado.preco}</td>
                <td>${dado.descricao}</td>
                <td>${dado.quantidade}</td>
                <td><i class="bi bi-pencil-square" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#editModal" onclick="preencherCampos('${dado.id_peca}')"></i></td>
                <td><i class="bi bi-trash" style="cursor: pointer" onclick="removerDados(${dado.id_peca})"></i></td>
            </tr>`;
        });
    }

    tbody.innerHTML = linhas;
}

async function getDados(){
    try {
        const response = await fetch(baseUrl + "/listarPecas", {
            method: "GET"
        });
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
    console.log(id)
    const id_peca = parseInt(id)    
    const modalRemover = new bootstrap.Modal('#modalRemover');
    modalRemover.show();

    const btnRemover = document.querySelector("#remover");
    btnRemover.addEventListener("click", async () => {

        try {
            await fetch(baseUrl + /deletarPeca/ + id_peca, { method: "DELETE" });
            modalRemover.hide();
            exibirDados();
            getDados()
        } catch (error) {
            document.location.reload();
            console.log(error)
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

async function editar(id_peca) {

    const novoNome = document.querySelector("#editNome").value;
    const novoPreco = document.querySelector("#editPreco").value;
    const novaDescricao = document.querySelector("#editDescricao").value;
    const novaQuantidade = document.querySelector("#editQuantidade").value;

    try {
        const resposta = await fetch(baseUrl + "/editarPeca/" + id_peca, {
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
