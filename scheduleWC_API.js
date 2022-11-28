//Javascript for schedule

// Copyright <2022> <wsminelli on Github>
//https://github.com/wsminelli/rocketseat-nlw-copa-2022/blob/main/js/calendario.js

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
//associated documentation files (the "Software"), to deal in the Software without restriction, including without
// limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//Under MIT licensing I've grabbed parsing functions from this data interpreter. I'm using them to parse data from am open source world cup API
//so that the website can update scheduling and scores dynamically. Changes include adding checks and parsing for scores if games have already been
//played, or are currently being played.

//As of November 28th 2:51 AM EST



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

function createGame(player1, stadium, hour, player2, stage, status) {
    if (status == "scheduled") {
        return `
        <li class = "${stage.toLowerCase()}">
            <figure>    
                <img src="images/icon-${player1.name?.toLowerCase()}.png" alt="icon for ${player1.name?.toLowerCase()}">
            </figure>
            <div class="info">
                <span>${stadium}<br></span>
                <strong>${hour}</strong>
            </div>
            <figure> 
                <img src="images/icon-${player2.name?.toLowerCase()}.png" alt="icon for ${player2.name?.toLowerCase()}">
            </figure>
        </li>
        `
    }
    else if (status == "in_progress") {
        return `
        <li class = "${stage.toLowerCase()}">
            <h4 style="color:black">${player1.goals.toString()}</h4>
            <figure>    
                <img src="images/icon-${player1.name?.toLowerCase()}.png" alt="icon for ${player1.name?.toLowerCase()}">
            </figure>
            <div class="info">
                <h4 style = "color: hsl(342, 74%, 31%)">LIVE<br></h4>
            </div>
            <figure> 
                <img src="images/icon-${player2.name?.toLowerCase()}.png" alt="icon for ${player2.name?.toLowerCase()}">
            </figure>
            <h4 style="color:black">${player2.goals.toString()}</h4>
        </li>
        `
    }

    else {
        return `
        <li class = "${stage.toLowerCase()}">
            <h4 style="color:black">${player1.goals.toString()}</h4>
            <figure>    
                <img src="images/icon-${player1.name?.toLowerCase()}.png" alt="icon for ${player1.name?.toLowerCase()}">
            </figure>
            <div class="info">
                <h4 style = "color: black">FT<br></h4>
            </div>
            <figure> 
                <img src="images/icon-${player2.name?.toLowerCase()}.png" alt="icon for ${player2.name?.toLowerCase()}">
            </figure>
            <h4 style="color:black">${player2.goals.toString()}</h4>
        </li>
        `
    }

}

function createCard(date, day, games) {

    if (games == "") {
        ""
    } else {
        return `
        <div class="card">
            <h2>${date}<span>${day}</span></h2>
            <ul>
                ${games}
            </ul>
        </div>
    `
    }


}

fetch('https://copa22.medeiro.tech/matches')
    .then(res => res.json())
    .then(data => {
        const gamesGroupedByDate = {}
        data.forEach(game => {
            const dayOfGame = getDayOfGame(game.date)

            if (!gamesGroupedByDate[dayOfGame]) {
                gamesGroupedByDate[dayOfGame] = []
            }

            gamesGroupedByDate[dayOfGame].push(game)
        });

        const cards = []

        console.log(Object.entries(gamesGroupedByDate));

        Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
            const weekDay = getWeekDayOfGame(date)
            const gamesOfDay = games.map((game) => {
                const hour = getHourDate(game.date)
                return createGame(game.homeTeam, game.venue, hour, game.awayTeam, game.stageName, game.status, game.time)

            })
            const card = createCard(date, weekDay, gamesOfDay.join(''))
            cards.push(card)
        })
        document.querySelector(".schedule-layout_flex").innerHTML =
            cards.join('')

        Object.entries(gamesGroupedByDate).forEach(([date, games]) => {
            const weekDay = getWeekDayOfGame(date)
            const gamesOfDay = games.map((game) => {
                const hour = getHourDate(game.date)
                return 0;
            })
        })
    });