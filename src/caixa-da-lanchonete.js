let cardapio = [
    {
        codigo: 'cafe',
        descrição: 'Café',	
        valor: '3.00'
    },
    {
        codigo: 'chantily',
        descrição: 'Chantily',	
        valor: '1.50'
    },
    {
        codigo: 'suco',
        descrição: 'Suco Natural',	
        valor: '6.20'
    },
    {
        codigo: 'sanduiche',
        descrição: 'Sanduiche',	
        valor: '6.50'
    },
    {
        codigo: 'queijo',
        descrição: 'Queijo',	
        valor: '2.00'
    },
    {
        codigo: 'salgado',
        descrição: 'Salgado',	
        valor: '7.25'
    },
    {
        codigo: 'combo1',
        descrição: '1 Suco e 1 Sanduíche',	
        valor: '9.50'
    },
    {
        codigo: 'combo2',
        descrição: '1 Café e 1 Sanduíche',	
        valor: '7.50'
    },
];

class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length === 0)
            return 'Não há itens no carrinho de compra!';

        const listaItens = itens.map(item => {
            const [ mercadoria, quantidade ] = item.split(',');    
            return { mercadoria, quantidade: Number(quantidade) };
        });

        for(const item of listaItens){
            if(item.quantidade === 0)
                return 'Quantidade inválida!';
        }

        if(this.contemItem(listaItens, cardapio) === false)
            return 'Item inválido!';

        if(Boolean(metodoDePagamento))
            return this.compra(listaItens, cardapio, metodoDePagamento);
    }

    compra(listaItens, cardapio, metodoDePagamento){
        const resultado = [];
  
        for(const item of listaItens)
            cardapio.find(el => {
                if(el.codigo === item.mercadoria)
                    resultado.push({
                        ...el,
                        quantidade: item.quantidade
                    });
            });

        if(listaItens.some(el => el.mercadoria === 'queijo'))
            if(!Boolean(listaItens.find(el => el.mercadoria == 'sanduiche')))
                return 'Item extra não pode ser pedido sem o principal';
        
        if(listaItens.some(el => el.mercadoria === 'chantily'))
            if(!Boolean(listaItens.find(el => el.mercadoria == 'cafe')))
                return 'Item extra não pode ser pedido sem o principal';

        const valor = resultado.reduce((acc, cur)=> acc + Number(cur.valor) * Number(cur.quantidade), 0); 

        return this.verificaMetodo(valor, metodoDePagamento);
    }

    verificaMetodo(valor, metodoDePagamento){
        switch(metodoDePagamento){
            case 'dinheiro':
                return this.formatarValor(valor * .95);
            case 'credito':
                return this.formatarValor(valor * 1.03);
            case 'debito':
                return this.formatarValor(valor);
            default:
                return 'Forma de pagamento inválida!';
        }
    }

    formatarValor(valor){
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    contemItem(listaItens, cardapio){
        for(const item of listaItens){
            let contem = false;
            
            for(const opcao of cardapio)
                if(item.mercadoria === opcao.codigo)
                    contem = true;
        
            if(contem === false)
                return false;
        }
        return true;
    }

    quantidadeInvalida(){
        for(const item of listaItens)
            if(item.quantidade === 0)
                return 'Quantidade inválida!';
    }
}

export { CaixaDaLanchonete };

console.log(new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', ['queijo, 1', 'sanduiche, 1', 'chantily, 1', 'cafe, 2']))