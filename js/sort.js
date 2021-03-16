function sort(param, col, currentStandings) {
  const currentCol = document.querySelector(`.${col}`);
  const cols = document.querySelectorAll(".th-sort");

  if (
    !currentCol.classList.contains("ascending") &&
    !currentCol.classList.contains("descending")
  ) {
    currentCol.classList.add("ascending");
  } else {
    if (currentCol.classList.contains("ascending")) {
      currentCol.classList.remove("ascending");
      currentCol.classList.add("descending");
    } else if (currentCol.classList.contains("descending")) {
      currentCol.classList.add("ascending");
      currentCol.classList.remove("descending");
    }
  }

  cols.forEach((el) => {
    if (!el.classList.contains(col)) {
      el.classList.remove("ascending");
      el.classList.remove("descending");
    }
  });
  if (currentCol.classList.contains("ascending")) {
    currentStandings.data.sort(function (a, b) {
      return a[col] - b[col];
    });
  } else if (currentCol.classList.contains("descending")) {
    currentStandings.data.sort(function (a, b) {
      return b[col] - a[col];
    });
  }

  const standingsTableTbody = document.querySelector(".standings-table tbody");
  standingsTableTbody.innerHTML = "";
  currentStandings.data.forEach((el) => {
    const tr = document.createElement("tr");
    if (param === "standings") {
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
    } else if (param === "overunder") {
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
    } else if (param === "halfs") {
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
        <td class="goals-percentage" >${el.firstHalfGoals}</td>
        <td class="goals-percentage" >${el.secondHalfGoals}</td>
        `;
    } else if (param === "quarters") {
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
    }

    standingsTableTbody.appendChild(tr);
  });
}
