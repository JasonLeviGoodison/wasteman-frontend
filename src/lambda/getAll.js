
const mongoose = require('mongoose');
const schemas = require('./schemas/schemas');

let db
let afterDarkSchema
let dbAfterDark

const handler = async (event, context) => {
  var allAfterDarks;

  if (!db) {
    try {
      var MONGO_URL = process.env.MONGO_URL
      db = await mongoose.connect(MONGO_URL)
      afterDarkSchema = mongoose.Schema(schemas.AfterDark)
      dbAfterDark = mongoose.model('afterdark', afterDarkSchema)

      //allAfterDarks = await dbAfterDark.find({});
      allAfterDarks = [{
        "name": "Will be revealed after public sale ends",
        "image": "https://gateway.pinata.cloud/ipfs/QmNTi4TfndMRhu4LBXFwDsSagC7M4G5WrLYrCZf3CFqviR",
        "tokenId": -1,
      }]
      return {
        statusCode: 200,
        body: JSON.stringify(allAfterDarks)
      }

    } catch (e) {
      console.error('Error connecting to database:', e)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Encountered issue while trying to get the after darks"
        })
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(allAfterDarks)
  }
}

exports.handler = handler;
