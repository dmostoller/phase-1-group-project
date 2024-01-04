//const apiKey = process.env.API_KEY
const apiKey = "93f5cc80-f6d0-4f03-a4c7-fce468ed501d"

//render featured events section
fetch('http://localhost:3000/saved-events')
.then((resp) => resp.json())
.then((data) => renderFeatured(data))

function renderFeatured(featuredEventsArray) {
const featuredContainer = document.querySelector("#featured-events")
featuredEventsArray.forEach((featuredObj) => {
        //console.log(featuredObj)
        const featuredDiv = document.createElement('div')
        featuredDiv.className = "featured-card"
        const featuredName = document.createElement('h3')
        const featuredImg = document.createElement('img')
        featuredImg.className = 'featured-img'
        const featuredDate = document.createElement('p')
        const featuredVenue = document.createElement('p')
        const bookmark = document.createElement('img')
        const nameUrl = document.createElement('a')
        const venueUrl = document.createElement('a')
        nameUrl.href = featuredObj.url
        nameUrl.target = "_blank"
        nameUrl.textContent = featuredObj.name
        venueUrl.target = "_blank"
        venueUrl.href = featuredObj.venueurl
        venueUrl.textContent = featuredObj.venue
        featuredImg.src = featuredObj.image
        featuredDate.textContent = featuredObj.date
        //stop forEach loop after 3 entries
        if (featuredObj.id > 3){
            return;
        }
        featuredContainer.appendChild(featuredDiv)
        featuredName.appendChild(nameUrl)
        featuredVenue.appendChild(venueUrl)
        featuredDiv.appendChild(featuredImg)
        featuredDiv.appendChild(featuredName)
        featuredDiv.appendChild(featuredVenue)
        featuredDiv.appendChild(featuredDate)


    })
}
//show state view on dropdown menu change
const dropDown = document.querySelector('#state-list')
dropDown.addEventListener('change', (e) => displayEvents(e))
function displayEvents(e) {
    e.preventDefault()
    const stateId = e.target.value
    //console.log(stateId)
    document.querySelectorAll('.event-card').forEach(e => e.remove());
    fetchStateEvents(stateId, apiKey)
    hideBanner()
    hideFeatured()
    hideSavedEvents()
    showHome()
    showStateView()
}

//render list of events by state view
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
            const titleUrl = document.createElement('a')
            titleUrl.href = eventObj.url
            titleUrl.target = "_blank"
            titleUrl.textContent = eventObj.name
            title.appendChild(titleUrl)
            eventDetailsDiv.appendChild(title)
            const date = document.createElement('p')
            date.textContent = eventObj.startDate
            eventDetailsDiv.appendChild(date)
            const venue = document.createElement('p')
            const venueUrl = document.createElement('a')
            venueUrl.target = "_blank"
            venueUrl.href = eventObj.location.url
            venueUrl.textContent = eventObj.location.name
            venue.appendChild(venueUrl)
            eventDetailsDiv.appendChild(venue)
            const saveEvent = document.createElement('div')
            saveEvent.className = 'save-event'
            const bookmark = document.createElement('img')
            bookmark.src = "./assets/bookmark_empty.png"
            bookmark.className = 'bookmark'
            saveEvent.appendChild(bookmark)
            eventDetailsDiv.appendChild(saveEvent) 
            eventsList.appendChild(eventCard)   
    //bookmark change color 
            bookmark.addEventListener('mouseover', function() {
                bookmark.src= "./assets/bookmark_full.png"
                })
            bookmark.addEventListener('mouseout', function() {
                bookmark.src= "./assets/bookmark_empty.png"
                })
    //save event on bookmark click
            bookmark.addEventListener('click', (e) => handleSaveEvent(e))
            function handleSaveEvent(e) {
                e.preventDefault()
                let newSavedEvent = {
                    name: eventObj.name,
                    date: eventObj.startDate,
                    url: eventObj.url,
                    image: eventObj.image,
                    venue: eventObj.location.name,
                    venueurl: eventObj.location.url,
                }
                fetch('http://localhost:3000/saved-events', {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(newSavedEvent)
                })
                renderSavedEvents()
            }   
        })
    }    
}



