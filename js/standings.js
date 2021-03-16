function showStandingsButtons() {
  const div = document.createElement("div");
  div.classList.add("total-home-away");
  div.innerHTML = `
    <button class="total active" onclick="showStandingsTotalHomeAway('total');">Ogółem</button>
    <button class="home" onclick="showStandingsTotalHomeAway('home');">U siebie</button>
    <button class="away" onclick="showStandingsTotalHomeAway('away');">Na wyjeździe</button>
  `;

  const navigation = document.querySelector(".navigation");
  navigation.innerHTML = "";
  navigation.appendChild(div);
  const buttons = document.querySelectorAll(".total-home-away button");
  buttons.forEach((el) => {
    el.addEventListener("click", () => addClasses(buttons, el));
  });
  showStandingsTotalHomeAway("total");
}

function showStandings(param) {
  if (param) {
    currentStandings = param;
  } else {
    currentStandings = { data: [] };
    currentStandings.data = [...standings.data];
  }

  const standingsTableThead = document.querySelector(".standings-table thead");
  standingsTableThead.innerHTML = `
    <th>#</th>
    <th>Drużyna</th>
    <th class="played th-sort">M</th>
    <th class="wins th-sort">Z</th>
    <th class="draws th-sort">R</th>
    <th class="losses th-sort">P</th>
    <th class="points th-sort">PKT</th>
  `;
  const names = ["played", "wins", "draws", "losses", "points"];
  for (let i = 0; i < 5; i++) {
    document
      .querySelector(".standings-table th." + names[i])
      .addEventListener("click", () =>
        sort("standings", names[i], currentStandings)
      );
  }

  const standingsTableTbody = document.querySelector(".standings-table tbody");
  standingsTableTbody.innerHTML = "";
  currentStandings.data.forEach((el, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${el.position}</td>
      <td class="team">
          <form method="post" action="stats-page.php">
            <input type="hidden" name="team_id" value="${el.team.id}">
            <input type="hidden" name="team_name" value="${el.team.name}">
            <input type="submit" name="team_submit" value="${el.team.name}">
          </form>
      </td>
      <td>${el.played}</td>
      <td>${el.wins}</td>
      <td>${el.draws}</td>
      <td>${el.losses}</td>
      <td>${el.points}</td>
  `;
    standingsTableTbody.appendChild(tr);
  });
}

function showStandingsTotalHomeAway(value) {
  if (value === "total") return showStandings(standings);

  const home = value === "home" ? 0 : 1;
  const away = value === "home" ? 1 : 0;

  const teams = { data: [] };
  teams.data = JSON.parse(JSON.stringify(standings.data));

  for (let i = 0; i < teams.data.length; i++) {
    const played = [];
    const wins = [];
    const draws = [];
    const losses = [];

    results.data.forEach((el) => {
      if (el.teams[value].id === teams.data[i].team.id) {
        played.push(el);

        if (el.score[home] > el.score[away]) {
          wins.push(el);
        } else if (el.score[home] < el.score[away]) {
          losses.push(el);
        } else if (el.score[home] === el.score[away]) {
          draws.push(el);
        }
      }
    });

    teams.data[i].played = played.length;
    teams.data[i].wins = wins.length;
    teams.data[i].draws = draws.length;
    teams.data[i].losses = losses.length;
    teams.data[i].points = wins.length * 3 + draws.length;
  }
  showStandings(teams);
}
