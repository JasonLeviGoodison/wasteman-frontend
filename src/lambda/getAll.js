
import * as mongoose from 'mongoose'
import * as _ from 'lodash'

import * as schemas from './schemas/schemas'
import { MONGO_URL, MONGO_OPTIONS } from './utils/mongo'

let db
let afterDarkSchema
let dbAfterDark

const handler = async (event, context) => {
  var allAfterDarks;

  if (!db) {
    try {
      db = await mongoose.connect(MONGO_URL, MONGO_OPTIONS)
      afterDarkSchema = mongoose.Schema(schemas.AfterDark)
      dbAfterDark = mongoose.model('afterdark', afterDarkSchema)

      allAfterDarks = await dbAfterDark.find({});

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
