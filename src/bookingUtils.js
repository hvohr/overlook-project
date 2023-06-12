const findAvailability = (roomsData, bookingsData, dateValue) => {
  const date = dateValue.split('-').join('/')
  const bookingsOnDate = bookingsData.filter((b) => {
      return b.date === date 
  })
  let find = roomsData.filter((room) => {
    return !bookingsOnDate.some((booking) =>  booking.roomNumber === room.number)
  })
  return find
}

export {
  findAvailability
}

