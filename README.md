# phase-1-group-project
Show Finder:
    - allows you to browse concerts from the jambase API and have your own local saved events page so you can access them anytime.
    - simple, slick interface without all the noise you get from sites like jambase or ticketmaster
    - pulls events by state from jambase api
    - allows you to save shows to the page by populating a json database
    - the main concept and MVPs were created as a group as well as the core functionality of 
    fetching and displaying the list of events from the api
    - David was the project leader and made sure all the bits of code worked together, did the css work, the saved events page and the functions to hide and show the various divs. and the change event listener that loads the events list by changing a select dropdown, and the fetch POST request that adds a new record to the db.json
    - Parker contributed the code for the "featured-events" section on the main page which populates three event cards on the main page with the first three entries in the db.json
    - Ikram contributed the event listeners & callback functions for the mouseover/mouseout and click events, and the fetch DELETE request that deletes a record from the db.json

Challenges: 
    - getting and parsing the data from the API and figuring out how we could easily request just some of the data - we opted for doing it by state to avoid having to parse a lot of text
    - making the event cards look right by creating the DOM elements correctly
    - getting the dom to refresh before loading new content into it
    
Future extensions:
    - expand to include multiple APIs so people could search all the major ticket and event comapnies (stub hub, ticketmaster, bandsintown, etc) at once
    - make it so that people can type anything into a search bar, this way people could write "Princeton, NJ" or "the Bay area" or "New England" or "Beyonce" all would return results 
    - filters for distance, date etc
    - ability to sort and organize the saved events page 
    - ability to search for specific saved events
    - combining the functions that build and display the events and saved events views to eliminate redundant code by passing in the necesary variables


Created by Ikram, Parker and Dave for the Phase 1 Group Project for the Flatiron School Software Engineering Bootcamp in January 2024.