# param2

Small module to read config parameters.

It exposes a single function that finds a config parameter:

``` js
// example.js
var param2 = require("param2")
var port = param2("port")
console.log(port)
```

Parameters are read from
* Command line arguments
* Environment variables
* Config file

In that order.

Install via npm:

    $ npm install gaggle/param2

## Introduction
The above example finds the parameter `port`.
It does so by first looking at the command line arguments:

    $ node example.js --port 8080

If not found it looks in the environment:

    $ port=8080 node example.js

Otherwise it looks for a configuration file
specified by `--config [filename]` or `NODE_ENV` env var,
and if neither are specified it will default to `development`.

It looks for a `.json` or `.js` file,
and starts in `.` and goes upwards until it reaches `/`.

``` json
// config/development.json
{
    "port": 8080
}
```

Running the example again with the above file saved as `config/development.json`

    $ node example.js // 8080

### Nested parameters
Nested parameters are supported:

``` js
// nested.js
var param2 = require("param2")
var port = param2("app.port")
console.log(port)
```

```
$ node nested.js --app.port 8080
```

```
$ app='{"port":8080}' node nested.js
```

``` json
// config/development.json
{
    "app": {
        "port": 8080
    }
}
```

## Credit
Inspired by [Mathias Buus Madsen](https://github.com/mafintosh)'s
[param](https://github.com/mafintosh/param) package

## License
MIT
