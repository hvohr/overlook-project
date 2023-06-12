
const displayPrevBookedRooms = (customerObject, bookingsData) => {
  return bookingsData.filter((book) => book.userID === customerObject.id)
}

const calculateBookingCost = (displayPrevBookedRoomsData, roomDataInformation) => {
  let newArray = []
  let sum = 0;
  roomDataInformation.filter((room) => {
    displayPrevBookedRoomsData.filter((booking) => {
      if (booking.roomNumber === room.number) {
        newArray.push(room)
      }
    })
  })
  newArray.forEach((fil) => {
    sum += fil.costPerNight
  })
  return sum
}

const findValidIDNumber = (customerData, username) => {
  let customerLogin;
  customerData.forEach((customer) => {
    if (username.includes('customer' + customer.id)) {
      customerLogin = customer
    }
  })
  return customerLogin
}

export {
  displayPrevBookedRooms,
  findValidIDNumber,
  calculateBookingCost
}