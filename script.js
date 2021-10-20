'use strict'

// TODO deploy to ghpages
// TODO expression detection i.e. if the face is happy or sad
// TODO face recognition so it knows if it's me
// TODO refactoring into angular
// TODO add stats in video feed i.e. frame rate, prediction rate
// TODO controls float above video
// TODO supports pet face detection / dog or cat
// TODO facial expression matcher to an emoji



let video = document.getElementById("video");
let model;
// declare a canvas variable and get its context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const setupCamera = () => {
    navigator.mediaDevices
        .getUserMedia({
            video: { width: 600, height: 400 },
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
        });
};

const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    // draw the video first
    ctx.drawImage(video, 0, 0, 600, 400);

    prediction.forEach((pred) => {

        // draw the rectangle enclosing the face
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "blue";
        // the last two arguments are width and height
        // since blazeface returned only the coordinates,
        // we can find the width and height by subtracting them.

        ctx.font = "12px Arial";
        ctx.fillText(pred.probability, pred.topLeft[0] + 10, pred.topLeft[1] + 15);
        
        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.stroke();


        // TODO add probability
        // drawing small rectangles for the face landmarks
        ctx.fillStyle = "yellow";
        pred.landmarks.forEach((landmark) => {
            ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });

    });
};

setupCamera();
video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();
    // call detect faces every 100 milliseconds or 10 times every second
   setInterval(detectFaces, 100);
});