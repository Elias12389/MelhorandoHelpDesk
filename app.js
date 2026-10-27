// ======================================================================
// AULA 02 - SPA COM JAVASCRIPT PURO
// ======================================================================

// Array com dados temporários.
// Eles existem apenas enquanto a página está aberta.
const chamados = [
  {
    // Identificador único deste exemplo.
    id: 1,

    // Título curto.
    titulo: "Computador não liga",

    // Descrição detalhada.
    descricao: "O computador não apresenta sinal de energia.",

    // Prioridade do atendimento.
    prioridade: "Alta",

    // Situação atual.
    status: "Aberto",
  },
  {
    id: 2,
    titulo: "Senha bloqueada",
    descricao: "Usuário não consegue acessar o sistema.",
    prioridade: "Média",
    status: "Em atendimento",
  },
  {
    // Identificador único deste exemplo.
    id: 3,

    // Título curto.
    titulo: "notebook não liga",

    // Descrição detalhada.
    descricao: "O computador não apresenta sinal de energia.",

    // Prioridade do atendimento.
    prioridade: "Baixo",

    // Situação atual.
    status: "Encerrado",

    solucao: "Troca de bateria realizada",
  },
];

//Colocando as prioridades dentro do Array
const prioridades = ["Alta", "Média", "Baixo"];

function chamadosBadge(prioridade) {
  const estilos = {
    Baixo: "badge bg-success text-white",
    Média: "badge bg-warning",
    Alta: "badge bg-danger piscar",
  };

  return estilos[prioridade] || "badge bg-secondary";
}

function chamadosStatus(status) {
  const estilosStatus = {
    Aberto: "badge bg-warning text-white",
    "Em atendimento": "badge bg-primary text-white", //Tive que colocar dessa forma para suportar o espaço
    Encerrado: "badge bg-success text-white",
  };
  return estilosStatus[status] || "badge bg-secondary";
}

//Função responsável por cada chamado aparecer na tela e por percorrer cada um.
function acoes(chamados) {
  //validação para saber quando carregar o botão de encerrar chamado
  if (chamados.status === "Aberto" || chamados.status === "Em atendimento") {
    return `
      <button class="btn btn-sm btn-danger border-1 border-black" data-id="${chamados.id}" data-acao="encerrar"> Encerrar chamado </button>
      <button class="btn btn-sm btn-info border-1 border-black" data-id="${chamados.id}" data-acao="visualizar">Visualizar</button>
    `;
  }

  return `
    <p><span class="badge bg-success p-2">Chamado encerrado</span></p>
    <button class="btn btn-sm btn-info border-1 border-black" data-id="${chamados.id}" data-acao="visualizar">Visualizar</button>
  `;
}

// Procura o elemento <div id="app">.
// Guardaremos a referência para alterar a tela.
const app = document.getElementById("app");

