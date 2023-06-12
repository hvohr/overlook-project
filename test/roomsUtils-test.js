import chai from 'chai';
const expect = chai.expect;
import { roomsData } from '/Users/hollisvohr/turing_work/mod_2/outlook-project/src/data/rooms-sample-data.js';
import { filterByRoomType } from '../src/roomsUtils.js'

describe('filterByRoomType', function() {
  it('should be a function', function() {
    expect(filterByRoomType).to.be.a('function')
  });
  it('should filter by room type', () => {
    let filter = filterByRoomType(roomsData, 'single-room')
    let expected = [
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      }
    ]
    expect(filter).to.deep.equal(expected)
    expect(filter.length).to.deep.equal(4)
  })
  it('should return nothing if no filter matches', () => {
    let filter = filterByRoomType(roomsData, 'king-suite');
    expect(filter.length).to.deep.equal(0)
  })
});
