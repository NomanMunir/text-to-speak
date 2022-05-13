const synth = window.speechSynthesis;

/* DOM Elements */
const textForm = document.querySelector('form');
const inputText = document.querySelector('#input-text');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const voiceSelect = document.querySelector('#voice-select');

let voices = []
const getVoices = function () {
    voices = synth.getVoices();

    /* voices option */
    voiceSelect.innerHTML = voices.map(voice =>
        `<option data-lang = "${voice.lang}" data-name = "${voice.name}">
                ${voice.name}(${voice.lang})
            </option>`
    ).join('')
}
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}

const speak = function () {
    /* if speaking */
    if (synth.speaking) {
        console.log('Already Speaking...')
        return;
    }
    if (inputText.value !== '') {
        const speakText = new SpeechSynthesisUtterance(inputText.value);

        /* on Speak End */
        speakText.onend = e => {
            console.log('Done Speaking...');
        }

        /* on Speak Error */
        speakText.onError = (e) => {
            console.log('Somthing went Wrong...')
        };
        const selectedValue = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if (voice.name === selectedValue) {
                speakText.voice = voice;
            }
        })

        /* Set Rate */
        speakText.rate = rate.value;

        /* Set Pitch */
        speakText.pitch = pitch.value;

        synth.speak(speakText)
    }
}

/* addEventlistener */

/* on form Submit */
textForm.addEventListener('submit', e => {
    speak()
    e.preventDefault()
})

/* on voice Select */

voiceSelect.addEventListener('change', e => speak);

/* on rate Change */
rate.addEventListener('change', e => {
    rateValue.textContent = rate.value  
})

/* on pitch Change */
pitch.addEventListener('change', e => {
    pitchValue.textContent = pitch.value  
})
