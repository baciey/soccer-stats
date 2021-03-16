function showQuartersButtons() {
  const div = document.createElement("div");
  div.classList.add("total-home-away");
  div.innerHTML = `
        <button class="total active" onclick="showQuartersTotalHomeAway('total');">Ogółem</button>
        <button class="home" onclick="showQuartersTotalHomeAway('home');">U siebie</button>
        <button class="away" onclick="showQuartersTotalHomeAway('away');">Na wyjeździe</button>
      `;

  const navigation = document.querySelector(".navigation");
  navigation.innerHTML = "";
  navigation.appendChild(div);
  const buttons = document.querySelectorAll(".total-home-away button");
  buttons.forEach((el) => {
    el.addEventListener("click", () => addClasses(buttons, el));
  });
  showQuartersTotalHomeAway("total");
}

function showQuarters(param) {
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
        <th class="quarter1 th-sort">0-15</th>
        <th class="quarter2 th-sort">16-30</th>
        <th class="quarter3 th-sort">31-45</th>
        <th class="quarter4 th-sort">46-60</th>
        <th class="quarter5 th-sort">61-75</th>
        <th class="quarter6 th-sort">76-90</th>
        <th class="goals th-sort">Razem</th>
      `;
  const goals = document.querySelector(".standings-table th.goals");
  goals.addEventListener("click", () =>
    sort("quarters", "goals", currentStandings)
  );
  for (let i = 1; i < 7; i++) {
    document
      .querySelector(".standings-table th.quarter" + i)
      .addEventListener("click", () =>
        sort("quarters", "quarter" + i, currentStandings)
      );
  }

  const standingsTableTbody = document.querySelector(".standings-table tbody");
  standingsTableTbody.innerHTML = "";
  currentStandings.data.forEach((el) => {
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
          <td class="">${el.quarter1}</td>
          <td class="">${el.quarter2}</td>
          <td class="">${el.quarter3}</td>
          <td class="">${el.quarter4}</td>
          <td class="">${el.quarter5}</td>
          <td class="">${el.quarter6}</td>
          <td>${el.goals}</td>
      `;
    standingsTableTbody.appendChild(tr);
  });
}

function showQuartersTotalHomeAway(value) {
  const home = value === "home" ? 0 : 1;
  const away = value === "home" ? 1 : 0;

  const teams = { data: [] };
  teams.data = JSON.parse(JSON.stringify(standings.data));

  if (value === "total") {
    for (let i = 0; i < teams.data.length; i++) {
      let quarter1 = 0;
      let quarter2 = 0;
      let quarter3 = 0;
      let quarter4 = 0;
      let quarter5 = 0;
      let quarter6 = 0;
      let goals = 0;

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
              if (mt <= 15) quarter1++;
              else if (mt <= 30) quarter2++;
              else if (mt <= 45) quarter3++;
              else if (mt <= 60) quarter4++;
              else if (mt <= 75) quarter5++;
              else if (mt > 75) quarter6++;
            }
          });
        }
      });
      teams.data[i].quarter1 = quarter1;
      teams.data[i].quarter2 = quarter2;
      teams.data[i].quarter3 = quarter3;
      teams.data[i].quarter4 = quarter4;
      teams.data[i].quarter5 = quarter5;
      teams.data[i].quarter6 = quarter6;
      teams.data[i].goals = goals;
    }
    return showQuarters(teams);
  }

  for (let i = 0; i < teams.data.length; i++) {
    let quarter1 = 0;
    let quarter2 = 0;
    let quarter3 = 0;
    let quarter4 = 0;
    let quarter5 = 0;
    let quarter6 = 0;
    let goals = 0;

    results.data.forEach((el) => {
      if (el.teams[value].id === teams.data[i].team.id) {
        el.events.goals.forEach((goal) => {
          if (goal.team.id === teams.data[i].team.id) {
            goals++;
            let mt = goal.matchTime.substring(0, goal.matchTime.indexOf("'"));
            if (mt.includes("+")) mt = mt.substring(0, mt.indexOf("+"));
            mt = Number(mt);
            if (mt <= 15) quarter1++;
            else if (mt <= 30) quarter2++;
            else if (mt <= 45) quarter3++;
            else if (mt <= 60) quarter4++;
            else if (mt <= 75) quarter5++;
            else if (mt > 75) quarter6++;
          }
        });
      }
    });

    teams.data[i].quarter1 = quarter1;
    teams.data[i].quarter2 = quarter2;
    teams.data[i].quarter3 = quarter3;
    teams.data[i].quarter4 = quarter4;
    teams.data[i].quarter5 = quarter5;
    teams.data[i].quarter6 = quarter6;
    teams.data[i].goals = goals;
  }
  showQuarters(teams);
}
