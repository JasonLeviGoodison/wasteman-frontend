exports.AfterDark = {
  name: {
    type: String,
    required: true
  },
  image: {
    required: true,
    unique: true,
    type: String
  },
  id: {
    type: Number,
    required: true,
    unique: true
  }
};
