import { displayPrevBookedRooms } from '../src/customerUtils.js'
import { findAvailability, displayAvailableRooms } from '../src/bookingUtils.js'
import { filterByRoomType, calculateBookingCost } from '../src/roomsUtils.js'
import { getAllCustomers, getSingleCustomer, getAllRooms, getAllBookings } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/apiCalls.js'

//Query Selectors

const companyLogoButton = document.querySelector('.company-logo')
const welcomeUser = document.querySelector(".welcome-name")
const welcomeDashBoard = document.querySelector(".welcome")
const welcomeLogo = document.querySelector(".welcome-logo")
const logOutButton = document.querySelector(".log-out-button")
const makeAReservationButton = document.querySelector(".registration-button")
const loginContainer = document.querySelector(".login-container")
const userNameInput = document.querySelector(".username-input")
const passwordInput = document.querySelector(".passwork-input")
const loginSubmitButton = document.querySelector(".form-submit")
const dashboardInformationContainer = document.querySelector(".dashboard-information-container")
const totalCostValue = document.querySelector(".total-cost-value")
const dateIn = document.querySelector("#date")
const typeFilter = document.querySelector(".type-filter")
const makeReservationContainer = document.querySelector(".make-reservation-container")
const roomsDisplay = document.querySelector(".rooms-display")
const reservationSearchButton = document.querySelector(".reservation-search")
const reservationSearchContainer = document.querySelector(".reservation-search")
// GV

var currentUser;

//Event Listeners

const startFetch = () => {
  Promise.all([getAllCustomers(), getSingleCustomer(), getAllRooms(), getAllBookings()]).then((data) => {
    let customerData1 = data[0].customers
    let roomsData1 = data[2].rooms
    let bookingsData1 = data[3].bookings

    reservationSearchButton.addEventListener('click', function() {
      let dateValue = date.value
      let find = findAvailability(bookingsData1, dateValue)
      let display = displayAvailableRooms(find, roomsData1)
      showAvailableRooms(display)
      reservationElements()
    })

})
  }

  const showAvailableRooms = (array) => {
    roomsDisplay.innerHTML = ''
    array.forEach(arr => roomsDisplay.innerHTML += `
<div class="date-room-display" tabindex="0" id="${arr.number}">
<div class = "room-info">
  <h3>Room Number:</h3>
  <p class="room-number">${arr.number}</p>
  <h3>Room Type:</h3>
  <p class="room-type">${arr.roomType}</p>
  <h3>Bidet:</h3>
  <p class="room-bidet">${arr.bidet}</p>
  <h3>Bed Size:</h3>
  <p class="room-type">${arr.bedSize}</p>
  <h3>Number of Beds:</h3>
  <p class="room-type">${arr.numBeds}</p>
  <h3>Cost Per Night:</h3>
  <p class="room-type">${arr.costPerNight}</p>
</div>
</div>`)
}

const hideElements = (element) => {
 element.setAttribute("hidden", "")
}

const showElements = (element) => {
  element.removeAttribute("hidden")
}

const reservationElements = () => {
  hideElements(welcomeUser)
  hideElements(welcomeDashBoard)
  hideElements(welcomeLogo)
}


startFetch()
