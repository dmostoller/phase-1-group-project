//const apiKey = process.env.API_KEY
const apiKey = "93f5cc80-f6d0-4f03-a4c7-fce468ed501d"
//fetch("https://www.jambase.com/jb-api/v1/events?apikey=93f5cc80-f6d0-4f03-a4c7-fce468ed501d")
//    .then((resp) => resp.json())
//    .then((data) => console.log(data))
fetch('http://localhost:3000/featured-events')
.then((resp) => resp.json())
.then((data) => renderFeatured(data))

function renderFeatured(featuredEventsArray) {
//featuredEventsArray is an array of objects
// designate where they will go
const featuredContainer = document.querySelector("#featured-events")
featuredEventsArray.forEach((featuredObj) => {
    const featuredDiv = document.createElement('div')
    featuredDiv.className = "featured-card"
    featuredContainer.appendChild(featuredDiv)
    const featuredName = document.createElement('h3')
    const featuredImg = document.createElement('img')
    featuredImg.className = 'featured-img'
    const featuredDate = document.createElement('p')
    const featuredVenue = document.createElement('p')
    const bookmark = document.createElement('img')

    featuredName.textContent = featuredObj.name
    featuredImg.src = featuredObj.image
    featuredDate.textContent = featuredObj.date
    featuredVenue.textContent = featuredObj.venue
    bookmark.className = 'bookmark'
    bookmark.src = "./assets/bookmark_empty.png"

    featuredDiv.appendChild(featuredImg)
    featuredDiv.appendChild(featuredName)
    featuredDiv.appendChild(featuredVenue)
    featuredDiv.appendChild(featuredDate)
    featuredDiv.appendChild(bookmark)
})

}

function fetchStateEvents(stateId, apiKey) {
    fetch(`https://www.jambase.com/jb-api/v1/events?geoStateIso=${stateId}&apikey=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) => renderEventList(data))

    function renderEventList(eventArray){
        //console.log(eventArray)
        const eventsList = document.querySelector("#event-container")
        eventArray.events.forEach((eventObj) => {
        const eventCard = document.createElement('div')
        eventCard.className = 'event-card'
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
        const saveEvent = document.createElement('div')
        saveEvent.className = 'save-event'
        const bookmark = document.createElement('img')
        bookmark.src = "./assets/bookmark_empty.png"
        bookmark.className = 'bookmark'
        saveEvent.appendChild(bookmark)
        eventDetailsDiv.appendChild(saveEvent)
        

         //create eventlistener and function to change bookmark color on mouseover
        //eventCard.addEventListener('mouseover', () => {
            //bookmark.src = "./assets/bookmark_full.png";
        //});
        //create eventlistener and function to change bookmark color on click
        eventCard.addEventListener('click', () => {
            if (bookmark.src.includes("./assets/bookmark_empty.png")) {
                bookmark.src = "./assets/bookmark_full.png";
            } else {
                bookmark.src = "./assets/bookmark_empty.png";
            }
        });
        eventsList.appendChild(eventCard)
        //make it so that the previous city selection gets cleared before creating new list
        })
    }    
}

const form = document.querySelector('#search-form')
form.addEventListener('submit', (e) => displayEvents(e))
function displayEvents(e) {
    e.preventDefault()
    const stateId = e.target['state-list'].value
    //console.log(stateId)
    document.querySelectorAll('.event-card').forEach(e => e.remove());
    fetchStateEvents(stateId, apiKey)
    hideBanner()
    hideFeatured()
}


// function for hiding and showing banner
function hideBanner() {
    const bannerDiv = document.querySelector('#concert-banner')
        if (bannerDiv.style.display === "none") {
            bannerDiv.style.display = "block";
        } else {
            bannerDiv.style.display = "none";
        }
    } 
function hideFeatured() {
    const featured = document.querySelector('#featured-events')
        if (featured.style.display === "none") {
            featured.style.display = "block";
        } else {
            featured.style.display = "none";
        }

}