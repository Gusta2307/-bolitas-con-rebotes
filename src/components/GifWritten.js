
// var gifjs = require('gif.js');

// export function GenerateGif1(js) {
// 	var gif = new gifjs({
// 		workers: 4,
// 		quality: 10,
// 		workerScript: 'gif.worker.js',
// 		debug: true
// 	  });	  
	  
// 	var canvas = document.getElementsByTagName('canvas')[0];
// 	var numFrames = js.duration;
// 	var currentFrame = 0;

// 	var addFrame = function() {
// 		js.UpdateStep(currentFrame/numFrames);

// 		window.requestAnimationFrame(() => {
// 			gif.addFrame(canvas);

// 			currentFrame++;
// 			if (currentFrame === numFrames) {
// 				finish();
// 			} else {
// 				setTimeout(addFrame,0);
// 			}
// 		});
// 	}	  
	
// 	var finish = function () {

// 		gif.render();

// 		gif.on('finished', function(blob) {
// 			window.open(URL.createObjectURL(blob));
// 		});

// 		js.isPlaying = true;
// 		js.userControllingStep = false;
// 	}	  
			
// 	addFrame();
// }


export function startRecording(canvas, duration) {
	const chunks = []; // here we will store our recorded media chunks (Blobs)
	const stream = canvas.captureStream(); // grab our canvas MediaStream
	const options = {
		audioBitsPerSecond : 128000,
		videoBitsPerSecond : 2500000,
		mimeType : 'video/webm'
	  }

	const rec = new MediaRecorder(stream, options); // init the recorder

	// every time the recorder has new data, we will store it in our array
	rec.ondataavailable = e => chunks.push(e.data);
	// only when the recorder stops, we construct a complete Blob from all the chunks
	rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
	
	rec.start();
	setTimeout(()=>rec.stop(), duration*1000); // stop recording in 3s
  }

function exportVid(blob) {
	const vid = document.createElement('video');
	vid.src = URL.createObjectURL(blob);
	vid.controls = true;
	document.body.appendChild(vid);
	const a = document.createElement('a');
	a.download = 'myvid.webm';
	a.href = vid.src;
	a.textContent = 'download the video';
	a.style.color = '#fff';
	document.body.appendChild(a);
  }