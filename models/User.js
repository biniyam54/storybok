const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  image: {
    type: String,
    default: "/no-image.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(this.password, password);
// };

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
