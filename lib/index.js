
import { Transform } from 'stream';

export default class JWalker extends Transform {

	constructor(options = {}) {

		super();

		this._options = options;

		this._backBuffer = new Buffer.from('');
		this._lastBufferSearch = 0;

	}

	_parse(chunk) {

		try {
			this.push(Buffer.from(JSON.stringify(JSON.parse(chunk), null, this._options.spaces || 4) + '\n', 'utf-8'));
		} catch (_) {
			if (this._options.passthroughNonJSON) {
				this.push(Buffer.concat([chunk, Buffer.from('\n', 'utf-8')]));
			}
		}

	}

	_transform(chunk, enc, done) {

		this._backBuffer = Buffer.concat([this._backBuffer, Buffer.from(chunk, enc)]);

		for (let idx = this._lastBufferSearch ; idx < this._backBuffer.length ; idx++) {
			if (this._backBuffer.readUInt8(idx) === 0x0A) {

				let chunk = this._backBuffer.slice(0, idx);

				this._backBuffer = this._backBuffer.slice(idx + 1);
				this._lastBufferSearch = idx = 0;

				this._parse(chunk);

			}
		}

		done();

	}

	_flush(done) {
		this._parse(this._backBuffer);
		this._backBuffer = undefined;
		done();
	}

};
