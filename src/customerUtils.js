
const displayPrevBookedRooms = (customerObject, bookingsData) => {
  return bookingsData.filter((book) => book.userID === customerObject.id)
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
  findValidIDNumber
}