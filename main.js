
score_right_wrist=0;
score_left_Wrist=0;

sound="";

left_wrist_x=0;
left_wrist_y=0;

right_wrist_x=0;
right_wrist_y=0;

function preload(){
    sound=loadSound("song.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPosses);
}

function gotPosses(results){
if(results.length>0){
console.log(results);
left_wrist_x=results[0].pose.leftWrist.x;
left_wrist_y=results[0].pose.leftWrist.y;
right_wrist_x=results[0].pose.rightWrist.x;
right_wrist_y=results[0].pose.rightWrist.y;
console.log("left wriist x ="+left_wrist_x+".right wrist x ="+right_wrist_x+"right wrist y ="+right_wrist_y+"left wrist y ="+left_wrist_y);
score_left_Wrist=results[0].pose.keypoints[9].score;
score_right_wrist=results[0].pose.keypoints[10].score;
console.log("Left wrist score"+score_left_Wrist+"Right wrist score"+score_right_wrist);
}
}

function modelLoaded(){
    console.log("Model is initalized");
}

function draw(){
    image(video,0,0,600,500);
    fill('red');
    stroke('black');
 
if (score_left_Wrist>0.2) {
    circle(left_wrist_x,left_wrist_y,20);
 y_cord=Number(left_wrist_y);
 y_cordremoved_decimals=floor(y_cord);
 volume=y_cordremoved_decimals/500;
 document.getElementById("volume").innerHTML="Volume ="+volume;
 sound.setVolume(volume);
}  

if (score_right_wrist>0.2) {
    circle(right_wrist_x,right_wrist_y,20);


if (right_wrist_y>0&&right_wrist_y<=100) {
  document.getElementById("speed").innerHTML="Speed = 0.5x";
sound.rate(0.5);
}
else if(right_wrist_y>100&&right_wrist_y<=200){
    document.getElementById("speed").innerHTML="Speed = 1x";
    sound.rate(1.0);
}
else if(right_wrist_y>200&&right_wrist_y<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5x";
    sound.rate(1.5);
}
else if(right_wrist_y>300&&right_wrist_y<=400){
    document.getElementById("speed").innerHTML="Speed = 2x";
    sound.rate(2.0);
}
else if(right_wrist_y>400&&right_wrist_y<=500){
    document.getElementById("speed").innerHTML="Speed = 2.5x";
    sound.rate(2.5);
}
}  
}

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
