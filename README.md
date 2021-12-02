# empty-snowpack

```bash
$ npm install --save-dev snowpack
```

- Create app directory with static files
- Add snowpack.config.json file

```json
    "mount": {
        "app": "/"
    },
```

- Add start and build scripts

```json
  "scripts": {
    "start": "npx snowpack dev",
    "build": "npx snowpack build"
  },
```

Run app

```bash
$ npm run start
```