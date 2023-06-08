import chai from 'chai';
const expect = chai.expect;
import { bookingsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/bookings-sample.js';
import { roomsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/rooms-sample-data.js';
import { displayPrevBookedRooms } from '../src/customerUtils.js' 
import { customerData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/customers-sample-data.js';

describe('displayPrevBookedRooms', function() {
  it('should be a function', function() {
    expect(displayPrevBookedRooms).to.be.a('function')
  })
  it('should display bookings already made by users', () => {
    let prevBooked = displayPrevBookedRooms(9, bookingsData)
    let expected = [{"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2022/04/22","roomNumber":15},
    {"id":"5fwrgu4i7k55hl6x4","userID":9,"date":"2022/01/27","roomNumber":6},]
    expect(prevBooked.length).to.equal(2)
    expect(prevBooked).to.deep.equal(expected)
  })
  it('should display no booking if none made by that user', () => {
    let prevBooked = displayPrevBookedRooms(24, bookingsData)
    let expected = []
    expect(prevBooked.length).to.equal(0)
    expect(prevBooked).to.deep.equal(expected)
  })
})