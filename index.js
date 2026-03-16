// Primeiro precisamos criar o app usando express

const express = require ("express")
const app = express()

//Permite aceitar JSON na requisição
app.use(express.json())

let id = 2

//Lista de filmes 
const filmes = [
    {
        id: 1,
        title: "Oppenheimer",
        genre: "Drama",
        description:"O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.",
        releaseYear: 2023 ,
        image:"https://ingresso-a.akamaihd.net/prd/img/movie/oppenheimer/fed7c21c-3ff4-49f3-95c6-5ce58c1e1432.webp"

    }
]

const series = [
    {
        id: 1,
        title: "One Piece",
        genre: "Aventura",
        description: "O pirata Monkey D. Luffy e sua tripulação exploram um mundo fantástico de oceanos infinitos e ilhas exóticas em busca do maior tesouro do mundo.Luffy tem apenas um objetivo: se tornar o próximo Rei dos Piratas.",
        releaseYear: 2023,
        image:"https://images.ctfassets.net/4cd45et68cgf/30ahhG9SI2h0qtMlIU8nXm/621568df5566b8f922239a8e94e2a0d2/EN-US_OPS1_Main_Illustrated_Vertical_27x40_RGB.jpg?w=1200"
    }
]


//get feito para retornar todos os filmes cadastrados
app.get("/filmes", (req,res) => {
    const genre = req.query.genre
    
    if(!genre){  
        return res.json(filmes)
    }
    
    const filmesFiltrados = filmes.filter(a => a.genre.toLowerCase().includes(genre.toLowerCase()))
    res.json(filmesFiltrados)
})


app.get("/series", (req, res) =>{
    const genre = req.query.genre
    
    if(!genre){  
        return res.json(series)
    }
    
    const seriesFiltrados = series.filter(a => a.genre.toLowerCase().includes(genre.toLowerCase()))
    res.json(seriesFiltrados)
})

app.post("/filmes", (req, res) => {
    const nomeDoFilme = req.body.title
    const genero = req.body.genre
    const descicao = req.body.description
    const anodelancamento = req.body.releaseYear

    if( !nomeDoFilme || nomeDoFilme.length <=  1 || !genero || !descicao || !anodelancamento){
        return res.status(400).json({error:"Nome do filme, gênero, descrição e ano de lançamento são obrigatórios!"})
    }

    const novoFilme = {
        id: id, 
        title: nomeDoFilme,
        genre: genero,
        description: descicao,
        releaseYear: anodelancamento,
    }

    filmes.push(novoFilme)
    res.status(201).send()

})

app.post("/series", (req, res) => {
    const nomeDaserie = req.body.title
    const genero = req.body.genre
    const descicao = req.body.description
    const anodelancamento = req.body.releaseYear

    if(!nomeDaserie || nomeDaserie.length <= 1|| !genero || !descicao || !anodelancamento){
        return res.status(400).json({error:"Nome do filme, gênero, descrição e ano de lançamento são obrigatórios!"})
    }

    const novaSerie = {
        id: id, 
        title: nomeDaserie,
        genre: genero,
        description: descicao,
        releaseYear: anodelancamento,
    }

    series.push(novaSerie)
    res.status(201).send()
})

app.get("/filmes/:id", (req,res) => {

    const id = parseInt(req.params.id)

    const filme = filmes.find(a => a.id == id)

    if(filme){
        return res.json(filme)
    }else{
        res.status(404).json("Filme não encontrado!")
    }
})

app.get("/series/:id", (req,res) => {

    const id = parseInt(req.params.id)

    const serie = series.find(a => a.id == id)

    if(serie){
        return res.json(serie)
    }else{
        res.status(404).json("Filme não encontrado!")
    }
})


//Segundo colocar o servidor para rodar
app.listen(3000, () => {
    console.log("Servidor rodadndo em http://localhost:3000")
})


