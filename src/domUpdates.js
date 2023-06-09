import { displayPrevBookedRooms } from '../src/customerUtils.js'
import { findAvailability, displayAvailableRooms } from '../src/bookingUtils.js'
import { filterByRoomType, calculateBookingCost } from '../src/roomsUtils.js'
import { getAllCustomers, getSingleCustomer, getAllRooms, getAllBookings } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/apiCalls.js'

//Query Selectors

const companyLogoButton = document.querySelector('.company-logo')
const welcomeUser = document.querySelector(".user-welcome")
const logOutButton = document.querySelector(".log-out-button")
const makeAReservationButton = document.querySelector(".registration-button")
const loginContainer = document.querySelector(".login-container")
const userNameInput = document.querySelector(".username-input")
const passwordInput = document.querySelector(".passwork-input")
const loginSubmitButton = document.querySelector(".form-submit")
const dashboardInformationContainer = document.querySelector(".dashboard-information-container")
const totalCostValue = document.querySelector(".total-cost-value")
const dateIn = document.querySelector("#date")
const typeFilter = document.querySelector("#roomType")
const makeReservationContainer = document.querySelector(".make-reservation-container")
const roomsDisplay = document.querySelector(".rooms-display")
const reservationSearchButton = document.querySelector(".reservation-search")
const navRegistrationSection = document.querySelector(".registration-section")
const navHomeSection = document.querySelector(".return-home-section")

// GV

var currentUser;

//Event Listeners

// getSingleCustomer()

const startFetch = () => {
  Promise.all([getAllCustomers(), getSingleCustomer(), getAllRooms(), getAllBookings()]).then((data) => {
    let customerData1 = data[0].customers
    let roomsData1 = data[2].rooms
    let bookingsData1 = data[3].bookings

    reservationSearchButton.addEventListener('click', function() {
      let dateValue = dateIn.value
      let roomTypeValue = typeFilter.value
      let findDate = findAvailability(bookingsData1, dateValue)
      let findRoom = filterByRoomType(roomsData1, roomTypeValue)
      let display = displayAvailableRooms(findDate, findRoom)
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
  <p class="room-number">Room Number: ${arr.number}</p>
  <p class="room-type">Room Type: ${arr.roomType}</p>
  <p class="room-bidet">Bidet: ${arr.bidet}</p>
  <p class="room-bed-size">Bed Size: ${arr.bedSize}</p>
  <p class="room-bed">Number of Beds: ${arr.numBeds}</p>
  <p class="room-cost">Cost Per Night: ${arr.costPerNight}</p>
  <button class="booking-button">Book Now</button>
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
  hideElements(navRegistrationSection)
  showElements(navHomeSection)
}


startFetch()
