export const calculationPainel  = async(potenciaTotalKW:number, potenciaPlaca:number, comprimento:number, largura:number) => {
    let results: {
        qtsPlaca:number, 
        inversores:number, 
        potenciaPlaca:number, 
        comprimento:number, 
        largura:number, 
        comprimentoTotal:number, 
        areaTotal:number
    } = {
        qtsPlaca: null,
        inversores: null,
        potenciaPlaca: null,
        comprimento: null,
        largura: null,
        comprimentoTotal: null,
        areaTotal: null,
    } 

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
    
    return results
}