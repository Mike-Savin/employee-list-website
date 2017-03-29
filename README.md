# Employee list website

Use `gulp` command to run the application.

You can create some employees automatically by editing `server/fixtures/component-config.json` file (and possibly getting some errors from MongoDB):
```json
{
  ...
  "loopback-fixtures": {
    ...
    "autoLoad": true
  }
}
```