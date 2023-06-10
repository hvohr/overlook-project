const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then((response => response.json()))
  .then((data) => { return data })
  .catch((error) => alert(error))
}

const getSingleCustomer = () => {
  return fetch('http://localhost:3001/api/v1/customers/<id>')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const addPostBooking = (postBooking, currentUser) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSavedBooking(postBooking, currentUser))
  })
  .then(response => response.json())
  .catch(error => alert(error))
}

const newSavedBooking = (bookingInfo, currentUser) => { 
  return {
    userID: currentUser.id, 
    date: bookingInfo.date,
    roomNumber: bookingInfo.number 
  }
}


export {
  getAllCustomers,
  getSingleCustomer,
  getAllRooms,
  getAllBookings,
  addPostBooking
}