//const apiKey = process.env.API_KEY
const apiKey = "93f5cc80-f6d0-4f03-a4c7-fce468ed501d"
//fetch("https://www.jambase.com/jb-api/v1/events?apikey=93f5cc80-f6d0-4f03-a4c7-fce468ed501d")
//    .then((resp) => resp.json())
//    .then((data) => console.log(data))

function fetchStateEvents(stateId, apiKey) {
    fetch(`https://www.jambase.com/jb-api/v1/events?geoStateIso=${stateId}&apikey=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) => renderEventList(data))

    function renderEventList(eventArray){
        console.log(eventArray)
        const eventsList = document.querySelector("#event-container")
        //figure out how to delete existing list from the DOM so we can show the new results
        eventArray.events.forEach((eventObj) => {
        const eventCard = document.createElement('div')
        const imageThumbDiv = document.createElement('div')
        eventCard.appendChild(imageThumbDiv)
        const img = document.createElement('img')
        img.src = eventObj.image
        img.className = 'image'
        imageThumbDiv.className = 'event-thumb'
        imageThumbDiv.appendChild(img)
        const eventDetailsDiv = document.createElement('div')
        eventCard.appendChild(eventDetailsDiv)
        eventDetailsDiv.className = 'event-details'
        const title = document.createElement('h3') 
        title.textContent = eventObj.name
        eventDetailsDiv.appendChild(title)
        const date = document.createElement('p') 
        date.textContent = eventObj.startDate
        eventDetailsDiv.appendChild(date)
        const venue = document.createElement('p') 
        venue.textContent = eventObj.location.name
        eventDetailsDiv.appendChild(venue)  
        //create and append the bookmark graphic
        //create eventlistener and function to change bookmark color on mouseover
        //create eventlistener and function to change bookmark color on click
        eventsList.appendChild(eventCard)
        })
    }    
}

const form = document.querySelector('#state-form')
form.addEventListener('submit', (e) => displayEvents(e))
function displayEvents(e) {
    e.preventDefault()
    const stateId = e.target['state-list'].value
    console.log(stateId)
    fetchStateEvents(stateId, apiKey)
}

// function fetchEvent(eventId, apiKey) {
//     fetch(`https://www.jambase.com/jb-api/v1/events/id/jambase:${eventId}?apikey=${apiKey}`)
//     .then((resp) => resp.json())
//     .then((data) => renderEvent(data))
// }

// eventId = "11091519"
// fetchEvent(eventId, apiKey)
