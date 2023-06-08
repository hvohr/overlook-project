const filterByRoomType = (roomsData, roomType) => {
  let find = roomsData.filter((room) => room.roomType === roomType)
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