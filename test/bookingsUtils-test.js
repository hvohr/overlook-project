import chai from 'chai';
const expect = chai.expect;
import { bookingsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/bookings-sample.js';
import { roomsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/rooms-sample-data.js';
import { findAvailability, displayAvailableRooms } from '../src/bookingUtils.js'

describe('findAvailability', function() {
  it('should be a function', function() {
    expect(findAvailability).to.be.a('function')
  })
  it('should filter rooms that are available on that date', () => {
    let findDate = findAvailability(bookingsData, "2022-04-22")
    let expected = [{"id":"5fwrgu4i7k55hl6x4","userID":9,"date":"2022/01/27","roomNumber":6},
    {"id":"5fwrgu4i7k55hl6wk","userID":17,"date":"2022/01/24","roomNumber":2},
    {"id":"5fwrgu4i7k55hl8ea","userID":1,"date":"2021/09/23","roomNumber":6},  
    {"id":"5fwrgu4i7k55hl6t7","userID":20,"date":"2022/02/16","roomNumber":7},
    {"id":"5fwrgu4i7k55hl6vh","userID":13,"date":"2022/02/19","roomNumber":1},
    {"id":"5fwrgu4i7k55hl6um","userID":41,"date":"2022/02/07","roomNumber":4},
    {"id":"5fwrgu4i7k55hl6tt","userID":33,"date":"2022/02/03","roomNumber":5},
    {"id":"5fwrgu4i7k55hl70t","userID":41,"date":"2022/01/18","roomNumber":8},
  ]
    expect(findDate).to.deep.equal(expected)
  })
  it('should return the available room information based on booking data', () => {
    let findRoomForDate = displayAvailableRooms(bookingsData, roomsData)
    let expected = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
    {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
    {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
    {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
    {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
    {"number":7,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46},
    {"number":15,"roomType":"residential suite","bidet":false,"bedSize":"full","numBeds":1,"costPerNight":294.56}]
    expect(findRoomForDate).to.deep.equal(expected)
  })
  it('should return no room information if no booking data corresponds', () => {
    let originalData = [{"id":"5fwrgu4i7k55hl6tt","userID":33,"date":"2022/02/03","roomNumber":5}]
    let findDate = findAvailability(originalData, "2022-02-03")
    let findRoomForDate = displayAvailableRooms(findDate, roomsData)
    expect(findRoomForDate.length).to.equal(0)
    expect(findRoomForDate).to.deep.equal([])
  })
})