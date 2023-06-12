import { displayPrevBookedRooms, findValidIDNumber, calculateBookingCost} from '../src/customerUtils.js'
import { findAvailability } from '../src/bookingUtils.js'
import { filterByRoomType } from '../src/roomsUtils.js'
import { getAllCustomers, getAllRooms, getAllBookings, addPostBooking } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/apiCalls.js'

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
const apologyMessage = document.querySelector(".apology-message")

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
  showElements(navRegistrationSection)
  hideElements(makeReservationContainer)
  showElements(dashboardInformationContainer)
  hideElements(loginContainer)
}

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
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings()]).then((data) => {
    let customerData1 = data[0].customers
    let roomsData1 = data[1].rooms
    bookingsData1 = data[2].bookings

    reservationSearchButton.addEventListener('click', function () {
      let dateValue1 = dateIn.value
      let roomTypeValue = typeFilter.value
      let display = findAvailability(roomsData1, bookingsData1, dateValue1)
      let findRoom = filterByRoomType(display, roomTypeValue)
      if (findRoom.length !== 0) {
        hideElements(apologyMessage)
      } else {
        showElements(apologyMessage)
      }
      showAvailableRooms(findRoom)
      reservationElements()
    })

    loginSubmitButton.addEventListener('click', function(event) {
      event.preventDefault()
      let usernameValue = userNameInput.value;
      let passwordValue = passwordInput.value;
      let passwordUniversal = 'overlook2021'
      let find = findValidIDNumber(customerData1, usernameValue)
      if (((find === undefined && passwordValue === passwordUniversal) || (find !== undefined && passwordValue !== passwordUniversal) || (passwordValue === ''))) {
        loginForm.innerHTML = `<img class="login-logo" src="./images/login-clementine-logo.png">
        <label class="username">Username</label>
        <input class ="username-input" tabindex='0' type="text" id="username" tabindex="0" placeholder="Enter Username" name="uname" required>
        <label class="password">Password</label>
        <input class="password-input" tabindex='0' type="password" id="password" tabindex="0" placeholder="Enter Password" name="psw" required>
        <button class ="form-submit" tabindex="0">Login</button>
        <p class="username-password-error">Please Enter a Valid Username or Password</p>`
      } else {
        currentUser = find
        homeElements()
        let prevBooked = displayPrevBookedRooms(currentUser, bookingsData1)
        let totalCost = calculateBookingCost(prevBooked, roomsData1)
        showUserTotalCost(totalCost)
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
      let findRoom2 = filterByRoomType(display, roomTypeValue2)
      if (findRoom2.length === 0) {
        showElements(apologyMessage)
      }
      showAvailableRooms(findRoom2)
      reservationElements()
    }

    navHomeSection.addEventListener('click', function () {
      homeElements()
      let prevBooked = displayPrevBookedRooms(currentUser, bookingsData1)
      let totalCost = calculateBookingCost(prevBooked, roomsData1)
      showUserTotalCost(totalCost)
      showPrevBookedRooms(prevBooked)
    })
  })
}

logOutButton.addEventListener('click', loginElements)
makeAReservationButton.addEventListener('click', reservationElements)
companyLogoButton.addEventListener('click', homeElements)

const showPrevBookedRooms = (array) => {
  dashboardPrevBookings.innerHTML = ''
  array.forEach(arr => dashboardPrevBookings.innerHTML += `
    <div class = "prev-booking-info">
      <img class="reserved-logo" src='./images/reserved.png' alt="small red sign with the words reserved labeled on it">
      <p class="room-number">Room Number: ${arr.roomNumber}</p>
      <p class="room-date">Booking Date: ${arr.date}</p>
    </div>
  </div>`)
}

const showUserTotalCost = (cost) => {
  totalCostValue.innerText = `$ ${cost}`
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
  <button class="booking-button" tabindex='0'>Book Now</button>
</div>
</div>`)
}

startFetch()