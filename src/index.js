const expreess = require("express")

const db = require("../db/conn")

const app = expreess()

const calculationPainel = require("../helpers/calculation-painel")
const valuesDynamic = require("./values-dynamic")


const painelByUser = db.collection("PainelUser")

app.use(expreess.json())
// calculationPainel(4.5, 550, 1.95, 1.1)
//create
app.post('/register', async (req, res) => {
    const { name, email, phone, potenciaTotalKW, potenciaPlaca, comprimento, largura } = req.body

    if(!name) {
        res.status(422).json({ message: 'O campo nome é obrigatório!' })
        return
    }

    if(!email) {
        res.status(422).json({ message: 'O campo e-mail é obrigatório!' })
        return
    }
    
    if(!phone) {
        res.status(422).json({ message: 'O campo telefone é obrigatório!' })
        return
    }

    if(!potenciaTotalKW) {
        res.status(422).json({ message: 'É necessário informar a potência total' })
        return
    }

    if(!potenciaPlaca) {
        res.status(422).json({ message: 'É necessário informar a potência do painel solar' })
        return
    }

    if(!comprimento) {
        res.status(422).json({ message: 'É necessário informar o comprimento do painel solar' })
        return
    }

    if(!largura) {
        res.status(422).json({ message: 'É necessário informar a largura do painel solar' })
        return
    }

    const painelResults = calculationPainel(potenciaTotalKW, potenciaPlaca, comprimento, largura)

    const data = {
        name,
        email,
        phone,
        qtsPlaca: null,
        inversores: null,
        potenciaTotalKW: potenciaTotalKW,
        potenciaPlaca: potenciaPlaca,
        comprimento: comprimento,
        largura: largura,
        comprimentoTotal: null,
        areaTotal: null
    }

    await painelResults.then((response) => {
        data.qtsPlaca = response.qtsPlaca
        data.inversores = response.inversores
        data.comprimentoTotal = response.comprimentoTotal
        data.areaTotal = response.areaTotal
    })

    try {
        await painelByUser.add(data)

        res.status(201).json({ message: 'Cadastrado com sucesso' })
    } catch (error) {
        res.status(500).json({ message: error })
    }

    
})

// read
app.get('/all-occurrences', async(req, res) => {
    const querySnapshot = await painelByUser.get()
    const occurrences = querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))

    if(occurrences.length != 0){
        res.status(201).json({ Ocorrências: occurrences })
    } else {
        res.status(404).json({ message: "Nenhum dado encontrado!" })
    }

})

// read one
app.get('/:id', async(req, res) => {
    const id = req.params.id
    
    const querySnapshot = await painelByUser.get()
    const occurrences = querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))

    const occurrence = occurrences.filter((doc) => {
        return doc.id == id
    })

    if(occurrence.length == 0) {
        res.status(404).json({ message: "Nenhum dado encontrado!" })
        return
    }

    res.status(200).json({
        Ocorrências: occurrence,
    })
    
})

// update
app.put('/:id', async(req, res) => {
    const id = req.params.id
    const { potenciaTotalKW, potenciaPlaca, comprimento, largura } = req.body

    const querySnapshot = await painelByUser.get()
    const occurrences = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    const occurrence = occurrences.filter((doc) => {
        return doc.id == id
    })

    if(occurrence.length == 0) {
        res.status(404).json({ message: "Dado não encontrado!" })
        return
    }

    const updateData = {
        name: occurrence[0].name,
        email: occurrence[0].email,
        phone: occurrence[0].phone,
        
        potenciaTotalKW,
        potenciaPlaca,
        comprimento,
        largura,
        
    }

    // Verifico se foi enviado algum valor, se sim, guardo ele na variavel, caso não, deixo o valor que já estava guardado
    if(!potenciaTotalKW) {
        updateData.potenciaTotalKW = occurrence[0].potenciaTotalKW
    } else {
        updateData.potenciaTotalKW = potenciaTotalKW
    }

    if(!potenciaPlaca) {
        updateData.potenciaPlaca = occurrence[0].potenciaPlaca
    } else {
        updateData.potenciaPlaca = potenciaPlaca
    }
    
    if(!comprimento) {
        updateData.comprimento = occurrence[0].comprimento
    } else {
        updateData.comprimento = comprimento
    }

    if(!largura) {
        updateData.largura = occurrence[0].largura
    } else {
        updateData.largura = largura
    }

    const painelResults = calculationPainel(updateData.potenciaTotalKW, updateData.potenciaPlaca, updateData.comprimento, updateData.largura)

    

    await painelResults.then((response) => {
        updateData.qtsPlaca = response.qtsPlaca
        updateData.inversores = response.inversores
        updateData.comprimentoTotal = response.comprimentoTotal
        updateData.areaTotal = response.areaTotal
    })

    try {
        await painelByUser.doc(occurrence[0].id).update(updateData)

        res.status(200).json({ message: 'Cadastro Atualizado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// delete
app.delete('/:id', async(req, res) => {
    const id = req.params.id

    const querySnapshot = await painelByUser.get()
    const occurrences = querySnapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
    }))

    const occurrence = occurrences.filter((doc) => {
        return doc.id == id
    })

    if(occurrence.length == 0) {
        res.status(404).json({ message: "Nenhum dado encontrado!" })
        return
    }

    try {
        await painelByUser.doc(occurrence[0].id).delete()

        res.status(200).json({ message: 'Cadastro deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// calculationPainel(4.5, 550, 1.95, 1.1)

// valuesDynamic()

app.listen(3333);