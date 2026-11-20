# Central de Solicitações

Projeto full stack desenvolvido para o desafio do processo seletivo 2026.2 da LOADING Desenvolvimento JR.

A aplicação permite cadastrar solicitações internas, consultar seus dados e acompanhar o fluxo de atendimento:

**ABERTA -> EM_ANDAMENTO -> CONCLUIDA**

## Estrutura do repositório

- `front/frontend`: interface web em React, TypeScript e Vite.
- `back/request-system`: API REST em Kotlin e Ktor.
- `h2.mv.db`: banco de dados H2 local usado pelo backend.

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios

### Backend

- Kotlin 2
- Java/JDK 21
- Ktor
- Exposed R2DBC
- H2 com persistência em arquivo
- Gradle

## Funcionalidades

### Obrigatórias

- Cadastro de solicitações com título, descrição, categoria e prioridade.
- Prioridades `BAIXA`, `MEDIA` e `ALTA`.
- Status inicial `ABERTA`.
- Listagem e consulta das solicitações.
- Filtros por status e prioridade.
- Busca por título e categoria.
- Persistência local em banco de dados H2.
- Validação de campos obrigatórios.
- Avanço de status somente para a etapa seguinte.
- Retorno de erros compreensível pela API.
- Integração do frontend com a API.

### Opcionais implementadas

- Edição de solicitações.
- Exclusão de solicitações.
- Busca textual por título.
- Filtro por categoria.

## Como executar

Abra dois terminais na raiz do repositório.

### 1. API

```powershell
cd back/request-system
.\gradlew.bat run
```

A API ficará disponível em `http://localhost:8080`.

### 2. Frontend

```powershell
cd front/frontend
npm install
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

O frontend espera a API em `http://localhost:8080`. Para alterações reais, mantenha os dois processos em execução.

## Validação e demonstração

1. Confirme que a API está respondendo em `http://localhost:8080/api/requests`.
2. Abra o frontend e cadastre uma solicitação.
3. Confira se ela aparece na listagem.
4. Utilize os filtros de status e prioridade.
5. Avance o status de `ABERTA` para `EM_ANDAMENTO` e depois para `CONCLUIDA`.
6. Tente atualizar ou avançar dados de forma inválida e confirme que a API informa o problema.
7. Reinicie a API e confirme que os registros continuam disponíveis no H2.

### Testes

```powershell
cd back/request-system
.\gradlew.bat test
```

## API principal

| Método | Rota | Uso |
|---|---|---|
| `GET` | `/api/requests` | Lista ou filtra solicitações |
| `GET` | `/api/requests/{id}` | Consulta uma solicitação |
| `POST` | `/api/requests` | Cadastra uma solicitação |
| `PUT` | `/api/requests/{id}` | Atualiza os dados da solicitação |
| `PATCH` | `/api/requests/{id}` | Avança o status sequencialmente |
| `DELETE` | `/api/requests/{id}` | Exclui uma solicitação |

Filtros disponíveis em `GET /api/requests`: `status`, `priority`, `title` e `category`.

## Uso de IA

Ferramentas de inteligência artificial foram utilizadas como apoio a tarefas de implementação e documentação. A solução foi validada por meio da execução dos serviços e dos testes disponíveis.
