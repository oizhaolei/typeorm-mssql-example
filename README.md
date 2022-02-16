# Example how to use TypeORM with TypeScript

- clone repository
- run `npm i`
- edit `ormconfig.json` and change your database configuration (you can also change a database type, but don't forget to install specific database drivers)
- run `npx typeorm migration:generate --name init`
- run `npx typeorm migration:run`
- run `npm start`
- enjoy!

## How to use CLI?

- install `typeorm` globally: `npm i -g typeorm`
- run `typeorm -h` to show list of available commands
