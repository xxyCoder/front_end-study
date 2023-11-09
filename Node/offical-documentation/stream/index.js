const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
    const ac = new AbortController();
    const signal = ac.signal;

    setImmediate(() => ac.abort());
    await pipeline(
        fs.createReadStream('archive.tar'),
        zlib.createGzip(),
        fs.createWriteStream('archive.tar.gz'),
        { signal },
    );
}

run().catch(console.error); // AbortError