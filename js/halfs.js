function showHalfsButtons() {
  const div = document.createElement("div");
  div.classList.add("total-home-away");
  div.innerHTML = `
      <button class="total active" onclick="showHalfsTotalHomeAway('total');">Ogółem</button>
      <button class="home" onclick="showHalfsTotalHomeAway('home');">U siebie</button>
      <button class="away" onclick="showHalfsTotalHomeAway('away');">Na wyjeździe</button>
    `;

  const navigation = document.querySelector(".navigation");
  navigation.innerHTML = "";
  navigation.appendChild(div);
  const buttons = document.querySelectorAll(".total-home-away button");
  buttons.forEach((el) => {
    el.addEventListener("click", () => addClasses(buttons, el));
  });
  showHalfsTotalHomeAway("total");
}

function showHalfs(param) {
  if (param) {
    currentStandings = param;
  } else {
    currentStandings = { data: [] };
    currentStandings.data = [...standings.data];
  }
  //   console.log(currentStandings);

  const standingsTableThead = document.querySelector(".standings-table thead");
  standingsTableThead.innerHTML = `
      <th>#</th>
      <th>Drużyna</th>
      <th class="goals th-sort">Strzelone</th>
      <th class="firstHalfGoals th-sort">1p</th>
      <th class="secondHalfGoals th-sort">2p</th>
    `;
  document
    .querySelector(".standings-table th.goals")
    .addEventListener("click", () => sort("halfs", "goals", currentStandings));
  document
    .querySelector(".standings-table th.firstHalfGoals")
    .addEventListener("click", () =>
      sort("halfs", "firstHalfGoals", currentStandings)
    );
  document
    .querySelector(".standings-table th.secondHalfGoals")
    .addEventListener("click", () =>
      sort("halfs", "secondHalfGoals", currentStandings)
    );

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
        <td>${el.goals}</td>
        <td class="goals-percentage">${el.firstHalfGoals}</td>
        <td class="goals-percentage">${el.secondHalfGoals}</td>
        
    `;
    standingsTableTbody.appendChild(tr);
  });
}

function showHalfsTotalHomeAway(value) {
  const home = value === "home" ? 0 : 1;
  const away = value === "home" ? 1 : 0;

  const teams = { data: [] };
  teams.data = JSON.parse(JSON.stringify(standings.data));

  if (value === "total") {
    for (let i = 0; i < teams.data.length; i++) {
      let goals = 0;
      let firstHalfGoals = 0;
      let secondHalfGoals = 0;

      results.data.forEach((el) => {
        if (
          el.teams.home.id === teams.data[i].team.id ||
          el.teams.away.id === teams.data[i].team.id
        ) {
          el.events.goals.forEach((goal) => {
            if (goal.team.id === teams.data[i].team.id) {
              goals++;
              let mt = goal.matchTime.substring(0, goal.matchTime.indexOf("'"));
              if (mt.includes("+")) mt = mt.substring(0, mt.indexOf("+"));
              mt = Number(mt);
              if (mt <= 45) firstHalfGoals++;
              else if (mt > 45) secondHalfGoals++;
            }
          });
        }
      });
      teams.data[i].goals = goals;
      teams.data[i].firstHalfGoals =
        Math.round((firstHalfGoals / goals) * 100 * 10) / 10;
      teams.data[i].secondHalfGoals =
        Math.round((secondHalfGoals / goals) * 100 * 10) / 10;
    }
    return showHalfs(teams);
  }

  for (let i = 0; i < teams.data.length; i++) {
    let goals = 0;
    let firstHalfGoals = 0;
    let secondHalfGoals = 0;

    results.data.forEach((el) => {
      if (el.teams[value].id === teams.data[i].team.id) {
        el.events.goals.forEach((goal) => {
          if (goal.team.id === teams.data[i].team.id) {
            goals++;
            let mt = goal.matchTime.substring(0, goal.matchTime.indexOf("'"));
            if (mt.includes("+")) mt = mt.substring(0, mt.indexOf("+"));
            mt = Number(mt);
            if (mt <= 45) firstHalfGoals++;
            else if (mt > 45) secondHalfGoals++;
          }
        });
      }
    });

    teams.data[i].goals = goals;
    teams.data[i].firstHalfGoals =
      Math.round((firstHalfGoals / goals) * 100 * 10) / 10;
    teams.data[i].secondHalfGoals =
      Math.round((secondHalfGoals / goals) * 100 * 10) / 10;
  }
  console.log(teams);
  showHalfs(teams);
}
