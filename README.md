#wav-form

### easy draw png waveform with node.js.

<img class="resp" src="https://azopcorp.com/images/waveform.png">

this node draws waveform from wav , mp3 and flac audio .

### USAGE:

```
npm install wav-form --save

```


```javascript

var makewav=require('waveforms');
var fs= require('fs');



fs.readFile('stereo.mp3', function(err,data){
    if (!err) {

makewav(data,{bgcolor:"#00F",wavecolor:"#f00",width:1000,height:300},function(buff){

fs.writeFile('waveform.png',buff,'binary',function(error) {
    if(error) {
      console.log( err);

    }
  })
})
    } else {
        console.log(err);
    }
});


```

The module takes a an audio file buffer in entry and returns a png file buffer in callback.

you can pass parameter to control background color, waveform color, image width and height.

by default (if param not set) , background is transparent, waveform color is black, width is 400px and height is 80px.


license WTFPL , have fun.
