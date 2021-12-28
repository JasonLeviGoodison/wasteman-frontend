
const mongoose = require('mongoose');
const schemas = require('./schemas/schemas');


let db
let afterDarkSchema

const handler = async (event, context) => {
  var afterDark;
  var id = event.queryStringParameters.id;

  if (!db) {
    try {
      var MONGO_URL = process.env.MONGO_URL
      db = await mongoose.connect(MONGO_URL)
      afterDarkSchema = mongoose.Schema(schemas.AfterDark)
      // dbAfterDark = mongoose.model('afterdark', afterDarkSchema)

      //allAfterDarks = await dbAfterDark.find({ tokenId: id });

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

  afterDark = {
    "name": "Will be revealed after public sale ends",
    "image": "https://gateway.pinata.cloud/ipfs/QmNTi4TfndMRhu4LBXFwDsSagC7M4G5WrLYrCZf3CFqviR",
  }

  return {
    statusCode: 200,
    body: JSON.stringify(afterDark)
  }
}

exports.handler = handler

