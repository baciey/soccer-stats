function showOverUnderButtons() {
  const totalHomeAwayButtons = document.createElement("div");
  totalHomeAwayButtons.classList.add("total-home-away");
  totalHomeAwayButtons.innerHTML = `
    <button value ="total" class="total active" onclick="showOverUnderTotalHomeAway('total', 2.5, false);">Ogółem</button>
    <button value ="home" class="home" onclick="showOverUnderTotalHomeAway('home', 2.5, false);">U siebie</button>
    <button value ="away" class="away" onclick="showOverUnderTotalHomeAway('away', 2.5, false);">Na wyjeździe</button>
  `;

  const navigation = document.querySelector(".navigation");
  navigation.innerHTML = "";
  navigation.appendChild(totalHomeAwayButtons);
  const buttons = document.querySelectorAll(".total-home-away button");
  buttons.forEach((el) => {
    el.addEventListener("click", () => addClasses(buttons, el));
  });

  showOverUnderTotalHomeAway("total", 2.5);
}

function showOverUnderTotalHomeAway(value, number, numberButton) {
  // console.log(value);
  // console.log(number);
  const inactiveButton = document.querySelector(
    ".total-home-away button.inactive"
  );
  if (inactiveButton) {
    inactiveButton.setAttribute(
      "onclick",
      `showOverUnderTotalHomeAway('${inactiveButton.value}', 2.5);`
    );
    inactiveButton.classList.remove("inactive");
  }
  const activeButton = document.querySelector(
    ".total-home-away button." + value
  );
  activeButton.setAttribute("onclick", ";");
  activeButton.classList.add("inactive");

  const teams = { data: [] };
  teams.data = JSON.parse(JSON.stringify(standings.data));
  let name;
  if (value === "total") {
    name = "total";
    for (let i = 0; i < teams.data.length; i++) {
      const gamesOver = [];
      const gamesUnder = [];
      results.data.forEach((el) => {
        if (
          el.teams.home.id === teams.data[i].team.id ||
          el.teams.away.id === teams.data[i].team.id
        ) {
          if (Number(el.score[0] + el.score[1]) > number) gamesOver.push(el);
          if (Number(el.score[0] + el.score[1]) < number) gamesUnder.push(el);
        }
      });
      teams.data[i].over = gamesOver.length;
      teams.data[i].under = gamesUnder.length;
    }
  } else if (value === "home") {
    name = "home";
    for (let i = 0; i < teams.data.length; i++) {
      const gamesOver = [];
      const gamesUnder = [];
      const played = [];

      results.data.forEach((el) => {
        if (el.teams.home.id === teams.data[i].team.id) {
          played.push(el);
          if (Number(el.score[0] + el.score[1]) > number) gamesOver.push(el);
          if (Number(el.score[0] + el.score[1]) < number) gamesUnder.push(el);
        }
      });
      teams.data[i].over = gamesOver.length;
      teams.data[i].under = gamesUnder.length;
      teams.data[i].played = played.length;
    }
  } else if (value === "away") {
    name = "away";
    for (let i = 0; i < teams.data.length; i++) {
      const gamesOver = [];
      const gamesUnder = [];
      const played = [];

      results.data.forEach((el) => {
        if (el.teams.away.id === teams.data[i].team.id) {
          played.push(el);
          if (Number(el.score[0] + el.score[1]) > number) gamesOver.push(el);
          if (Number(el.score[0] + el.score[1]) < number) gamesUnder.push(el);
        }
      });
      teams.data[i].over = gamesOver.length;
      teams.data[i].under = gamesUnder.length;
      teams.data[i].played = played.length;
    }
  }

  function renderButtons() {
    const valueButtons = document.createElement("div");
    valueButtons.classList.add("value-buttons");
    // console.log(typeof value);
    for (let i = 0; i < 7; i++) {
      const button = document.createElement("button");
      button.setAttribute(
        "onclick",
        `showOverUnderTotalHomeAway('${name}',${i + 0.5}, true);`
      );
      button.textContent = i + 0.5;
      if (i === 2) button.classList.add("active");
      valueButtons.appendChild(button);
    }
    const navigation = document.querySelector(".navigation");
    if (navigation.childNodes.length > 1) {
      navigation.removeChild(navigation.childNodes[1]);
    }
    navigation.appendChild(valueButtons);
    const valueButtonsAll = document.querySelectorAll(".value-buttons button");
    valueButtonsAll.forEach((el) => {
      el.addEventListener("click", () => addClasses(valueButtonsAll, el));
    });
  }
  if (!numberButton) renderButtons();

  const standingsTableThead = document.querySelector(".standings-table thead");
  standingsTableThead.innerHTML = `
        <th>#</th>
        <th>Drużyna</th>
        <th class="played th-sort">M</th>
        <th class="over th-sort">Over</th>
        <th class="under th-sort">Under</th>
      `;
  document
    .querySelector(".played")
    .addEventListener("click", () => sort("overunder", "played", teams));
  document
    .querySelector(".over")
    .addEventListener("click", () => sort("overunder", "over", teams));
  document
    .querySelector(".under")
    .addEventListener("click", () => sort("overunder", "under", teams));
  const standingsTableTbody = document.querySelector(".standings-table tbody");
  standingsTableTbody.innerHTML = "";
  teams.data.forEach((el, index) => {
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
                <td>${el.over}</td>
                <td>${el.under}</td>
            `;
    standingsTableTbody.appendChild(tr);
  });
}
