interface Response {
    bytes: string;
}

interface Solution {
    int: number;
    uint: number;
    short: number;
    float: number;
    double: number;
    big_endian_double: number;
}

const getUrl = 'https://hackattic.com/challenges/help_me_unpack/problem?access_token=87921991238ef009';
const postUrl = 'https://hackattic.com/challenges/help_me_unpack/solve?access_token=87921991238ef009';

const getResponse = await fetch(getUrl);
const getJson = (await getResponse.json()) as Response;
console.log(`GET json: ${JSON.stringify(getJson)}`);

const { bytes } = getJson;
const buffer = Buffer.from(bytes, 'base64');
const solution: Solution = {
    int: buffer.readInt32LE(0),
    uint: buffer.readUint32LE(4),
    short: buffer.readInt16LE(8),
    float: buffer.readFloatLE(12),
    double: buffer.readDoubleLE(16),
    big_endian_double: buffer.readDoubleBE(24),
};
console.log(`solution: ${JSON.stringify(solution)}`);

const postResponse = await fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(solution),
});
const postJson = await postResponse.json(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
console.log(`POST json: ${JSON.stringify(postJson)}`);

export {};
