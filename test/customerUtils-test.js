import chai from 'chai';
const expect = chai.expect;
import { bookingsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/bookings-sample.js';
import { displayPrevBookedRooms, findValidIDNumber, calculateBookingCost } from '../src/customerUtils.js' 
import { roomsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/rooms-sample-data.js';
import { customerData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/customers-sample-data.js';

describe('displayPrevBookedRooms', function() {
  it('should be a function', function() {
    expect(displayPrevBookedRooms).to.be.a('function')
  })
  it('should display bookings already made by users', () => {
    let prevBooked = displayPrevBookedRooms({"id":9,"name":"Faustino Quitzon"}, bookingsData)
    let expected = [{"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2022/04/22","roomNumber":15},
    {"id":"5fwrgu4i7k55hl6x4","userID":9,"date":"2022/01/27","roomNumber":6},]
    expect(prevBooked.length).to.equal(2)
    expect(prevBooked).to.deep.equal(expected)
  })
  it('should display no booking if none made by that user', () => {
    let customerObject = {"id":24,"name":"Hollis Vohr"}
    let prevBooked = displayPrevBookedRooms(customerObject, bookingsData)
    let expected = []
    expect(prevBooked.length).to.equal(0)
    expect(prevBooked).to.deep.equal(expected)
  })
})
describe('findValidIDNumber', function() {
  it('should be a function', function() {
    expect(findValidIDNumber).to.be.a('function')
  })
  it('should return a user when a valid username is entered', () => {
    let customerUsername = findValidIDNumber(customerData, 'customer1')
    let expected = {"id":1,"name":"Leatha Ullrich"}
    expect(customerUsername).to.deep.equal(expected)
  })
  it('should return undefined when a valid username is not entered', () => {
    let customerUsername = findValidIDNumber(customerData, 'ghostman26')
    let expected = undefined
    expect(customerUsername).to.equal(expected)
  })
})
describe('calculateBookingCost', function() {
  it('should be a function', function() {
    expect(calculateBookingCost).to.be.a('function')
  });
  it('should return the booking cost for one scheduled room', () => {
    let prevBooked = displayPrevBookedRooms({"id":1,"name":"Leatha Ullrich"}, bookingsData)
    let totalCost = calculateBookingCost(prevBooked, roomsData)
    let expected = 397.02
    expect(totalCost).to.deep.equal(expected)
  })
  it('should return the booking cost for multiple scheduled rooms', () => {
    let prevBooked = displayPrevBookedRooms({"id":9,"name":"Faustino Quitzon"}, bookingsData)
    let totalCost = calculateBookingCost(prevBooked, roomsData)
    expect(totalCost).to.equal(691.5799999999999)
  })
})