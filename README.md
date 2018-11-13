# Egg-server-mysql
Egg server API with mysql, redis, typescript.

## QuickStart

### Development

```bash
$ yarn install
$ yarn dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `yarn clean` before `yarn dev`.

### Deploy

```bash
$ yarn tsc
$ yarn start
```

### Npm Scripts

- Use `yarn lint` to check code style
- Use `yarn test` to run unit test
- se `yarn clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
