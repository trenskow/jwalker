jwalker
----

Parses a file stream for JSON and pretty prints it.

# Usage (CLI)

Using jwalker on the command line.

````
	Usage: jwalker [options]
	
		Use -- (or omit) for stdin or stdout.
	
		Options:
			-i=[file], --input=[file]         Input file (-- for stdin) (default=stdin).
			-o=[file], --output=[file]        Output file (-- for stdout) (default=stdout).
			-p, --passthrough                 Passthrough non-JSON.
			-s=[spaces], --spaces=[spaces]    Number of spaces per indentation (default=4).
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
