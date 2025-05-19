const User = require("../schemas/userSchema");

async function findUser(query) {
  return await User.findOne(query);
}

async function createUser(userDetails) {
  return await User.create(userDetails);
}

async function findUsersByRole(role) {
    return await User.find({ role }).select("name _id phone specialization");
}
  

async function findUserById(id) {
  return await User.findById(id);
}

module.exports = {
  findUser,
  createUser,
  findUsersByRole,
  findUserById
};
