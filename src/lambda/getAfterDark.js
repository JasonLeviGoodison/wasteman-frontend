
import * as mongoose from 'mongoose'
import querystring from 'querystring'
import * as schemas from './schemas/schemas'

import { authenticate } from './utils/authentication'

import { MONGO_URL, MONGO_OPTIONS } from './utils/mongo'

let db
let afterDarkSchema
let allAfterDarks

const handler = async (event, context) => {
  var allAfterDarks;
  var id = event.queryStringParameters.id;

  if (!db) {
    try {
      db = await mongoose.connect(MONGO_URL, MONGO_OPTIONS)
      afterDarkSchema = mongoose.Schema(schemas.AfterDark)
      dbAfterDark = mongoose.model('afterdark', afterDarkSchema)

      //allAfterDarks = await dbAfterDark.find({ tokenId: id });
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

exports.handler = handler

