const User = require('../models/User');
const Screening = require('../models/Screening');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.send({ user });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },
  async index(req, res) {
    try {
      const users = await User.find({});
      // const finalUser = [];
      // users.forEach(async (user) => {
      //   const screenings = await Screening.find({
      //     user_id: user._id,
      //   });

      //   const newUser = { ...user._doc, screenings };
      //   finalUser.push(newUser);
      // });
      res.json(users);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { cpf } = req.params;
      const user = await User.findOne({
        cpf: cpf
      });

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

      res.json({ message: 'User deleted' });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },
};
