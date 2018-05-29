(function exampleCode() {
	"use strict";
	//changed for r&d
	console.log("FILE is track_single_face.js");
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
			//document.getElementById("vertices").innerHTML = face.vertices;

			if(		face.state === brfv4.BRFState.FACE_TRACKING_START ||
					face.state === brfv4.BRFState.FACE_TRACKING) {

				// Face tracking results: 68 facial feature points.

				draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, 0x00a0ff, 0.4);
				draw.drawVertices(	face.vertices, 2.0, false, 0x00a0ff, 0.4);

				//changed for r&d
				//console.log("Draw");
				//console.log(draw.drawVertices);
			}
		}
		
	};

	brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - track single face\n" +
		"Detect and track one face and draw the 68 facial landmarks.");

	brfv4Example.dom.updateCodeSnippet(exampleCode + "");
})();