//Javascript for standings


//TODO: write this function to create the groups in order based on points instead of a list of games based on time
//need to use the groups endpoint I believe

function getDayOfGame(date) {
    const rawDate = new Date(date)
    const day = rawDate.getDate()
    const month = rawDate.getMonth()
    const parsedDay = day.toString().padStart(2, '0')
    const parsedMonth = (month + 1).toString().padStart(2, '0')

    return `${parsedDay}/${parsedMonth}`
}

function getWeekDayOfGame(date) {
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thurdsay',
        'Friday',
        'Saturday',
    ]

    const rawDate = new Date(`2022-${date.split("/").reverse().join("-")} 12:00:00`)
    const day = weekDays[rawDate.getDay()]

    return day
}

function getHourDate(date) {
    const rawDate = new Date(date)

    return `${rawDate.getHours().toString().padStart(2, "0")}:00`
}

function createTeam(team) {
    if (team) {
        return `
        <li>
            <h4 style="color:black">${team.position}</h4>
            <figure>    
                <img src="images/icon-${team.alternateName?.toLowerCase()}.png" alt="icon for ${team.alternateName?.toLowerCase()}">
            </figure>

            <h4 style="color:black"> Points: ${team.points}</h4>
        </li>
        `
    }
    else {
       ""
    }

}

function createCard(group, teams) {

    if (teams == "") {
        ""
    } 
    
    else {
        return `
        <div class="card">
            <h2>${group}</h2>
            <ul>
                ${teams}
            </ul>
        </div>
    `
    }


}

// fetch('https://copa22.medeiro.tech/matches')
//     .then(res => res.json())
//     .then(data => {
//         const gamesGroupedByDate = {}
//         data.forEach(game => {
//             const dayOfGame = getDayOfGame(game.date)

//             if (!gamesGroupedByDate[dayOfGame]) {
//                 gamesGroupedByDate[dayOfGame] = []
//             }

//             gamesGroupedByDate[dayOfGame].push(game)
//         });

//         const cards = []
//         Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
//             const weekDay = getWeekDayOfGame(date)
//             const gamesOfDay = games.map((game) => {
//                 const hour = getHourDate(game.date)
//                 return createGame(game.homeTeam, game.venue, hour, game.awayTeam, game.stageName, game.status, game.time)

//             })
//             const card = createCard(date, weekDay, gamesOfDay.join(''))
//             cards.push(card)
//         })
//         document.querySelector(".standings-layout_flex").innerHTML =
//             cards.join('')

//         Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
//             const weekDay = getWeekDayOfGame(date)
//             const gamesOfDay = games.map((game) => {
//                 const hour = getHourDate(game.date)
//                 return 0;
//             })
//         })
//     });

    fetch('https://copa22.medeiro.tech/groups')
    .then(res => res.json())
    .then(data => {
        const teamsGroupedByCode = {}
        data.forEach(group => {
            const groupTeams = group.teams;
            const groupCode = group.code;

            groupTeams.forEach(teamsInGroup => {
             if (!teamsGroupedByCode[groupCode]) {
                 teamsGroupedByCode[groupCode] = []
             }

             teamsGroupedByCode[groupCode].push(teamsInGroup);
            });
        });

        console.log(teamsGroupedByCode);

          const cards = []
          console.log(Object.entries(teamsGroupedByCode));
          Object.entries(teamsGroupedByCode).forEach(([group, teams]) => {
               const teamsInGroup = teams.map((team) => {
                   return createTeam(team);
               })
              const card = createCard(group, teamsInGroup.join(''))
              cards.push(card)
          })
         document.querySelector(".standings-layout_flex").innerHTML =
             cards.join('')

        //  Object.entries(teamsGroupedByCode).forEach(([date, games]) => {
        //      const weekDay = getWeekDayOfGame(date)
        //      const gamesOfDay = games.map((game) => {
        //          const hour = getHourDate(game.date)
        //          return 0;
        //      })
        //  })
    });