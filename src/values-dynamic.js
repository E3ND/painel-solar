const inquirer = require("inquirer")
const chalk = require("chalk")

const calculationPainel = require("../helpers/calculation-painel")

function values() {
    inquirer.prompt([
        {
            name: "potenciaTotalKW",
            message: "Digite a potência total do um sistema hipotético (em kilo Watts): "
        },
        {
            name: "potenciaPlaca",
            message: "Digite a potência da placa (em watts): "
        },
        {
            name: "comprimento",
            message: "Digite o comprimento da placa (em metros): "
        },
        {
            name: "largura",
            message: "Digite a largura da placa (em metros): "
        }
    ]).then((answers) => {
        if(answers.potenciaTotalKW === "" || answers.potenciaPlaca === "" || answers.comprimento === "" || answers.largura === "") {
            console.log(chalk.red("Digite todos os valores corretamente!"))
            values()
        }else {
            calculationPainel(answers.potenciaTotalKW, answers.potenciaPlaca, answers.comprimento, answers.largura)
            valuesDynamic()
        }
    })
}

const valuesDynamic = async() => {
    inquirer.prompt([
        {
            name: "question",
            message: "Deseja inserir outros valores?"
        }
    ]).then((answer) => {
        if(answer.question.toLowerCase() === "sim" || answer.question.toLowerCase() === "s") {
            console.log(answer.question.toLowerCase())
            values()
        }else {
            console.log(chalk.blue("Até a próxima!"))
        }
    })
}

module.exports = valuesDynamic