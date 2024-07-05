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
document.getElementById("urlInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitURL").click();
  }
});
document.getElementById("muteInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitMute").click();
  }
});
document.getElementById("tempMuteInputName").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitTempMute").click();
  }
});
document.getElementById("tempMuteInputHours").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitTempMute").click();
  }
});
document.getElementById("muteReason").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitMute").click();
  }
});
document.getElementById("tempMuteReason").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitTempMute").click();
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

async function submitMute() {
  const player = document.getElementById("muteInput").value;
  const reason = document.getElementById("muteReason").value;

  if (player === "") {
    return;
  }
  document.getElementById("muteInput").value = "";
  document.getElementById("muteReason").value = "";


  document.getElementById("mutesList").innerHTML += player + " " + reason + "\n";
  updateConfig();
}

async function submitTempMute() {
  const player = document.getElementById("tempMuteInputName").value;
  const reason = document.getElementById("tempMuteReason").value;
  const hours = document.getElementById("tempMuteInputHours").value;
  if (player === "" || hours === "") {
    return;
  }
  document.getElementById("tempMuteInputName").value = "";
  document.getElementById("tempMuteInputHours").value = "";
  document.getElementById("tempMuteReason").value = "";

  document.getElementById("tempMuteList").innerHTML +=  "" + player + " " + hours + " " + reason + "\n";
  updateConfig();

}

function submitURL() {
  const url = document.getElementById("urlInput").value;
  if (url === "") {
    return;
  }
  document.getElementById("urlInput").value = "";

  fetch(url).then(response => response.text()).then(text => {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") {
        continue;
      }

      if (line.includes(" ")) {
        document.getElementById("phrasesList").innerHTML += line + "\n";
      } else if (line.length <= 4) {
        document.getElementById("standaloneWordsList").innerHTML += line + "\n";
      } else {
        document.getElementById("wordsList").innerHTML += line + "\n";
      }
    }
    updateConfig();

  });
}


async function updateConfig() {
  currentConfig.regexes = document.getElementById("regexesList").value.split("\n").filter(Boolean);
  currentConfig.words = document.getElementById("wordsList").value.split("\n").filter(Boolean);
  currentConfig.phrases = document.getElementById("phrasesList").value.split("\n").filter(Boolean);
  currentConfig.standAloneWords = document.getElementById("standaloneWordsList").value.split("\n").filter(Boolean);
  const mutedPlayers = document.getElementById("mutesList").value.split("\n").filter(Boolean);
  currentConfig.mutedPlayers = [];
  for(let i = 0; i < mutedPlayers.length; i++) {
    const uuid = await getId(mutedPlayers[i].split(" ")[0].trim());
    let reason = mutedPlayers[i].split(" ").slice(1).join(" ");
    if (reason === "") reason = "No reason provided."
    currentConfig.mutedPlayers.push({uuid: uuid, reason: reason});
  }
  const tempMutedPlayers = document.getElementById("tempMuteList").value.split("\n").filter(Boolean);
  currentConfig.tempMutedPlayers = [];
  for(let i = 0; i < tempMutedPlayers.length; i++) {
    const split = tempMutedPlayers[i].split(" ");
    const uuid = await getId(split[0].trim());
    const hours = split[1];
    let reason = split.slice(2).join(" ");
    if (reason === "") reason = "No reason provided."
    currentConfig.tempMutedPlayers.push({uuid: uuid, until: Date.now() + hours * 3600000, reason: reason});
  }

  document.getElementById("output").innerHTML = JSON.stringify(currentConfig, null, 2);
}

function copyToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(currentConfig, null, 2));
}

const savedIds = {};

async function getId(playername) {
  if (savedIds[playername]) {
    return savedIds[playername];
  }

  const response = await fetch("https://api.mojang.com/users/profiles/minecraft/" + playername);
  const data = await response.json();
  savedIds[playername] = data.id;
  return data.id;
}

updateConfig();


const textAreas = document.getElementsByTagName("textarea");
for (let i = 0; i < textAreas.length; i++) {
  textAreas[i].addEventListener("input", function() {
    updateConfig();
  });
}
