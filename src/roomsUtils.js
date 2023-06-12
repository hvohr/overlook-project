const filterByRoomType = (roomsData, roomType) => {
  let removeDash = roomType.split('-').join(' ')
  let find = roomsData.filter((room) => room.roomType === removeDash)
  return find
}

// const calculateBookingCost = (bookingData, roomsData) => {
//   let sum = 0;
//   let find = bookingData.filter((book) => book.userID === customerObject.id)
//   roomsData.forEach((room) => {
//     if (roomCosts.includes(room.costPerNight)) {
//       sum += room.costPerNight
//     }
//   })
//   return sum
// }


export {
  filterByRoomType,
  // calculateBookingCost
}