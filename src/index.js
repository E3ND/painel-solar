const expreess = require("express")

const app = expreess()

const calculationPainel = require("../helpers/calculation-painel")
const valuesDynamic = require("./values-dynamic")

calculationPainel(4.5, 550, 1.95, 1.1)

valuesDynamic()

app.listen(3333);