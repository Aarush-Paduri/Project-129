harry_potter = "";
peter_pan = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristscore = 0;
leftWristsong = "";

function preload() {
    harry_potter = loadSound("Harry.mp3");
    peter_pan = loadSound("Peter.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    pose.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("POSENET IS WORKING:)");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y; 
        leftWristscore = results[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);

    fill("#ff0000");
    stroke("#ff0000");

    leftWristsong = harry_potter.isPlaying();

    if(leftWristscore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        peter_pan.stop();
    }

    if(harry_potter.isPlaying() == "False") {
        harry_potter.play();
        document.getElementById("song").innerHTML = "Harry Potter";
    }
}

function play() {
    song.play()
    song.setVolume(1);
    song.rate(1);
}