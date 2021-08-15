const User = require("../models/User");
const Screening = require("../models/Screening");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.send({ user });
    } catch (error) {
      res.json({ error: true, message: error.message });
      console.log(error);
    }
  },
  async index(req, res) {
    try {
      const users = await User.find({});
      const finalUser = [];
      users.forEach(async (user) => {
        const screenings = await Screening.find({
          user_id: user._id,
        });

        const newUser = { ...user._doc, screenings };
        finalUser.push(newUser);
      });
      res.json(finalUser);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: "Invalid password" });

      user.password = undefined;

      res.send({ user , token: generateToken({ id: user.id }) });
    } catch (err) {
      console.log(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      res.json(user);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const newUser = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, newUser);

      res.json(updatedUser);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);

      res.json({ message: "User deleted" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },
};
