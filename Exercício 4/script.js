class Funcionario{
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    setNome(nome) {this.nome = nome;}
    setIdade(idade) {this.idade = idade;}
    setCargo(cargo) {this.cargo = cargo;}
    setSalario(salario) {this.salario = salario;}

    getNome() {return this.nome;}
    getIdade() {return this.idade;}
    getCargo() {return this.cargo;}
    getSalario() {return this.salario;}

    toString(){
        return `Nome: ${this.nome} Idade: ${this.idade} Cargo: ${this.cargo} Salário: ${this.salario}`;
    }
}

function getListaFuncionarios() {
    const tabela = document.getElementById('tabela');
    let listaFuncionarios = [];

    for (let i = 1; i < tabela.rows.length; i++) {
        const funcionario = new Funcionario(
            tabela.rows[i].cells[0].innerHTML,
            parseInt(tabela.rows[i].cells[1].innerHTML),
            tabela.rows[i].cells[2].innerHTML,
            parseFloat(tabela.rows[i].cells[3].innerHTML)
        );
        listaFuncionarios.push(funcionario);
    }
    return listaFuncionarios;
}

function atualizarRelatorios(){
    const listaFuncionarios = getListaFuncionarios();

    criarListaNomes(listaFuncionarios);
    criarListaCargos(listaFuncionarios);
    calcularMediaSalario(listaFuncionarios);
    criarListaSalariosMaior5000(listaFuncionarios);
}

function criarListaNomes(listaFuncionarios){
    let listaNomes = [];

    listaFuncionarios.forEach(funcionario => {
        listaNomes.push(funcionario.getNome().toUpperCase());
    });
    listaNomes.sort((a, b) => a.localeCompare(b));
    document.getElementById('listaNomes').innerHTML = listaNomes.join(', ');
}

function criarListaCargos(listaFuncionarios){
    let setCargos = new Set();

    listaFuncionarios.forEach(funcionario => {
        setCargos.add(funcionario.getCargo());
    });
    const listaCargos = Array.from(setCargos);
    listaCargos.sort((a, b) => a.localeCompare(b));
    document.getElementById('listaCargos').innerHTML = listaCargos.join(', ');
}

function calcularMediaSalario(listaFuncionarios){
    let somaSalario = 0;
    listaFuncionarios.forEach(funcionario => {
        somaSalario += parseFloat(funcionario.salario);
    });
    const qtFuncionarios = listaFuncionarios.length;
    const mediaSalario = (somaSalario / qtFuncionarios).toFixed(2);
    document.getElementById('mediaSalario').innerHTML = mediaSalario;
}

function criarListaSalariosMaior5000(listaFuncionarios){
    let listaNomes = [];

    listaFuncionarios.forEach(funcionario => {
        if(funcionario.getSalario() >= 5000){
            listaNomes.push(funcionario.getNome().toUpperCase());
        }
    });
    listaNomes.sort((a, b) => a.localeCompare(b));
    document.getElementById('salarioMaior5000').innerHTML = listaNomes.join(', ');
}

function validarCampos() {
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    if (nome === '' || isNaN(idade) || cargo === '' || isNaN(salario)) {
        alert('Preencha todos os campos!');
        return false;
    } else if (idade < 0 || idade > 100) {
        alert('Idade inválida!');
        return false;
    }
    return true;
}

document.getElementById('cadastrar').addEventListener('click', (event) => {
    event.preventDefault();
    if(!validarCampos()){
        return;
    }
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const funcionario = new Funcionario(nome, idade, cargo, salario);

    document.getElementById('formulario').reset();
    addFuncionarioTabela(funcionario);
});

function addFuncionarioTabela(funcionario){
    const tabela = document.getElementById('tabela');
    const linha = tabela.insertRow(1);

    const valores = [funcionario.nome, funcionario.idade, funcionario.cargo, funcionario.salario];
    valores.forEach((valor, index) => {
        const celula = linha.insertCell(index);
        celula.innerHTML = valor;
    });

    createButtons(linha);
    funcionario = null;
    atualizarRelatorios();
}

function createButtons(linha){
    const botoes = ['Editar', 'Excluir'];

    botoes.forEach((comando, index) => {
        const celula = linha.insertCell(4 + index);
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.innerHTML = comando;
        botao.addEventListener('click', () => {
            if(comando === 'Editar'){
                const colunas = ['nome', 'idade', 'cargo', 'salario'];
                colunas.forEach((coluna, index) => {
                    document.getElementById(coluna).value = linha.cells[index].innerHTML;
                });
                linha.remove();
            } else{
                linha.remove();
                atualizarRelatorios();
            }
        });
        celula.appendChild(botao);
    });
}