currentConfig = {
  "regexes": [],
  "phrases": [],
  "words": [],
  "standAloneWords": [],
  "replacementChars": [],
  "mutedPlayers": [],
  "tempMutedPlayers": [],
  "ignoredPlayers": [],
  "logFiltered": true,
  "ignorePrivateMessages": false,
  "caseSensitive": false,
  "muteCommand": true,
  "tellPlayer": true,
  "censorAndSend": false,
  "muteAfterOffense": false,
  "muteAfterOffenseType": "TEMPORARY",
  "muteAfterOffenseMinutes": 5,
  "muteAfterOffenseNumber": 3,
  "offenseExpireMinutes": 30,
  "offenses": []
}



document.getElementById("regexInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitRegex").click();
  }
});
document.getElementById("wordInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitWord").click();
  }
});
document.getElementById("phraseInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitPhrase").click();
  }
});
document.getElementById("standaloneWordInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitStandaloneWord").click();
  }
});


function submitRegex() {
  var regex = document.getElementById("regexInput").value;
  if (regex === "") {
    return;
  }
  document.getElementById("regexInput").value = "";

  document.getElementById("regexesList").innerHTML += regex + "\n";
  updateConfig();
}

function submitWord() {
  var word = document.getElementById("wordInput").value;
  if (word === "") {
    return;
  }
  document.getElementById("wordInput").value = "";

  document.getElementById("wordsList").innerHTML += word + "\n";
  updateConfig();
}

function submitPhrase() {
  var phrase = document.getElementById("phraseInput").value;
  if (phrase === "") {
    return;
  }
  document.getElementById("phraseInput").value = "";

  document.getElementById("phrasesList").innerHTML += phrase + "\n";
  updateConfig();
}

function submitStandaloneWord() {
  var word = document.getElementById("standaloneWordInput").value;
  if (word === "") {
    return;
  }
  document.getElementById("standaloneWordInput").value = "";

  document.getElementById("standaloneWordsList").innerHTML += word + "\n";
  updateConfig();
}

function updateConfig() {
  currentConfig.regexes = document.getElementById("regexesList").value.split("\n").filter(Boolean);
  currentConfig.words = document.getElementById("wordsList").value.split("\n").filter(Boolean);
  currentConfig.phrases = document.getElementById("phrasesList").value.split("\n").filter(Boolean);
  currentConfig.standAloneWords = document.getElementById("standaloneWordsList").value.split("\n").filter(Boolean);

  document.getElementById("output").innerHTML = JSON.stringify(currentConfig, null, 2);
}

function copyToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(currentConfig, null, 2));
}

updateConfig();


