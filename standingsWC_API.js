//Javascript for standings


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
            <h2>Group ${group}</h2>
            <ul>
                ${teams}
            </ul>
        </div>
    `
    }


}

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
    });