const Canvas = require('canvas');
const decode = require('audio-decode');
const getContext = require('audio-context');




module.exports = (buffer, params, cb) => {

  decode(buffer, {
    context: getContext()
  }, (err, audioBuffer) => {
    var canvas = new Canvas(params.width || 400, params.height || 80)
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    if (params.bgcolor) {
      ctx.fillStyle = params.bgcolor;
      ctx.fillRect(0, 0, width, height)
    }
    var data = audioBuffer.getChannelData(0)
    var step = Math.ceil(data.length / width);
    var amp = height / 2;
    for (var i = 0; i < width; i++) {
      var min = 1.0;
      var max = -1.0;
      for (var j = 0; j < step; j++) {
        var datum = data[(i * step) + j];
        if (datum < min)
          min = datum;
        if (datum > max)
          max = datum;
      }
      ctx.fillStyle = params.wavecolor || '#000';
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
    var buf = canvas.toBuffer();
    cb(buf)
  });
};
