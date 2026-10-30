# FinPay — Payment Operations

Dashboard Angular da POC FinPay. O frontend consulta os contratos existentes do backend NestJS por meio de `/api`, com proxy local para `http://localhost:3000`.

## Pré-requisitos

- Node.js e npm
- Backend disponível na pasta irmã `../finpay-backend`

## Executar localmente

Em um terminal, inicie o backend:

```bash
cd ../finpay-backend
npm install
npm run start:dev
```

Em outro terminal, inicie o frontend:

```bash
cd ../finpay-frontweb
npm install
npm start
```

Acesse `http://localhost:4200`. O servidor de desenvolvimento encaminha automaticamente as chamadas `/api/*` para o backend em `http://localhost:3000`.

## Validação

```bash
npm test
npm run build
```

O build de produção é gerado em `dist/finpay-frontweb/browser`.

## Versão

A versão do frontend fica declarada em `src/app/app.version.ts` e começa em `1.0.0`. Atualize esse valor nas próximas releases.

## Endpoints consumidos

- `GET /api/health`
- `GET /api/version`
- `GET /api/transactions`
- `GET /api/metrics`

## CI e imagem no GHCR

O workflow `.github/workflows/ci.yml` executa `npm ci`, testes e build em pushes para `main`, pull requests para `main` e tags no formato `vX.Y.Z`. A imagem Docker só é publicada quando uma tag de release válida (`v` seguida por três números inteiros separados por pontos) passa pelo CI.

No GitHub, mantenha **Settings > Actions > General > Workflow permissions** com permissão de leitura; o job de publicação solicita somente `contents: read` e `packages: write`. Para repositórios de organização, confirme também que a política da organização permite publicar pacotes com `GITHUB_TOKEN`. Não é necessário criar PAT.

Para criar uma release após integrar e validar a `main`:

```bash
git checkout main
git pull --ff-only
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

O pacote ficará em **GitHub > perfil ou organização > Packages**, com o nome do repositório em minúsculas e as tags `1.0.0` e `sha-<commit-curto>`. O digest `sha256:...` aparece no resumo do job **Publish release image**, nos detalhes da versão no GHCR e em `docker buildx imagetools inspect ghcr.io/<owner>/<repository>:1.0.0`.
