
const displayPrevBookedRooms = (customerID, bookingsData) => {
  return bookingsData.filter((book) => book.userID === customerID)
}


export {
  displayPrevBookedRooms
}