# Frontend - Central de Solicitações

Interface web da Central de Solicitações, desenvolvida em React 19, TypeScript e Vite. O frontend permite cadastrar, listar, buscar, filtrar, editar, excluir e avançar solicitações consumindo a API em `http://localhost:8080/api/requests`.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios
- ESLint

## Pré-requisitos

- Node.js
- npm
- API backend em execução na porta `8080`

## Instalação e execução

Na pasta `front/frontend`:

```powershell
npm install
npm run dev
```

Acesse a URL exibida pelo Vite. Normalmente: `http://localhost:5173`.

Antes de iniciar o frontend, execute a API conforme descrito em `../../back/request-system/README.md`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa a compilação TypeScript e gera o build em `dist/` |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Serve localmente o build de produção |

## Funcionalidades da interface

- Página inicial com apresentação da solução.
- Listagem das solicitações.
- Cadastro com título, descrição, categoria e prioridade.
- Status inicial `ABERTA`.
- Filtros por título, categoria, status e prioridade.
- Consulta visual dos dados e do status atual.
- Avanço sequencial:
  - `ABERTA` -> `EM_ANDAMENTO`
  - `EM_ANDAMENTO` -> `CONCLUIDA`
- Edição dos dados da solicitação.
- Exclusão com confirmação.
- Estados de carregamento, erro e lista vazia.

## Rotas

| Rota | Página |
|---|---|
| `/` | Página inicial |
| `/api/requests` | Central de solicitações |

## Integração com a API

As chamadas HTTP estão centralizadas em `src/api/client.ts` e `src/api/tasks.ts`.

Exemplos de endpoints consumidos:

- `GET /api/requests`
- `POST /api/requests`
- `PUT /api/requests/{id}`
- `PATCH /api/requests/{id}`
- `DELETE /api/requests/{id}`

Os tipos de domínio ficam em `src/types/index.ts`:

- `Status`: `ABERTA`, `EM_ANDAMENTO`, `CONCLUIDA`
- `Priority`: `BAIXA`, `MEDIA`, `ALTA`

## Estrutura principal

```text
src/
  api/          chamadas HTTP
  components/   componentes reutilizáveis e modais
  constants/    constantes visuais e textos
  context/      contexto da interface
  pages/        páginas da aplicação
  types/        tipos compartilhados
```

## Validação

Para verificar o frontend:

```powershell
npm run lint
npm run build
npm run dev
```

Com backend e frontend em execução, cadastre uma solicitação e confirme a integração em `http://localhost:5173/api/requests`.
