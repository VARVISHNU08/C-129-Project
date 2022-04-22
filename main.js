song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
song1Status = "";
song2Status = "";
playing = "";

function preload(){
    song1 = loadSound("bella-ciao.mp3");
    song2 = loadSound("believer.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialized!');
}

function gotPoses(results){
    if(results.length > 0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristScore = results[0].pose.keypoints[9].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("purple");
    stroke("green");

    playing = song1.isPlaying();
    console.log(playing);

    song1Status = "Song will be played when the left wrist is shown in front of the webcam";

    if(leftWristScore > 0.2){
        fill("red");
        stroke("blue");
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }

    if(playing == "false"){
        song1Status = "song 1 will be played when left wrist is shown";
        document.getElementById("result").innerHTML = song1Status;
    }
}