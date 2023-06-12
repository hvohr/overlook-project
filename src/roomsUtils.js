const filterByRoomType = (roomsData, roomType) => {
  let removeDash = roomType.split('-').join(' ')
  let find = roomsData.filter((room) => room.roomType === removeDash)
  return find
}


export {
  filterByRoomType
}