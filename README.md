jwalker
----

Parses a file stream for JSON and pretty prints it.

# Usage (CLI)

Using jwalker on the command line.

````
Usage: index.js <options>

Options:

  --input <input>    Input file (-- for stdin).
                     (default: `--`)

  --output <output>  Output file (-- for stdout).
                     (default: `--`)

  --spaces <spaces>  Use number of spaces for indentation.
                     (default: `        `)

  --passthrough      Passthrough non-JSON lines.
                     (default: disabled)
````

# Usage (code)

Using jwalker as a transform stream in node.js.

````javascript

const JWalker = require('jwalker');

readStream
	.pipe(new JWalker({ /* options */ }))
	.pipe(writeStream);

````

## Options

| Name                 | Type      | Description                                  | Default |
|:---------------------|:---------:|:---------------------------------------------|:--------|
| `passthroughNonJSON` | `Boolean` | Tells the transform to passthrough non-JSON. | `false` |
| `spaces`             | `Number`  | The number of spaces used per indentation.   | `4`     |

# License

See LICENSE.
