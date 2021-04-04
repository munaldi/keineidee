import axios from 'axios';

async function tempo(request,  response) {  
    const apiSecret = process.env.RECEITAWS;
    const dynamicDate = new Date();
    let nome = '';
    let cnpj = '';

    const receitaResponse = await axios.get("https://www.receitaws.com.br/v1/cnpj/27865757000102", {
        headers: {
            'Authorization':`${apiSecret}`
        }
    }).then(({ data })=> {
        nome = data.nome;
        cnpj = data.cnpj;
        })
        .catch((err)=> {})

    //const receitaResponseJson = await receitaResponse;

    response.setHeader('Cache-Control','s-maxage=10 stale-while-revalidate')

    response.json({
        date: dynamicDate.toGMTString(),
        nome: nome,
        cnpj: cnpj
    })
}

export default tempo;