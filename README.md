# PROCUREMENT MANAGEMENT

---

## Stack

- `node.js`
- `express.js`
- `rest-api`
- `mongodb`
- `mongoose`
- `typescript`

---

## Setup

`make 2 env files: .env, .env.prod`

```
npm i
```

```
docker compose -f ./compose.db.yaml --env-file ./.env up --build -d
```

```
npm run start:dev
```

---

## RUN - Prod

```
docker compose -f ./compose.prod.yaml --env-file ./.env.prod up --build -d
```

---
