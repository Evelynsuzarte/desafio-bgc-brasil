const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { PutItemCommand, ScanCommand, DeleteItemCommand  } = require("@aws-sdk/client-dynamodb");
const fs = require('fs');
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
const dynamoDbClient = DynamoDBDocument.from(new DynamoDB());


app.use(express.json());

// endpoint para visualizar todos os produtos
async function produtos(req, res) {
    const params = {
      TableName: PRODUCTS_TABLE,
    };

    try {
      const data = await dynamoDbClient.scan(params);
      if (data) {
        return data.Items;
      }
    }catch (error) {
        console.log(error);
        return {error:"Não foi possível buscar o produto"};
    }
};

app.get("/produtos", produtos);
module.exports.produtos = produtos;
  

// endpoint para visualizar por categoria
async function produtosCategoria(req, res){
    const category_search = {":category": req.pathParameters.category}
    const params = {
        TableName: PRODUCTS_TABLE,
        FilterExpression: "category = :category",
        ExpressionAttributeValues: category_search,
      };

    try {
      const data = await dynamoDbClient.scan(params);
      if (data) {
        return data.Items;
      }
      else{
        return {error:"Categoria não encontrada"};
      }
    }catch (error) {
        console.log(error);
        return {error:"Não foi possível buscar a categoria"};
    }
    
};

app.get("/produtos/categoria/:category", produtosCategoria);
module.exports.produtosCategoria = produtosCategoria;


// endpoint para visualizar por id
async function produtosId (req, res){
  const id = {":productId": req.pathParameters.productId}
  const params = {
      TableName: PRODUCTS_TABLE,
      FilterExpression: "productId = :productId",
      ExpressionAttributeValues: id,
    };
    
    try {
      const data = await dynamoDbClient.scan(params);
      if (data.Items[0].productId == req.pathParameters.productId) {
        return data.Items;
      }
      else{
        return {error:"Produto não encontrado"};
      }
    }catch (error) {
        console.log(error);
        return {error:"Não foi possível buscar o produto"};
    }
  };

app.get("/produtos/id/:id", produtosId);
module.exports.produtosId = produtosId;


// endpoint para adicionar produto
async function produtos_add(req, res){
  const { productId, name, valor, category } = JSON.parse(req.body);
  
  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      productId: { S: productId }, 
      name: { S: name }, 
      valor: { S: valor },
      category: { S: category }
  }
  };

  try {
    await dynamoDbClient.send(new PutItemCommand(params));
    return params.Item;
  } catch (error) {
    console.log(error);
    return res.json({ message: "Item adicionado com sucesso à tabela do DynamoDB." });
  }
};
app.post("/produtos_add", produtos_add);
module.exports.produtos_add = produtos_add;


// endpoint para adicionar produto com o json do webscrapper feito
async function produtos_add_pupper(req, res){
  filePath = "data.json";
  const DATA = await read_data(filePath);
 
  try {
      for (let i = 0; i < DATA.length; i++) {
          const params = {
              TableName: PRODUCTS_TABLE,
              Item: {
                  productId: { S: DATA[i].id_ },
                  name: { S: DATA[i].name_ },
                  valor: { S: DATA[i].price_ },
                  category: { S: DATA[i].category_ }
              }
          };
          await dynamoDbClient.send(new PutItemCommand(params));
      }

      console.log([DATA]);
      return ({ message: "Itens adicionados com sucesso à tabela" });
      
  } catch (error) {
      console.log(error);
      return ({ error: "Não foi possível adicionar os produtos à tabela." });
  }

};

app.post("/adicionar-pupper", produtos_add_pupper);
module.exports.produtos_add_pupper = produtos_add_pupper;


// função para ler dados de arquivo
async function read_data(filePath) {
    try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(jsonData);

      console.log('Dados lidos do arquivo JSON:', data);
      return data;
    } 
    catch (error) {
      console.error('Erro ao ler arquivo JSON:', error);
      return null;
    }
  }

module.exports.read_data = read_data;


// erro para qualquer endpoint não definido
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Endpoint não encontrado",
  });
});


module.exports.handler = serverless(app);
