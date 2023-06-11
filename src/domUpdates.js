import { displayPrevBookedRooms, findValidIDNumber } from '../src/customerUtils.js'
import { findAvailability, displayAvailableRooms } from '../src/bookingUtils.js'
import { filterByRoomType, calculateBookingCost } from '../src/roomsUtils.js'
import { getAllCustomers, getSingleCustomer, getAllRooms, getAllBookings, addPostBooking } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/apiCalls.js'

//Query Selectors

const companyLogoButton = document.querySelector('.company-logo')
const navigationBar = document.querySelector(".navbar")
const welcomeUser = document.querySelector(".user-welcome")
const welcomeName = document.querySelector(".welcome-name")
const logOutButton = document.querySelector(".log-out-button")
const loginForm = document.querySelector(".login-page")
const makeAReservationButton = document.querySelector(".registration-button")
const loginContainer = document.querySelector(".login-container")
const userNameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const loginSubmitButton = document.querySelector(".form-submit")
const dashboardInformationContainer = document.querySelector(".dashboard-information-container")
const dashboardPrevBookings = document.querySelector(".scheduled-bookings-container")
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
  showElements(navigationBar)
  showElements(makeReservationContainer)
  hideElements(loginContainer)
  hideElements(dashboardInformationContainer)
}

const homeElements = () => {
  showElements(welcomeUser)
  hideElements(navHomeSection)
  showElements(navigationBar)
  hideElements(makeReservationContainer)
  showElements(dashboardInformationContainer)
  hideElements(loginContainer)
}

companyLogoButton.addEventListener('click', homeElements)

const loginElements = () => {
  hideElements(navigationBar)
  showElements(loginContainer)
  showElements(loginForm)
  hideElements(makeReservationContainer)
  hideElements(dashboardInformationContainer)
  userNameInput.value = ''
  passwordInput.value = ''
}

const startFetch = () => {
  let bookingsData1;
  Promise.all([getAllCustomers(), getSingleCustomer(), getAllRooms(), getAllBookings()]).then((data) => {
    let customerData1 = data[0].customers
    let roomsData1 = data[2].rooms
    bookingsData1 = data[3].bookings

    reservationSearchButton.addEventListener('click', function () {
      let dateValue1 = dateIn.value
      let roomTypeValue = typeFilter.value
      let display = findAvailability(roomsData1, bookingsData1, dateValue1)
      let findRoom = filterByRoomType(roomsData1, roomTypeValue)
      // let display = displayAvailableRooms(findDate, findRoom)

      showAvailableRooms(display)
      reservationElements()
    })


    loginSubmitButton.addEventListener('click', function () {
      event.preventDefault()
      let usernameValue = userNameInput.value;
      let passwordValue = passwordInput.value;
      let passwordUniversal = 'hi'
      let find = findValidIDNumber(customerData1, usernameValue)
      if (((find === undefined && passwordValue === passwordUniversal) || (find !== undefined && passwordValue !== passwordUniversal) || (passwordValue === ''))) {
        loginForm.innerHTML = `<img class="login-logo" src="./images/login-clementine-logo.png">
        <label class="username">Username</label>
        <input class ="username-input" type="text" id="username" tabindex="0" placeholder="Enter Username" name="uname" required>
        <label class="password">Password</label>
        <input class="password-input" type="password" id="password" tabindex="0" placeholder="Enter Password" name="psw" required>
        <button class ="form-submit" tabindex="0">Login</button>
        <p class="username-password-error">Please Enter a Valid Username or Password</p>`
      } else {
        currentUser = find
        homeElements()
        let prevBooked = displayPrevBookedRooms(currentUser, bookingsData1)
        showPrevBookedRooms(prevBooked)
        welcomeName.innerText = `Hello ${currentUser.name}`
      }
    })

    roomsDisplay.addEventListener('click', function (event) {
      if (event.target.classList.contains('booking-button')) {
        let bookedRoomNumber = parseInt(event.target.parentElement.firstElementChild.id)
        let bookedRoomDate = dateIn.value.split('-').join('/')
        let bookingObject = {
          date: bookedRoomDate,
          number: bookedRoomNumber
        }
        addPostBooking(bookingObject, currentUser).then(() => {
          getAllBookings().then((data) => {
            bookingsData1 = data.bookings
            updateDisplayFunctions()
          })
        })
        confetti()
      }
    })

    const updateDisplayFunctions = () => {
      let dateValue2 = dateIn.value
      let roomTypeValue2 = typeFilter.value
      let display = findAvailability(roomsData1, bookingsData1, dateValue2)
      let findRoom2 = filterByRoomType(roomsData1, roomTypeValue2)

      showAvailableRooms(display)
      reservationElements()

    }
  })
}


makeAReservationButton.addEventListener('click', reservationElements)
navHomeSection.addEventListener('click', homeElements)
logOutButton.addEventListener('click', loginElements)

const showPrevBookedRooms = (array) => {
  dashboardPrevBookings.innerHTML = ''
  array.forEach(arr => dashboardPrevBookings.innerHTML += `
    <div class = "prev-booking-info">
      <img class="reserved-logo" src='./images/reserved.png'>
      <p class="room-number">Room Number: ${arr.roomNumber}</p>
      <p class="room-date">Booking Date: ${arr.date}</p>
    </div>
  </div>`)
}

const showAvailableRooms = (array) => {
  roomsDisplay.innerHTML = ''
  array.forEach(arr => roomsDisplay.innerHTML += `
<div class="date-room-display" tabindex="0" id="${arr.number}">
<div class = "room-info">
  <p class="room-number" id="${arr.number}">Room Number: ${arr.number}</p>
  <p class="room-type">Room Type: ${arr.roomType}</p>
  <p class="room-bidet">Bidet: ${arr.bidet}</p>
  <p class="room-bed-size">Bed Size: ${arr.bedSize}</p>
  <p class="room-bed">Number of Beds: ${arr.numBeds}</p>
  <p class="room-cost">Cost Per Night: ${arr.costPerNight}</p>
  <button class="booking-button">Book Now</button>
</div>
</div>`)
}

startFetch()