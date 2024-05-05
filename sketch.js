let video;
let model;

async function preload() {
    model = await blazeface.load();
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

async function draw() {

    // clear(); 
    if (model && video.loadedmetadata) {
        const predictions = await model.estimateFaces(video.elt, false);

        if (predictions.length > 0) {
            // Assume we are focusing on the first detected face for simplicity
            const keypoints = predictions[0].landmarks;

            
            const eye1 = keypoints[0]; // Right eye
            const eye2 = keypoints[1]; // Left eye
            const midPointX = (eye1[0] + eye2[0]) / 2;
            const midPointY = (eye1[1] + eye2[1]) / 2;

            const zoomFactor = 3;
            const eyeDistance = dist(eye1[0], eye1[1], eye2[0], eye2[1]);
            const captureWidth = eyeDistance * zoomFactor;
            const captureHeight = eyeDistance * zoomFactor;

            // Calculate the source rectangle coordinates
            const sx = midPointX - captureWidth / 2;
            const sy = midPointY - captureHeight / 2;

            
            image(video, 0, 0, width, height, sx, sy, captureWidth, captureHeight);
        }
    } else {
        image(video, 0, 0, width, height); 
    }
}
