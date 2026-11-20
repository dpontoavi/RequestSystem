# Backend - Central de Solicitações

API REST da Central de Solicitações, implementada com Kotlin, Ktor, Exposed R2DBC e banco H2.

## Tecnologias

- Kotlin 2
- Java/JDK 21
- Ktor Netty
- kotlinx.serialization
- Ktor Content Negotiation e Status Pages
- Exposed R2DBC
- H2
- Gradle

## Pré-requisitos

- JDK 21
- Gradle Wrapper incluído no projeto

## Executando a API

Na pasta `back/request-system`:

```powershell
.\gradlew.bat run
```

A API ficará disponível em `http://localhost:8080`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `.\gradlew.bat test` | Executa os testes |
| `.\gradlew.bat build` | Compila a aplicação e gera o artefato |
| `.\gradlew.bat run` | Inicia o servidor |

## Persistência

A conexão usa R2DBC com H2 em arquivo:

```text
r2dbc:h2:file:///./h2
```

O banco é criado na raiz de `back/request-system` e os dados permanecem disponíveis após reiniciar a aplicação.

## Contrato de dados

```json
{
  "id": 1,
  "title": "Instalar software",
  "desc": "Solicitação de instalação",
  "category": "TI",
  "priority": "ALTA",
  "status": "ABERTA"
}
```

Valores válidos:

- `status`: `ABERTA`, `EM_ANDAMENTO`, `CONCLUIDA`
- `priority`: `BAIXA`, `MEDIA`, `ALTA`

## Endpoints

| Método | Rota | Resposta principal |
|---|---|---|
| `GET` | `/api/requests` | Lista todas as solicitações |
| `GET` | `/api/requests/{id}` | Consulta uma solicitação |
| `GET` | `/api/requests?status=ABERTA&priority=ALTA&title=texto&category=TI` | Lista com filtros |
| `POST` | `/api/requests` | Cria uma solicitação em `ABERTA` |
| `PUT` | `/api/requests/{id}` | Atualiza os dados da solicitação |
| `PATCH` | `/api/requests/{id}` | Avança para o próximo status |
| `DELETE` | `/api/requests/{id}` | Remove uma solicitação |

## Regras de negócio

- Título, descrição e categoria são obrigatórios.
- Campos de texto vazios ou contendo apenas espaços são rejeitados.
- Novas solicitações começam com status `ABERTA`.
- As transições são sequenciais:
  - `ABERTA` -> `EM_ANDAMENTO`
  - `EM_ANDAMENTO` -> `CONCLUIDA`
- Uma solicitação já concluída não pode avançar novamente.
- IDs inválidos e solicitações inexistentes recebem respostas de erro.

## Estrutura principal

```text
src/main/kotlin/app/
  database/       configuração e tabelas Exposed
  models/         modelos, enums e exceções
  repository/     acesso e persistência de dados
  routes/         endpoints REST
  services/       regras de negócio
  plugins/        configuração HTTP, serialização e erros
```
