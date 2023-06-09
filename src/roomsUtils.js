const filterByRoomType = (roomsData, roomType) => {
  let removeDash = roomType.split('-').join(' ')
  let find = roomsData.filter((room) => room.roomType === removeDash)
  return find
}

const calculateBookingCost = (roomsData, roomCosts) => {
  let sum = 0;
  roomsData.forEach((room) => {
    if (roomCosts.includes(room.costPerNight)) {
      sum += room.costPerNight
    }
  })
  return sum
}


export {
  filterByRoomType,
  calculateBookingCost
}