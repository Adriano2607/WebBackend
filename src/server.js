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
server.get('/usuarios' , (req,res) => {
    return res.json(dados.users)
})

server.get('/curso',(req,res) => {
    return res.json(dados.cursos)
})


//salvar inserir dados no json === create do crud
server.post('/usuarios', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.id || !novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})

//salvar inserir dados no json === create do crud
server.post('/curso', (req,res) => {
    const novoUsuario = req.body

    if(!novoUsuario.idCurso || !novoUsuario.nome_curso || !novoUsuario.ch_curso || !novoUsuario.professor ){
        return res.status(400).json({mensagem:"Dados incompletos"})
    }else{
        dados.cursos.push(novoUsuario)
        salvarCurso(dados)
        return res.status(201).json({mensagem: "Sucesso"})
    }
})



//atualizar usuario
server.put('/usuarios/:id',(req,res) =>{
    //buscar e convertero id do endpoint em int
    const usuarioId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarUsuario = req.body

    //encontrar o id no json que ja existe
    const idUsuario = dados.users.findIndex(u => u.id === usuarioId)

    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Nao encontrado"})
    
    }else{
        //atualizar
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso

        salvarDados(dados)

        return res.json({mensagem:"Atualizado"})

    }
})


server.put('/curso/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)
    const atualizarCurso = req.body

    const idCurso = dados.cursos.findIndex(u => u.idCurso === usuarioId)

    if (idCurso === -1) {
        return res.status(404).json({ mensagem: "Curso não encontrado" })
    } else {
       
        dados.cursos[idCurso].nome_curso = atualizarCurso.nome_curso || dados.cursos[idCurso].nome_curso
        dados.cursos[idCurso].ch_curso = atualizarCurso.ch_curso || dados.cursos[idCurso].ch_curso
        dados.cursos[idCurso].professor = atualizarCurso.professor || dados.cursos[idCurso].professor
        
        salvarCurso(dados)

        return res.json({ mensagem: "Curso atualizado com sucesso" })
    }
})




//delete
server.delete("/usuarios/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.users = dados.users.filter(u => u.id !== usuarioId)
    salvarDados(dados)
    return res.status(200).json({mensagem:"Excluido"})

})

//delete
server.delete("/curso/:id",(req,res) => {

    const usuarioId = parseInt(req.params.id)
    dados.cursos = dados.cursos.filter(u => u.id !== usuarioId)
    salvarCurso(dados)
    return res.status(200).json({mensagem:"Excluido"})

})


//salvar dados
function salvarDados(){
fs.writeFileSync(__dirname + "/data/dados.json",JSON.stringify(dados.users,null,2))
}

function salvarCurso(){
    fs.writeFileSync(__dirname + "/data/dados.json",JSON.stringify(dados.cursos,null,2))
    }


//post create
//get read
//put update
//delete