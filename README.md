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

## Run - Dev

`make env file: .env`

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

`make env file: .env.prod`

```
docker compose -f ./compose.prod.yaml --env-file ./.env.prod up --build -d
```

---
