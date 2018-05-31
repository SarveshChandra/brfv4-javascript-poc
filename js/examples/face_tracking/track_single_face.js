(function exampleCode() {
	"use strict";
	//changed for r&d
	//console.log("FILE is track_single_face.js");
	//document.getElementById("vertices").innerHTML = "<button onclick='captureFaceData()' style='padding: 10px;'>Capture</button>";

	brfv4Example.initCurrentExample = function(brfManager, resolution) {

		// By default everything necessary for a single face tracking app
		// is set up for you in brfManager.init. There is actually no
		// need to configure much more for a jump start.

		brfManager.init(resolution, resolution, brfv4Example.appId);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		//changed for r&d
		//console.log(brfManager);

		// In a webcam example imageData is the mirrored webcam video feed.
		// In an image example imageData is the (not mirrored) image content.

		//r&d (distance)
		var dpi = getDocumentPPI();
		console.log("dpi",dpi);

		brfManager.update(imageData);

		// Drawing the results:

		draw.clear();

		// Face detection results: a rough rectangle used to start the face tracking.

		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
		draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		// Get all faces. The default setup only tracks one face.

		var faces = brfManager.getFaces();

		for(var i = 0; i < faces.length; i++) { 

			var face = faces[i];

			//r&d
			console.log(face.vertices);
			for(var i=0; i<68; i++) {

				document.getElementById("vertices-" + i).innerHTML = "<br><br>v" + (i) + "<br>x: " + face.vertices[i] + "<br>y: " + face.vertices[i+1];

			}

			if(		face.state === brfv4.BRFState.FACE_TRACKING_START ||
					face.state === brfv4.BRFState.FACE_TRACKING) {

				// Face tracking results: 68 facial feature points.

				draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, 0x00a0ff, 0.4);
				draw.drawVertices(	face.vertices, 2.0, false, 0x00a0ff, 0.4);

			}

			
			//r&d (distance)
			var x1=face.vertices[0];
			var y1=face.vertices[1];
			
			
			var x2=face.vertices[36];
			var y2=face.vertices[37];
			
			
			var x3=face.vertices[16];
			var y3=face.vertices[17];
			
			
			var x4=face.vertices[44];
			var y4=face.vertices[45];
			
			
			var x5=face.vertices[38];
			var y5=face.vertices[39];
			

			var x6=face.vertices[42];
			var y6=face.vertices[43];

			
			var leftSidePoints = Math.sqrt( ((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)) );
			//console.log("leftSidePoints distance",leftSidePoints);
			var cmValForLeft = 2.54*leftSidePoints/dpi;
			//console.log(cmValForLeft);

			var rightSidePoints = Math.sqrt( ((x3-x4)*(x3-x4)) + ((y3-y4)*(y3-y4)) );
			//console.log("rightSidePoints distance",rightSidePoints);
			var cmValForRight = 2.54*rightSidePoints/dpi;
			//console.log(cmValForRight);

			var nosePoints = Math.sqrt( ((x5-x6)*(x5-x6)) + ((y5-y6)*(y5-y6)) );
			//console.log("nosePoints",nosePoints);
			var cmValForNose = 2.54*nosePoints/dpi;
			//console.log(cmValForNose);

			document.getElementById("nose").innerHTML=cmValForNose;
			document.getElementById("left").innerHTML=cmValForLeft;
			document.getElementById("right").innerHTML=cmValForRight;

		}
		
	};

	brfv4Example.dom.updateHeadline("Face tracking - track single face\n" +
		"Detect and track one face and draw the 68 facial landmarks.");

	brfv4Example.dom.updateCodeSnippet(exampleCode + "");
})();

function getDocumentPPI() {
	var elem = document.createElement('div');
	elem.style.width = '1in';
	document.body.appendChild(elem);
	var ppi = elem.offsetWidth;
	document.body.removeChild(elem);
	return ppi;
}

//alert('Your PPI is ' + getDocumentPPI());