const findAvailability = (bookingsData, dateValue) => {
  let fixSlashes = dateValue.split('-').join('/')
  return bookingsData.filter((book) => book.date !== fixSlashes)
}

const displayAvailableRooms = (findAvailabilityData, roomsData) => {
  let find = findAvailabilityData.map((book) => book.roomNumber)
  console.log(find)
  let filter = roomsData.filter(book2 => {
    if (find.includes(book2.number)) {
      return book2
    }
  })
  return filter
}

export {
  findAvailability,
  displayAvailableRooms
}

