import axios from 'axios';

export async function getStaticPaths() {
    return {
        paths: [{
            params: {
                id: '27865757000102'
            }
        }],
        fallback:false
    }
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    return {
        props: {
            id: id
        }
    }
}

async function Cnpj(props, response) {
    const apiSecret = process.env.RECEITAWS;
    var url = 'https://www.receitaws.com.br/v1/cnpj/'+`${props.id}`;
    let nome = '';
    let cnpj = '';
    const receitaResponse = await axios.get(url, {
        headers: {
            'Authorization':`${apiSecret}`
        }
    }).then(({ data })=> {
        nome = data.nome;
        cnpj = data.cnpj;
        })
        .catch((err)=> {})

    response.json({
        nome: nome,
        cnpj: cnpj,
        url: url

    })
    
}

export default Cnpj;



 