const express = require("express");

const server = express()
const dados = require("./data/dados.json")
const fs = require("fs")


// funcao para utilizar servidor
server.use(express.json())


//msg no terminal para indicar funcioanmento
server.listen(3000,() =>{
    console.log("WORKS")
})

//consumir dados da api  === read crud
server.get('/medicamento' , (req,res) => {
    return res.json(dados.medicamento)
})

server.get('/cliente',(req,res) => {
    return res.json(dados.cliente)
})

server.get('/fornecedor',(req,res) => {
    return res.json(dados.fornecedor)
})

server.get('/venda',(req,res) => {
    return res.json(dados.venda)
})

//salvar inserir dados no json === create do crud
server.post('/medicamento', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.idMedicamento || !novoUsuario.nome || !novoUsuario.fabricante || !novoUsuario.preco || !novoUsuario.quantidade ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.medicamento.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

//salvar inserir dados no json === create do crud
server.post('/cliente', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.idCliente || !novoUsuario.nome || !novoUsuario.endereco || !novoUsuario.email|| !novoUsuario.telefone ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.cliente.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

server.post('/fornecedor', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.idFornecedor || !novoUsuario.nome || !novoUsuario.endereco || !novoUsuario.telefone ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.fornecedor.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

server.post('/venda', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.idVenda || !novoUsuario.data || !novoUsuario.idMedicamento || !novoUsuario.idCliente ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.venda.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

//atualizar usuario
server.put('/medicamento/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    const idUsuario = dados.medicamento.findIndex(u => u.idMedicamento === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.medicamento[idUsuario].nome = atualizarUsuario.nome || dados.medicamento[idUsuario].nome
        dados.medicamento[idUsuario].fabricante = atualizarUsuario.fabricante || dados.medicamento[idUsuario].fabricante
        dados.medicamento[idUsuario].preco = atualizarUsuario.preco || dados.medicamento[idUsuario].preco
        dados.medicamento[idUsuario].quantidade = atualizarUsuario.quantidade || dados.medicamento[idUsuario].quantidade

        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})

server.put('/cliente/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    const idUsuario = dados.cliente.findIndex(u => u.idCliente === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.cliente[idUsuario].nome = atualizarUsuario.nome || dados.cliente[idUsuario].nome
        dados.cliente[idUsuario].fabricante = atualizarUsuario.fabricante || dados.cliente[idUsuario].fabricante
        dados.cliente[idUsuario].endereco = atualizarUsuario.endereco || dados.cliente[idUsuario].endereco
        dados.cliente[idUsuario].email = atualizarUsuario.email || dados.cliente[idUsuario].email

        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})

server.put('/fornecedor/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    const idUsuario = dados.fornecedor.findIndex(u => u.idFornecedor === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.fornecedor[idUsuario].nome = atualizarUsuario.nome || dados.fornecedor[idUsuario].nome
        dados.fornecedor[idUsuario].endereco = atualizarUsuario.endereco || dados.fornecedor[idUsuario].fabricante
        dados.fornecedor[idUsuario].telefone = atualizarUsuario.telefone || dados.fornecedor[idUsuario].endereco
    

        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})

server.put('/venda/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    const idUsuario = dados.venda.findIndex(u => u.idVenda === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.venda[idUsuario].nome = atualizarUsuario.nome || dados.venda[idUsuario].nome
        dados.venda[idUsuario].endereco = atualizarUsuario.endereco || dados.venda[idUsuario].fabricante
        dados.venda[idUsuario].telefone = atualizarUsuario.telefone || dados.venda[idUsuario].endereco
    

        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})


server.delete("/medicamento/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.medicamento = dados.medicamento.filter(u => u.idMedicamento !== usuarioId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})

})

server.delete("/venda/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.venda = dados.venda.filter(u => u.idVenda !== usuarioId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})

})

server.delete("/fornecedor/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.fornecedor = dados.fornecedor.filter(u => u.idFornecedor !== usuarioId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})

})

server.delete("/cliente/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.cliente = dados.cliente.filter(u => u.idCliente !== usuarioId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})
    
})

//salvar dados
function salvarDados(){
fs.writeFileSync(__dirname + "/data/dados.json",JSON.stringify(dados,null,2))
}



//post create
//get read
//put update
//delete