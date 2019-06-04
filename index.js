const { createCanvas, loadImage } = require('canvas')
const decode = require('audio-decode');
const getContext = require('audio-context');
const {promisify} = require('util');

const pDecode = promisify(decode);

module.exports = async function (buffer, {
    width = 900,
    height = 90,
    wavecolor = '#000',
    bgcolor,
    barWidth = 1,
    barSpace = 0
} = {}, callback) {
    let audioBuffer = await pDecode(buffer, { context: getContext() });
    let canvas = createCanvas(width, height);
    let ctx = canvas.getContext('2d');

    if (bgcolor) {
        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0, width, height);
    }

    let data = audioBuffer.getChannelData(0);
    let amp = height / 2;
    let count = Math.floor((barSpace + width) / (barWidth + barSpace));
    let step = data.length / count;

    for (let i = 0; i < count; i++) {
        let min = 1;
        let max = -1;
        for (let j = 0; j < step; j++) {
            let val = data[Math.floor(i * step + j)];
            if (val < min) {
                min = val;
            }
            if (val > max) {
                max = val;
            }
        }
        ctx.fillStyle = wavecolor;
        ctx.fillRect(i * (barWidth + barSpace), (1 + min) * amp, barWidth, Math.max(1, (max - min) * amp));
    }

    let buf = canvas.toBuffer();
    if (callback) {
        callback(buf);
    }
    else {
        return buf;
    }
};
