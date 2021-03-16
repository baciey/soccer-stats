const timestampElement = document.querySelector(".game-board .timestamp");
const scoreElement = document.querySelector(".game-board .score");
const eventsHomeElement = document.querySelector(".events .home");
const eventsAwayElement = document.querySelector(".events .away");
const playersHomeElement = document.querySelector(".players .home");
const playersAwayElement = document.querySelector(".players .away");
const players = document.querySelector(".game-board .players");

const game = results.data.find((el) => el.id === gameId);
console.log(game);

if (game) renderBoard();

function renderBoard() {
  //TIMESTAMP
  let timestamp = game.timestamp.substring(0, 16);
  timestamp = timestamp.replace("T", " ");

  timestampElement.innerHTML = timestamp;

  //SCORE
  const homeTeam = document.createElement("span");
  const score = document.createElement("span");
  const awayTeam = document.createElement("span");

  homeTeam.innerHTML = `
    <form method="post" action="stats-page.php">
      <input type="hidden" name="team_id" value="${game.teams.home.id}">
      <input type="hidden" name="team_name" value="${game.teams.home.name}">
      <input type="submit" name="team_submit" value="${game.teams.home.name}">
    </form>`;
  score.innerHTML = `${game.score[0]} : ${game.score[1]}`;
  awayTeam.innerHTML = `
    <form method="post" action="stats-page.php">
      <input type="hidden" name="team_id" value="${game.teams.away.id}">
      <input type="hidden" name="team_name" value="${game.teams.away.name}">
      <input type="submit" name="team_submit" value="${game.teams.away.name}">
    </form>`;
  scoreElement.appendChild(homeTeam);
  scoreElement.appendChild(score);
  scoreElement.appendChild(awayTeam);

  //EVENTS
  const eventsHome = [];
  const eventsAway = [];
  const events = ["goals", "cards", "substitutions"];

  for (let i = 0; i < events.length; i++) {
    game.events[events[i]].forEach((el) => {
      if (el.team.id === game.teams.home.id) {
        eventsHome.push(el);
      } else if (el.team.id === game.teams.away.id) {
        eventsAway.push(el);
      }
    });
  }
  // console.log(eventsHome);
  // console.log(eventsAway);

  function sortEvents(a, b) {
    let amatchTime = "";
    if (a.matchTime.includes("'")) {
      amatchTime = a.matchTime.substring(0, a.matchTime.indexOf("'"));
    }
    if (a.matchTime.includes("+")) {
      let firstPart = amatchTime.substring(0, amatchTime.indexOf("+"));
      let secondPart = amatchTime.substring(amatchTime.indexOf("+") + 1);
      amatchTime = Number(firstPart) + Number(secondPart);
    }
    amatchTime = Number(amatchTime);
    let bmatchTime = "";
    if (b.matchTime.includes("'")) {
      bmatchTime = b.matchTime.substring(0, b.matchTime.indexOf("'"));
    }
    if (b.matchTime.includes("+")) {
      let firstPart = bmatchTime.substring(0, bmatchTime.indexOf("+"));
      let secondPart = bmatchTime.substring(bmatchTime.indexOf("+") + 1);
      bmatchTime = Number(firstPart) + Number(secondPart);
    }
    bmatchTime = Number(bmatchTime);

    return amatchTime - bmatchTime;
  }
  eventsHome.sort(sortEvents);
  eventsAway.sort(sortEvents);

  function renderEvents(array, name) {
    // console.log(array);
    let row = "";
    array.forEach((el) => {
      if (el.type === "goal") {
        row += `<div class="goal"><span class="goal-icon"></span>${el.player.name} ${el.matchTime} </div>`;
      } else if (el.type === "card") {
        const color = el.subType.includes("yellow");
        row += `<div class="card"><span class="card-square" style="background-color: ${
          color ? "yellow" : "red"
        }"></span>${el.player.name} ${el.matchTime} </div>`;
      } else if (el.type === "substitution") {
        row += `<div class="substitution"><span class="arrow-down"></span>${el.playerOff.name} | ${el.playerOn.name} <span class="arrow-up"></span>  ${el.matchTime} </div>`;
      }
    });
    if (name === "home")
      eventsHomeElement.innerHTML += `<p class="team-name">${game.teams.home.name}</p> ${row}`;
    else if (name === "away")
      eventsAwayElement.innerHTML += `<p class="team-name">${game.teams.away.name}</p> ${row}`;
  }

  renderEvents(eventsHome, "home");
  renderEvents(eventsAway, "away");
  //PLAYERS
  function renderPlayers() {
    let startingHome = "";
    let subsHome = "";
    game.players.home.forEach((player) => {
      if (player.role === "starting") {
        startingHome += `<div class="player"><span class="shirt-icon">${player.number}</span> ${player.name} - ${player.position}</div>`;
      } else if (player.role === "sub") {
        subsHome += `<div class="player"><span class="shirt-icon">${player.number}</span> ${player.name} - ${player.position}</div>`;
      }
    });
    playersHomeElement.innerHTML = `<p class="team-name">${game.teams.home.name}</p><p class="title">Wyjściowa jedenastka</p> ${startingHome}`;
    playersHomeElement.innerHTML += `<p class="title">Ławka rezerwowych</p> ${subsHome}`;

    let startingAway = "";
    let subsAway = "";
    game.players.away.forEach((player) => {
      if (player.role === "starting") {
        startingAway += `<div class="player"><span class="shirt-icon">${player.number}</span> ${player.name} - ${player.position}</div>`;
      } else if (player.role === "sub") {
        subsAway += `<div class="player"><span class="shirt-icon">${player.number}</span> ${player.name} - ${player.position}</div>`;
      }
    });
    playersAwayElement.innerHTML = `<p class="team-name">${game.teams.away.name}</p><p class="title">Wyjściowa jedenastka</p> ${startingAway}`;
    playersAwayElement.innerHTML += `<p class="title">Ławka rezerwowych</p> ${subsAway}`;
  }
  renderPlayers();
}
