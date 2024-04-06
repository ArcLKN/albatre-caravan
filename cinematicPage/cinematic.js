var cinematicLength = [0, 15];
var storyNumber = 0;
var interval = 3000;
var ScreenImage = document.getElementById("center-image");
var currentPos = 0;

function changeImage(storyNumber) {
    console.log("Change Image");
    if (++currentPos > cinematicLength[storyNumber]) {
        if (storyNumber == 0) {
            storyNumber++;
            window.location.href = "../mainPage/gamePage.html";
        }
    }
    ScreenImage.src = "../Images/cine-"+String(storyNumber+1)+"-"+String(currentPos)+".png";
}

changeImage(0);
setInterval(changeImage, 3000, storyNumber);