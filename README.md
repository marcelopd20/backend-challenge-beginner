# **API WEB - Desafio técnico - Backend**
**Marcelo Pastana Duarte**  
marcelopd20@gmail.com  
27/12/2022

---

Foi desenvolvido com **NodeJs**, **TypeScript**, **MongoDB** e **Docker**.

---
## **INICIALIZAÇÃO DA APLICAÇÃO:**
Fazer clone do repositório:
```
git clone https://github.com/marcelopd20/backend-challenge-beginner.git
```
- Adicionar **.env** e configurá-lo conforme exemplo do repositório, passando chave da API **[Yahoo! Finance](http://yahoofinanceapi.com)**
- Porta **3000** utilizada pela aplicação e **27017** porta do banco de dados.
- Necessário ter docker instalado, para docker compose:
```
docker-compose up
```
---
## **REQUISIÇÕES NA APLICAÇÃO:**
Requisições na API, porta **3000**: 

**http://localhost:3000/assets-watch-api/v1/assets/**

### 1. Usuário adiciona um ativo em sua lista de acompanhamento.
#### **POST**
```
/
```
Enviar json pelo body contendo, userId e symbol:
```
{
  "userId": "string"
  "symbol": "string"
}
```
### 2. Usuário consulta sua lista de acompanhamento.
#### **GET**
```
/?userId=:userId
```
Substituir `:userId` por id de usuário cadastrado para resgatar ativos da lista.


### 3. Usuário consulta a cotação de um ativo.
#### **GET**
```
/:ativo
```    

Substituir `:ativo` por , ativo a ser col (**itub3.sa**, **petr3.sa**,  **AAPL**, **BTC-USD**, **EURUSD=X** )

### Retorna Json contendo:
```
currency: Moeda
market: Mercado
regularMarketPrice: Preço no mercado regular
shortName: Nome/Identificação
symbol: Código do ativo
typeDisp: Tipo de ativo
```