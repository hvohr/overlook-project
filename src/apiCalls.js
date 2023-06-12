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

const getAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const addPostBooking = (postBooking, currentUser) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSavedBooking(postBooking, currentUser))
  })
  .then(response => response.json())
  .catch(error => alert(error))
}

const newSavedBooking = (postBooking, currentUser) => { 
  return {
    userID: currentUser.id, 
    date: postBooking.date,
    roomNumber: postBooking.number 
  }
}


export {
  getAllCustomers,
  getAllRooms,
  getAllBookings,
  addPostBooking
}