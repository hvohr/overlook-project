const findAvailability = (roomsData, bookingsData, dateValue) => {
  const date = dateValue.split('-').join('/')
  console.log('date',date)

  const bookingsOnDate = bookingsData.filter((b) => {
    console.log('b.date', b.date)
    return b.date === date 
  })
  console.log('bookings on date variable', bookingsOnDate)
  let find = roomsData.filter((room) => {
    console.log('room', room)
    console.log('bookings on date',!bookingsOnDate.some((booking) => { booking.roomNumber === room.number })) 
    return !bookingsOnDate.some((booking) =>  booking.roomNumber === room.number)
  })
  console.log(find)
  return find
}

// const displayAvailableRooms = (findAvailabilityData, roomsData) => {
//   let find = findAvailabilityData.map((book) => book.roomNumber)
//   let filter = roomsData.filter(book2 => {
//     if (find.includes(book2.number)) {
//       return book2
//     }
//   })
//   console.log(filter)
//   return filter
// }

export {
  findAvailability
  // displayAvailableRooms
}

