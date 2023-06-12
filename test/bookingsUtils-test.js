import chai from 'chai';
const expect = chai.expect;
import { bookingsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/bookings-sample.js';
import { roomsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/rooms-sample-data.js';
import { findAvailability } from '../src/bookingUtils.js'

describe('findAvailability', function() {
  it('should be a function', function() {
    expect(findAvailability).to.be.a('function')
  })
  it('should filter rooms that are available on that date', () => {
    let findDate = findAvailability(roomsData, bookingsData, "2022-04-22")
    let expected = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
    {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
    {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
    {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
    {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
    {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
    {"number":7,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46}]
    expect(findDate).to.deep.equal(expected)
    expect(findDate.length).to.equal(7)
  })
  it('should return nothing if no rooms are available on that date', () => {
    let roomInfo = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
    {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38}]
    let bookingInfo = [{"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2022/04/22","roomNumber":1}, 
    {"id":"5fwrgu4i7k55hl6x4","userID":9,"date":"2022/04/22","roomNumber":2}]
    let findDate = findAvailability(roomInfo, bookingInfo, "2022-04-22")
    let expected = [];
    expect(findDate).to.deep.equal(expected)
    expect(findDate.length).to.equal(0)
  })
})