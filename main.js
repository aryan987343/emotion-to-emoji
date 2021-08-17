predition_1 =""
predition_1 =""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach(camera);


function cap_button() {
    Webcam.snap(function(data_url) {
        document.getElementById("result").innerHTML = "<img id='caputure' src='" + data_url + "'>"
    })
}

console.log("ml5_version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vjZQrhis1/model.json",model_loaded);

function model_loaded() {
    console.log('model_loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    
    speak_data_1 = "first predition" + predition_1;
    speak_data_2 = "second predition" + predition_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function pred_button() {
    img = document.getElementById("caputure");
    classifier.classify(img, gotresult);
}

function gotresult(error,result) {
    if (error) {
        console.log(error);
    }
    
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        predition_1 = result[0].label;
        predition_2 = result[1].label;
        speak()
    }
    

    if (result[0].label == "happy") {document.getElementById("update_emoji").innerHTML = "&#128512"};
    if (result[0].label == "sad") {document.getElementById("update_emoji").innerHTML = "&#128532"};
    if (result[0].label == "angry") {document.getElementById("update_emoji").innerHTML = "&#128546"};

    if (result[1].label == "happy") {document.getElementById("update_emoji2").innerHTML = "&#128512"};
    if (result[1].label == "sad") {document.getElementById("update_emoji2").innerHTML = "&#128532"};
    if (result[1].label == "angry") {document.getElementById("update_emoji2").innerHTML = "&#128546"};
}