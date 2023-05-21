const chalk = require("chalk")

const calculationPainel = async(potenciaTotalKW, potenciaPlaca, comprimento, largura) => {
    var results = {}
    const potenciaTotal = potenciaTotalKW * 1000;
    
    const qtsPlaca = Math.ceil(potenciaTotal / potenciaPlaca) 
    const inversores = Math.ceil(qtsPlaca / 4)

    const areaTotal = qtsPlaca * (comprimento * largura)

    const comprimentoTotal = comprimento * qtsPlaca

    results.qtsPlaca = qtsPlaca
    results.inversores = inversores
    results.potenciaPlaca = potenciaPlaca
    results.comprimento = comprimento
    results.largura = largura
    results.comprimentoTotal = comprimentoTotal
    results.areaTotal = areaTotal

    // console.log("O número de placas solares necessario é: "+chalk.green(qtsPlaca)+"\n")
    
    // console.log("O número de inversores necessario é: "+chalk.green(inversores)+"\n")

    // console.log("Potência do painel utilizado é de: "+chalk.green(potenciaPlaca+" watts\n"))

    // console.log("O comprimeto total para instalar o painel é de: "+chalk.green(comprimentoTotal+" metros\n"))

    // console.log("A área total para instalar o painel é de: "+chalk.green(areaTotal+" metros²\n"))
    
    return results
}

module.exports = calculationPainel