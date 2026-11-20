# RequestSystem agent instructions

## Repository layout

- Frontend: `front/frontend`; it is a React 19, TypeScript, Vite, Tailwind CSS 4 application.
- Backend: `back/request-system`; it is a Kotlin 2/Ktor service using Exposed R2DBC and H2.
- Keep frontend and backend changes aligned when a task changes `/api/requests` behavior or its JSON shape.
- Preserve the Portuguese product UI: labels, validation, status text, and user-facing messages should remain in Portuguese unless the task explicitly requires otherwise.

## Frontend conventions

- Work from `front/frontend` for npm commands.
- Use `src/pages/` for route-level pages, `src/components/` for reusable UI, `src/api/` for HTTP access, and `src/types/` for shared domain types.
- Use existing exports and patterns: task types come from `src/types/index.ts`, and Axios calls go through `src/api/client.ts` and `src/api/tasks.ts`.
- Keep API payload and enum names compatible with the backend:
  - `Status`: `ABERTA`, `EM_ANDAMENTO`, `CONCLUIDA`
  - `Priority`: `BAIXA`, `MEDIA`, `ALTA`
- Use React function components and hooks. Keep loading, error, and empty states in page components consistent with `src/pages/Homepage.tsx`.
- Use Tailwind utility classes for styling. Add no separate CSS when an existing Tailwind utility or existing global stylesheet is sufficient.
- Prefer controlled form fields and explicit `Status`/`Priority` unions for form values. Update shared types instead of duplicating domain literals.
- Use the existing `Task` model field names, including `desc` rather than `description`.
- Add or update tests for behavior changes when a test setup is available. Do not remove or replace failing tests merely to make a run pass.

## Frontend validation

- Install dependencies with `npm ci` only when `node_modules` is missing or package-lock dependencies have changed.
- Run `npm run lint` and `npm run build` from `front/frontend`.
- If the build reports pre-existing unused imports or variables, fix only those directly caused or exposed by the change; do not silently broaden the task.
- During UI work, validate the relevant route with the Vite dev server and note any backend dependency required at `http://localhost:8080`.

## Backend conventions

- Work from `back/request-system` for Gradle commands.
- Keep route, service, repository, model, and database concerns separate:
  - `src/main/kotlin/app/routes/` for Ktor endpoints
  - `src/main/kotlin/app/services/` for task workflow and validation
  - `src/main/kotlin/app/repository/` for persistence
  - `src/main/kotlin/app/models/` for serialized domain types
- Preserve `/api/requests` REST behavior and HTTP status handling. Use `TaskModel`, `Status`, and `Priority` as the source of truth for the request JSON contract.
- Keep status transitions sequential: `ABERTA` -> `EM_ANDAMENTO` -> `CONCLUIDA`.
- Add focused Ktor tests in `src/test/kotlin` for changed endpoints or service behavior.

## Backend validation

- On Windows, use `gradlew.bat test` and `gradlew.bat build` from `back/request-system`.
- Start the API with `gradlew.bat run`; it normally listens on port `8080`.
- Do not modify generated build output, Gradle caches, IDE metadata, or H2 database files as source changes.

## Change discipline

- Inspect existing patterns before adding a helper, component, endpoint, or dependency.
- Make focused changes and preserve unrelated work in the dirty tree.
- Update relevant API type declarations and route consumers together.
- Run the smallest applicable validation first, then the full build/lint/test commands when time permits.
- Report baseline failures separately from regressions introduced by the change.
