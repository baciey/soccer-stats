function showGames(id) {
  const trs = document.querySelectorAll("table.stats-table tbody tr");
  const teams = document.querySelectorAll(".team");
  let scores2 = scores.data.filter((el) => {
    if (el.teams.home.id == id || el.teams.away.id == id) {
      return el;
    }
  });

  const homeGames = Array(20).fill(" - ");
  const awayGames = Array(20).fill(" - ");

  for (let i = 0; i < teams.length; i++) {
    scores2.forEach((el) => {
      if (teams[i].id == el.teams.away.id) {
        if (teams[i].id == id) {
          return (homeGames[i] = `<div class="score disabled"> X</div>`);
        }
        let classes;
        if (el.score[0] > el.score[1]) {
          classes = "win";
        } else if (el.score[0] < el.score[1]) {
          classes = "loose";
        } else if (el.score[0] === el.score[1]) {
          classes = "deuce";
        }
        const score = `<div class='score ${classes}'>
          <span>${el.score[0]}</span> :
          <span>${el.score[1]}</span>
        </div>`;
        homeGames[i] = score;
      }
      if (teams[i].id == el.teams.home.id) {
        if (teams[i].id == id) {
          return (awayGames[i] = `<div class="score disabled">X </div>`);
        }
        let classes;
        if (el.score[0] < el.score[1]) {
          classes = "win";
        } else if (el.score[0] > el.score[1]) {
          classes = "loose";
        } else if (el.score[0] === el.score[1]) {
          classes = "deuce";
        }
        const score = `<div class='score ${classes}'>
          <span>${el.score[0]}</span> :
          <span>${el.score[1]}</span>
        </div>`;
        awayGames[i] = score;
      }
    });
  }

  // console.log(homeGames);
  // console.log(awayGames);
  trs.forEach((tr, index) => {
    const tdHome = document.createElement("td");
    tdHome.innerHTML = homeGames[index];
    const tdAway = document.createElement("td");
    tdAway.innerHTML = awayGames[index];
    tr.appendChild(tdHome);
    tr.appendChild(tdAway);
  });
}

// function showGoals(id) {
//   const trs = document.querySelectorAll("table.stats-table tbody tr");
//   const teams = document.querySelectorAll(".team");
//   let scores2 = scores.data.filter((el) => {
//     if (el.teams.home.id == id || el.teams.away.id == id) {
//       return el;
//     }
//   });

//   const homeGames = Array(20).fill(" - ");
//   const awayGames = Array(20).fill(" - ");

//   for (let i = 0; i < teams.length; i++) {
//     scores2.forEach((el) => {
//       if (teams[i].id == el.teams.away.id) {
//         if (teams[i].id == id) {
//           return (homeGames[i] = ` XXX `);
//         }
//         let classes;
//         if (el.score[0] > el.score[1]) {
//           classes = "win";
//         } else if (el.score[0] < el.score[1]) {
//           classes = "loose";
//         } else if (el.score[0] === el.score[1]) {
//           classes = "deuce";
//         }
//         const score = `<div class='score ${classes}'>
//           <span>${el.score[0]}</span>:
//           <span>${el.score[1]}</span>
//         </div>`;
//         homeGames[i] = score;
//       }
//       if (teams[i].id == el.teams.home.id) {
//         if (teams[i].id == id) {
//           return (awayGames[i] = ` XXX `);
//         }
//         let classes;
//         if (el.score[0] < el.score[1]) {
//           classes = "win";
//         } else if (el.score[0] > el.score[1]) {
//           classes = "loose";
//         } else if (el.score[0] === el.score[1]) {
//           classes = "deuce";
//         }
//         const score = `<div class="${"score " + classes}"><span>${
//           el.score[0]
//         }</span>:<span>${el.score[1]}</span></div>`;
//         awayGames[i] = score;
//       }
//     });
//   }

//   // console.log(homeGames);
//   // console.log(awayGames);
//   trs.forEach((tr, index) => {
//     const tdHome = document.createElement("td");
//     tdHome.innerHTML = homeGames[index];
//     const tdAway = document.createElement("td");
//     tdAway.innerHTML = awayGames[index];
//     tr.appendChild(tdHome);
//     tr.appendChild(tdAway);
//   });
// }
