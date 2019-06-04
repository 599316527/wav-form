const fs= require('fs');
const makewav=require('./index');

makewav(fs.readFileSync(process.argv[2]), {
    wavecolor: '#fff',
    barWidth: 4,
    barSpace: 1
}).then(function (buffer) {
    fs.writeFileSync(process.argv[3], buffer);
});