// Função que desenha o Dashboard.
function mostrarDashboard() {
  // filter cria um novo array com chamados abertos.
  // length conta quantos existem.
  const abertos = chamados.filter(
    (chamado) => chamado.status === "Aberto",
  ).length;

  //Pegando as demais informações para exibir no dashboard
  const emAtendimento = chamados.filter(
    (chamado) => chamado.status === "Em atendimento",
  ).length;

  const chamadosEncerrados = chamados.filter(
    (chamado) => chamado.status === "Encerrado",
  ).length;

  const prioridadeAlta = chamados.filter(
    (chamado) => chamado.prioridade === "Alta",
  ).length;
  // innerHTML substitui o conteúdo da área principal.
  app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Total de chamados</h2>

                        <p class="display-6">
                            ${chamados.length}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Abertos</h2>

                        <p class="display-6">
                            ${abertos}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Em atendimento</h2>

                        <p class="display-6">
                            ${emAtendimento}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Encerrados</h2>

                        <p class="display-6">
                            ${chamadosEncerrados}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Prioridade alta</h2>

                        <p class="display-6">
                            ${prioridadeAlta}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// Função que desenha a listagem.
function mostrarChamados() {
  app.innerHTML = `
        <h1 class="mb-4">Chamados</h1>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody class="w-100">

                    ${
                      // map transforma cada objeto em uma linha HTML.                 // Tive que adicionar a propriedade span nos textos por questões estéticas
                      chamados
                        .map(
                          (chamado) => `
                            <tr>
                                <td>${chamado.id}</td>
                                <td>${chamado.titulo}</td>
                                
                                <td><span class="${chamadosBadge(chamado.prioridade)}">${chamado.prioridade}</span></td>
                                <td><span class="${chamadosStatus(chamado.status)}">${chamado.status}</span></td>
                                <td>${acoes(chamado)}</td>
                            </tr>
                        `,
                        )
                        // join une todas as linhas sem vírgula.
                        .join("")
                    }
                </tbody>
            </table>
        </div>
    `;

  //Guardando em uma variável todos os botões com o data id
  let encerrarChamado = document.querySelectorAll("[data-id]");

  //Adicionando o evento de click para cada botão
  encerrarChamado.forEach((encerramento) => {
    encerramento.addEventListener("click", (e) => {
      if (encerramento.dataset.acao === "encerrar") {
        let idChamado = encerramento.dataset.id;

        //método find utilizado para buscar dentro da lista chamado o chamado com a condição específica
        const chamadoSelecionado = chamados.find((chamado) => {
          return chamado.id === Number(idChamado); //Number para converter o valor de string pego em número
        });

        chamadoSelecionado.status = "Em atendimento"; //No exercício em sí não pede, mas fiz porque não tem como acessar o status "Em atendimento" de outra forma.
        mostrarEncerramentos(chamadoSelecionado); //Chamando a função mostrarEncerramento com o id correto que deve ser carregado na tela
      } else if (encerramento.dataset.acao === "visualizar") {
        let idEncerramento = encerramento.dataset.id;

        const chamadoVisualizado = chamados.find((chamado) => {
          return Number(idEncerramento) === chamado.id;
        });

        mostrarVisualizacao(chamadoVisualizado);
      }
    });
  });
}

//Função para fazer aparecer na tela os chamados encerrados
function mostrarEncerramentos(chamado) {
  app.innerHTML = `
    <div class="card text-center w-100 align-items-center container d-flex flex-column">    
        <h1><span>${chamado.titulo}</span></h1>
        <h4><span>Chamado: #${chamado.id}</span></h4>
        <p><b><span>Descrição:</span></b></p>
        <p><span>${chamado.descricao}</span></p>
        <p><b><span>Prioridade:</span></b></p>
        <p class="${chamadosBadge(chamado.prioridade)} w-25"><span>${chamado.prioridade}</span></p>
        <p><b><span>Status:</span></b></p>
        <p><span>${chamado.status}</span></p>
    </div>
    <div class="card text-center mt-2">
        <form id="formularioEncerramento" class="container d-flex flex-column align-items-center">
        <label for="procedimentoRealizado">Digite o procedimento realizado</label>
        <textarea name="" id="procedimentoRealizado" class="w-50"></textarea>
        <p class="text-danger" id="mensagemErro"></p>
        <button class="btn btn-sm btn-success mt-4 mb-4 w-50" type="submit">Enviar Solução</button>
        </form>
    </div>
      `;

  const formulario = document.querySelector("#formularioEncerramento");

  formulario.addEventListener("submit", (envio) => {
    envio.preventDefault();
    let textoProcedimento = document.querySelector(
      "#procedimentoRealizado",
    ).value;
    textoProcedimento = textoProcedimento.trim();

    let mensagemErro = document.querySelector("#mensagemErro");

    if (textoProcedimento === "") {
      return (mensagemErro.textContent = "Por favor, digite um valor válido!");
    }
    mensagemErro.textContent = "";

    //Adicionando o campo novo de solução somente para o campo específico
    chamado.solucao = textoProcedimento;
    chamado.status = "Encerrado";

    //Garante que volte para a tela dos chamados
    mostrarChamados();
  });
}

// Função que desenha o formulário.
function mostrarNovoChamado() {
  app.innerHTML = `
        <h1 class="mb-4">Novo chamado</h1>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">
                    Título
                </label>

                <input
                    class="form-control"
                    id="titulo"
                    >
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">
                    Descrição
                </label>

                <textarea
                    class="form-control"
                    id="descricao"
                    rows="4">
                </textarea>
            </div>
            <div class="mb-3">
                <label class="form-label" for="prioridade">
                    Prioridade
                </label>

                <select class="form-select" id="prioridade">
                 
                ${prioridades //Tornando as propriedades dinâmicas e fazendo elas aparecerem nos campos por meio de JS
                  .map(
                    (prioridade) => `
                <option value="${prioridade}">
                    ${prioridade}
                </option>
        `,
                  )
                  .join("")}
                </select>
            </div>

            <p><span class="text-danger" id="mensagemErroCadastroChamado"><span><p>

            <button class="btn btn-success" type="submit">
                Cadastrar
            </button>
        </form>
    `;

  // Procura o formulário que acabou de ser criado.
  const formulario = document.getElementById("formChamado");

  // Escuta o envio do formulário.
  formulario.addEventListener("submit", cadastrarChamado);
}
//Função responsável por fazer aparecer na tela a parte do visualizar
function mostrarVisualizacao(chamado) {
  app.innerHTML = `
      <div class="card">
        <h1>${chamado.titulo}</h1>
        <p><b>Descrição: </b>${chamado.descricao}</p>
        <p><b>Prioridade </b>${chamado.prioridade}</p>
        <p><b>Status: </b>${chamado.status}</p>
        ${chamado.status === "Encerrado" ? `<p><b>Solução:</b>${chamado.solucao}</p> ` : ""}
      </div>
  `;
}

// Função executada no submit.
function cadastrarChamado(evento) {
  // Impede o navegador de recarregar a página.
  evento.preventDefault();

  //Pegando os valores para fazer a mensagem de erro
  let tituloFormulario = document.querySelector("#titulo").value;
  let descricao = document.querySelector("#descricao").value;

  tituloFormulario = tituloFormulario.trim();
  descricao = descricao.trim();

  //Pegando a mensagem de erro do próprio formulario
  let mensagemErro = document.querySelector("#mensagemErroCadastroChamado");

  if (tituloFormulario === "" || descricao === "") {
    return (mensagemErro.textContent = "Por favor, digite valores válidos!");
  }
  mensagemErro.textContent = ""; //Garante que a mensagem de erro será limpa após o cadastro do novo chamado

  // push adiciona um novo objeto no array.
  chamados.push({
    // ID simplificado para aula.
    id: chamados.length + 1,

    // Lê o valor do campo título.
    titulo: document.getElementById("titulo").value,

    // Lê o valor da descrição.
    descricao: document.getElementById("descricao").value,

    // Lê o valor selecionado.
    prioridade: document.getElementById("prioridade").value,

    // Novo chamado começa aberto.
    status: "Aberto",
  });

  // Depois do cadastro ele vai mostra a lista com o novo cadastro
  mostrarChamados();
}

// Seleciona todos os elementos que têm data-view.
const links = document.querySelectorAll("[data-view]");

// Percorre os links.
links.forEach((link) => {
  // Escuta clique.
  link.addEventListener("click", (evento) => {
    // Impede navegação padrão.
    evento.preventDefault();

    // Lê data-view.
    const view = link.dataset.view;

    // Decide qual "tela" mostrar.
    if (view === "dashboard") {
      mostrarDashboard();
    }

    if (view === "chamados") {
      mostrarChamados();
    }

    if (view === "novo") {
      mostrarNovoChamado();
    }
  });
});

// Primeira tela.
mostrarDashboard();
