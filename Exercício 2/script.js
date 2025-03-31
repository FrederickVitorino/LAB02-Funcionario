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

document.getElementById('cadastrar').addEventListener('click', function(event){
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const funcionario = new Funcionario(nome, idade, cargo, salario);

    document.getElementById('formulario').reset();
    addFuncionarioTabela(funcionario);
    funcionario = null;
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
}

function createButtons(linha){
    const botoes = ['Editar', 'Excluir'];

    botoes.forEach((comando, index) => {
        const celula = linha.insertCell(4 + index);
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.innerHTML = comando;
        botao.addEventListener('click', function(){
            if(comando === 'Editar'){
                const colunas = ['nome', 'idade', 'cargo', 'salario'];
                colunas.forEach((coluna, index) => {
                    document.getElementById(coluna).value = linha.cells[index].innerHTML;
                });
                linha.remove();
            } else{
                linha.remove();
            }
        });
        celula.appendChild(botao);
    });
}