//function for loading saved events view from db.json
//function renderSavedEvents
    function renderSavedEvents() {
        fetch('http://localhost:3000/saved-events')
        .then((resp) => resp.json())
        .then((data) => renderSaved(data))
    }
    function renderSaved(savedEventsArray) {
        const savedEventsList = document.querySelector("#saved-events")
        savedEventsArray.forEach((savedEventObj) => {
            //console.log(savedEventObj)
            const eventCard = document.createElement('div')
            eventCard.className = 'event-card'
            const imageThumbDiv = document.createElement('div')
            eventCard.appendChild(imageThumbDiv)
            const img = document.createElement('img')
            img.src = savedEventObj.image
            img.className = 'image'
            imageThumbDiv.className = 'event-thumb'
            imageThumbDiv.appendChild(img)
            const eventDetailsDiv = document.createElement('div')
            eventCard.appendChild(eventDetailsDiv)
            eventDetailsDiv.className = 'event-details'
            const title = document.createElement('h3') 
            const titleUrl = document.createElement('a')
            titleUrl.href = savedEventObj.url
            titleUrl.target = "_blank"
            titleUrl.textContent = savedEventObj.name
            title.appendChild(titleUrl)
            eventDetailsDiv.appendChild(title)
            const date = document.createElement('p')
            date.textContent = savedEventObj.date
            eventDetailsDiv.appendChild(date)
            const venue = document.createElement('p')
            const venueUrl = document.createElement('a')
            venueUrl.target = "_blank"
            venueUrl.href = savedEventObj.venueurl
            venueUrl.textContent = savedEventObj.venue
            venue.appendChild(venueUrl)
            eventDetailsDiv.appendChild(venue)
            const deleteEvent = document.createElement('div')
            deleteEvent.className = 'delete-event'
            const trashCan = document.createElement('img')
            trashCan.src = "./assets/trash-can-white.png"
            trashCan.className = 'bookmark'
            deleteEvent.appendChild(trashCan)
            eventDetailsDiv.appendChild(deleteEvent) 
            savedEventsList.appendChild(eventCard)

            //change color of trashcan
            trashCan.addEventListener('mouseover', function() {
                trashCan.src= "./assets/trash-can-grey.png"
            })
            trashCan.addEventListener('mouseout', function() {
                trashCan.src= "./assets/trash-can-white.png"
            })
//////////////add eventlistener for click with callback function to delete the saved event

//////////////create function that does a fetch delete to remove the saved event from db.json

        })
            hideStateView()
            hideFeatured()
            hideBanner()
            showHome()
            showSavedEvents()
    }

// function for hiding and showing banner
function hideBanner() {
    const bannerDiv = document.querySelector('#concert-banner')
    bannerDiv.style.display = "none"
    } 
function hideFeatured() {
    const featured = document.querySelector('#featured-events')
    featured.style.display = "none"
    }
function hideStateView() {
    const stateView = document.querySelector('#event-container')
    stateView.style.display = "none"
    }
function showStateView() {
    const stateView = document.querySelector('#event-container')
    stateView.style.display = "block"
    }
function hideSavedEvents() {
    const savedEventsView = document.querySelector('#saved-events')
    savedEventsView.style.display = "none" 
}    
function showSavedEvents() {
    const savedEventsView = document.querySelector('#saved-events')
    savedEventsView.style.display = "block" 
}
//change banner image on mouseover
const bannerImage = document.querySelector('.banner-image')
bannerImage.addEventListener('mouseover', function() {
    bannerImage.src = "./assets/concert-2.jpg"
    })
bannerImage.addEventListener('mouseout', function() {
    bannerImage.src = "./assets/concert-1.jpg"
    })
//change home icon states
const homeIcon = document.querySelector('#home-icon')
function showHome() {
    homeIcon.style.display = "block"
    }
homeIcon.addEventListener('mouseover', function() {
    homeIcon.src= "./assets/home-hover.png"
    })
homeIcon.addEventListener('mouseout', function() {
    homeIcon.src= "./assets/home.png"
    })
//change saved icon states
const savedIcon = document.querySelector('#saved-icon')
savedIcon.addEventListener('mouseover', function() {
    savedIcon.src= "./assets/bookmark-small-grey.png"
    })
savedIcon.addEventListener('mouseout', function() {
    savedIcon.src= "./assets/bookmark-small-blk.png"
    })
//navigate to saved events page on click
savedIcon.addEventListener('click', (e) => renderSavedEvents(e))


