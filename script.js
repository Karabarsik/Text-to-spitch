const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
const rate = document.querySelector("#rate");
let isSpeaking = true;
const synth = window.speechSynthesis;

//{
function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
//}

const textToSpeech = () =>{
    const text = textarea.value;

    if(!synth.speaking && text){
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate.value
        synth.speak(utterance);
    }

    if(text.length > 50){
        if(synth.speak && isSpeaking){
            button.innerText = "Пауза";
            synth.resume();
            isSpeaking = false;
        }else{
            button.innerText = "Продолжить";
            synth.pause();
            isSpeaking = true;
        }
    }else{
        isSpeaking - false;
        button.innerText = "Озвучить";
    }

    setInterval(() =>{
        if(!synth.speaking && !isSpeaking){
            isSpeaking = true;
            button.innerText = "Преобразовать в речь";
        }
    })
}

button.addEventListener("click", textToSpeech);
