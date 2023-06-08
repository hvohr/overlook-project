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
const dateIn = document.querySelector(".booking-date")
const typeFilter = document.querySelector(".type-filter")
const makeReservationContainer = document.querySelector(".make-reservation-container")

//Event Listeners

const startFetch = () => {
  Promise.all([getAllCustomers(), getSingleCustomer(), getAllRooms(), getAllBookings()]).then((data) => {
    let customerData1 = data[0].customers
    let roomsData1 = data[2].rooms
    let bookingsData1 = data[3].bookings




  })
}

startFetch()
