# Solução

A arquitetura desta solução, consiste em três aplicações (Base A, Base B e Base C), consultando diretamente seus bancos de dados. As três aplicações são baseadas do Repository Pattern, porém o acesso a banco é simulado pelo conteúdo de um arquivo JSON.

As aplicações foram desenvolvidas em NodeJS com ExpressJS, disponibilizando seus dados através de API REST e Payload em formato JSON e a autenticação é através de JWT.

A aplicação principal também é feita em NodeJS e ExpressJS, porém seus dados são disponibilizados através do GraphQL, consultado as 3 aplicações anteriores, ou consultando uma base Redis utilizada como cache. Dessa forma, uma aplicação Front-End poderia obter todas as informações que precisar, por exemplo.

Todas as aplicações rodam em containers Docker, sendo assim, posteriormente podem ser publicadas na nuvem.

Configurações de portas e variáveis de ambiente, encontram-se no arquivo docker-compose.yml.

#Execução da Solução

Para execução com Docker, bastar subir o ambiente via Compose.

```bash
docker-compose build
```

```bash
docker-compose up
```

Com o amiente rodando, as consultas podem ser feitas individualmente, ou através da aplicação pricipal.

##Exemplo Base A
###Login

```json
Url = http://localhost:3000/login
Method = POST
Header ={
  "Content-Type": "application/json"
}
Body ={
  "login": "admin",
  "senha": "segredo"
}
```

###Consulta

```json
Url = http://localhost:3000/situacaofinanceira
Method = GET
Header ={
  "cpf": "81922027049",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNTU3NzA5NzkxLCJleHAiOjE1NTc3MTAwOTF9.2l2h5reY0moZJfySCESNH1F2LNLyfTPrK9MgOdT1eYs"
}
Body ={}
```

##Exemplo Base B
###Login

```json
Url = http://localhost:3001/login
Method = POST
Header ={
  "Content-Type": "application/json"
}
Body ={
  "login": "admin",
  "senha": "segredo"
}
```

###Consulta

```json
Url = http://localhost:3001/bensrenda
Method = GET
Header ={
  "cpf": "81922027049",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNTU3NzA5NzkxLCJleHAiOjE1NTc3MTAwOTF9.2l2h5reY0moZJfySCESNH1F2LNLyfTPrK9MgOdT1eYs"
}
Body ={}
```

##Exemplo Base C

```json
Url = http://localhost:3002/login
Method = POST
Header ={
  "Content-Type": "application/json"
}
Body ={
  "login": "admin",
  "senha": "segredo"
}
```

###Consulta

```json
Url = http://localhost:3002/rastreamento
Method = GET
Header ={
  "cpf": "81922027049",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNTU3NzA5NzkxLCJleHAiOjE1NTc3MTAwOTF9.2l2h5reY0moZJfySCESNH1F2LNLyfTPrK9MgOdT1eYs"
}
Body ={}
```

##Exemplo Aplicação principal
###Consulta

```json
Url = http://localhost:3003/graphql?
Method = GET
Params = {
  consultar_cpf(login: "admin", senha: "segredo", cpf: "81922027049") {
    situacao {
      cpf
      nome
      endereco {
        logradouro
        numero
        bairro
        cidade
        uf
        cep
      }
      lista_divida {
        credor_cnpj
        credor_nome
        valor
      }
    }
    bens_renda {
      idade
      lista_bens {
        descricao
        valor
      }
      endereco {
        logradouro
        numero
        bairro
        cidade
        uf
        cep
      }
      renda {
        empresa_nome
        empresa_cnpj
        salario
      }
    }
    rastreamento {
      ultima_consulta {
        data
        empresa_nome
        empresa_cnpj
      }
      movimentacao {
        tipo
        valor
        empresa_nome
      }
      ultima_compra_credito {
        data
        valor
      }
    }
  }
}
Header ={}
Body ={}
```
