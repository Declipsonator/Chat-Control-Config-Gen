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
document.getElementById("ignoredPlayerInput").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitIgnoredPlayer").click();
  }
});
document.getElementById("toReplace").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitReplacement").click();
  }
});
document.getElementById("replaceWith").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitReplacement").click();
  }
});
document.getElementById("importText").addEventListener("keyup",function(event) {
  if (event.key === "Enter") {
    document.getElementById("submitConfig").click();
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

function submitTempMute() {
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

function submitIgnoredPlayer() {
  const player = document.getElementById("ignoredPlayerInput").value;
  if (player === "") {
    return;
  }
  document.getElementById("ignoredPlayerInput").value = "";

  document.getElementById("ignoredPlayerList").innerHTML += player + "\n";
  updateConfig();

}

function submitReplacement() {
  const toReplace = document.getElementById("toReplace").value;
  const replaceWith = document.getElementById("replaceWith").value;
  if (toReplace === "" || replaceWith === "") {
    return;
  }
  document.getElementById("toReplace").value = "";
  document.getElementById("replaceWith").value = "";

  document.getElementById("replacementsList").innerHTML += toReplace + " " + replaceWith + "\n";
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
  const ignoredPlayers = document.getElementById("ignoredPlayerList").value.split("\n").filter(Boolean);
  currentConfig.ignoredPlayers = [];
  for(let i = 0; i < ignoredPlayers.length; i++) {
    const uuid = await getId(ignoredPlayers[i].trim());
    currentConfig.ignoredPlayers.push(uuid);
  }

  const replacements = document.getElementById("replacementsList").value.split("\n").filter(Boolean);
  currentConfig.replacementChars = [];
  for(let i = 0; i < replacements.length; i++) {
    const split = replacements[i].split(" ");
    currentConfig.replacementChars.push({toReplace: split[0], replaceWith: split[1]});
  }

  currentConfig.logFiltered = document.getElementById("logFiltered").checked;
  currentConfig.ignorePrivateMessages = document.getElementById("ignorePrivateMessages").checked;
  currentConfig.caseSensitive = document.getElementById("caseSensitive").checked;
  currentConfig.muteCommand = document.getElementById("muteCommand").checked;
  currentConfig.tellPlayer = document.getElementById("tellPlayer").checked;
  currentConfig.censorAndSend = document.getElementById("censorAndSend").checked;
  currentConfig.muteAfterOffense = document.getElementById("muteAfterOffense").checked;
  currentConfig.muteAfterOffenseType = document.getElementById("muteAfterOffenseType").value;
  currentConfig.muteAfterOffenseMinutes = parseInt(document.getElementById("muteAfterOffenseMinutes").value);
  currentConfig.muteAfterOffenseNumber = parseInt(document.getElementById("muteAfterOffenseNumber").value);
  currentConfig.offenseExpireMinutes = parseInt(document.getElementById("offenseExpireMinutes").value);


  document.getElementById("output").innerHTML = JSON.stringify(currentConfig, null, 2);
}

function loadConfig() {
  const load = document.getElementById("importText").value;
  if (load === "") {
    return;
  }

  const config = JSON.parse(load);

  document.getElementById("regexesList").value = config.regexes.join("\n");
  document.getElementById("wordsList").value = config.words.join("\n");
  document.getElementById("phrasesList").value = config.phrases.join("\n");
  document.getElementById("standaloneWordsList").value = config.standAloneWords.join("\n");
  document.getElementById("mutesList").value = config.mutedPlayers.map(player => player.uuid + " " + player.reason).join("\n");
  document.getElementById("tempMuteList").value = config.tempMutedPlayers.map(player => player.uuid + " " + player.until + " " + player.reason).join("\n");
  document.getElementById("ignoredPlayerList").value = config.ignoredPlayers.join("\n");
  document.getElementById("replacementsList").value = config.replacementChars.map(replacement => replacement.toReplace + " " + replacement.replaceWith).join("\n");
  document.getElementById("logFiltered").checked = config.logFiltered;
  document.getElementById("ignorePrivateMessages").checked = config.ignorePrivateMessages;
  document.getElementById("caseSensitive").checked = config.caseSensitive;
  document.getElementById("muteCommand").checked = config.muteCommand;
  document.getElementById("tellPlayer").checked = config.tellPlayer;
  document.getElementById("censorAndSend").checked = config.censorAndSend;
  document.getElementById("muteAfterOffense").checked = config.muteAfterOffense;
  document.getElementById("muteAfterOffenseType").value = config.muteAfterOffenseType;
  document.getElementById("muteAfterOffenseMinutes").value = config.muteAfterOffenseMinutes;
  document.getElementById("muteAfterOffenseNumber").value = config.muteAfterOffenseNumber;
  document.getElementById("offenseExpireMinutes").value = config.offenseExpireMinutes;

  updateConfig();
}

function copyToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(currentConfig, null, 2));
}

const savedIds = {};

async function getId(playername) {
  if (savedIds[playername]) {
    return savedIds[playername];
  } else if (playername.length > 16) {
    return playername;
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

const checkBoxes = document.getElementsByTagName("input");
for (let i = 0; i < checkBoxes.length; i++) {
  if (checkBoxes[i].type === "checkbox") {
    checkBoxes[i].addEventListener("change", function() {
      updateConfig();
    });
  }
}

const selects = document.getElementsByTagName("select");
for (let i = 0; i < selects.length; i++) {
  selects[i].addEventListener("change", function() {
    updateConfig();
  });
}

const offenseInputs = document.getElementsByClassName("update");
for (let i = 0; i < offenseInputs.length; i++) {
  offenseInputs[i].addEventListener("input", function() {
    updateConfig();
  });
}


