let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpyBtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code-length');
let exchanLang = document.querySelector('.bx-transfer');

langOption.forEach((get, con) => {
  for(let countryCode in language) {
    let selected;
    if (con == 0 && countryCode == "id-ID") {
      selected = "selected";
    } else if (con == 1 && countryCode == "zh-CN") {
      selected = "selected";
    }

    let option = `<option value="${countryCode}" ${selected}> ${language[countryCode]}</option>`;
    get.insertAdjacentHTML('beforeend', option);
  }
})

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

fromText.addEventListener('input', debounce(function() {
  let content = fromText.value;
  fromContent = langOption[0].value;
  transContent = langOption[1].value;

  let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

  fetch(transLINK).then(translate => translate.json()).then(data => {
    transText.value = data.responseData.translatedText;
  });
}, 300)); // Adjust the delay as needed

fromVoice.addEventListener('click', function() {
  let fromTalk;
  fromTalk = new SpeechSynthesisUtterance(fromText.value);
  fromTalk.lang = langOption[0].value;
  speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click', function() {
  let fromTalk;
  fromTalk = new SpeechSynthesisUtterance(transText.value);
  fromTalk.lang = langOption[1].value;
  speechSynthesis.speak(fromTalk);
})

cpyBtn.addEventListener('click', function() {
  navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup', function() {
  countValue.innerHTML = `${fromText.value.length}/5,000`;
})

exchanLang.addEventListener('click', function() {
  let temptText = fromText.value;
  fromText.value = transText.value;
  transText.value = temptText;

  let tempOpt = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value = tempOpt;
})

