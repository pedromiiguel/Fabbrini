const Screening = require("../models/Screening");

module.exports = {
  async create(req, res) {
    try {
      const screening = await Screening.create(req.body);

      res.json(screening);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },
  async index(req, res) {
    try {
      const screenings = await Screening.find({}).sort({ createdAt: "desc" });

      res.json(screenings);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const screening = await Screening.findById(id);

      res.json(screening);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedScreening = await Screening.findByIdAndUpdate(id, newData);

      res.json(updatedScreening);
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Screening.findByIdAndDelete(id);

      res.json({ message: "Screening deleted" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },

  async result(req, res) {
    try {
      const screening = await Screening.findOne().sort({ _id: -1 });
      const screenings = await Screening.find({
        query: false,
      });
      console.log(screenings.length)
      const queueRed = [];
      const queueOrange = [];
      const queueYellow = [];
      const queueGreen = [];
      const queueBlue = [];
      const queue = [queueRed, queueOrange, queueYellow, queueGreen, queueBlue];
      let fila = 0;
      let queueScreening;
      const querys = screenings;

      querys.forEach((triagem) => {
        if (triagem.color === "red") {
          queueRed.push(String(triagem._id));
        }
        if (triagem.color === "orange") {
          queueOrange.push(String(triagem._id));
        }
        if (triagem.color === "yellow") {
          queueYellow.push(String(triagem._id));
        }
        if (triagem.color === "green") {
          queueGreen.push(String(triagem._id));
        }
        if (triagem.color === "blue") {
          queueBlue.push(String(triagem._id));
        }
      });

      queue.forEach((color) => {
        if (color.indexOf(String(screening._id)) !== -1) {
          fila += color.indexOf(String(screening._id)) + 1;
        }
      });

      console.log(fila);
      queue.forEach((arrayScreening, index) => {
        if (arrayScreening.includes(String(screening._id))) {
          if (index === 0) {
            queueScreening = fila;

            console.log(`Fila: ${fila}`);
          }
          if (index === 1) {
            queueScreening = queueRed.length + fila;
            console.log(`Fila: ${queueRed.length + fila}`);
          }
          if (index === 2) {
            queueScreening = queueRed.length + queueOrange.length + fila;
            console.log(`Fila: ${queueRed.length + queueOrange.length + fila}`);
          }
          if (index === 3) {
            queueScreening =
              queueRed.length + queueOrange.length + queueYellow.length + fila;
            console.log(
              `Fila: ${
                queueRed.length + queueOrange.length + queueYellow.length + fila
              }`
            );
          }
          if (index === 4) {
            queueScreening =
              queueRed.length +
              queueOrange.length +
              queueYellow.length +
              queueGreen.length +
              fila;
            console.log(
              `Fila: ${
                queueRed.length +
                queueOrange.length +
                queueYellow.length +
                queueGreen.length +
                fila
              }`
            );
          }
        }
      });

      function triagem(color) {
        const estados = {
          red: "Emergência",
          orange: "Muito Urgente",
          yellow: "Urgente",
          green: "Pouco urgente",
          blue: "Não urgente",
        };

        return estados[color];
      }

      const teste = Object.entries(
        screenings[screenings.length - 1].discriminators
      );
      // console.log(teste)
      const discriminators = [];
      teste.forEach((d) => {
        if (d[1] === "true") {
          // console.log(d)
          discriminators.push(d[0]);
        }
      });
      const triagemResult = triagem(screening.color);
      const color = screening.color
      const flowchart = screening.flowchart
      res.json({ triagemResult, discriminators, queueScreening, color, flowchart });
    } catch (error) {
      console.log(error);
      res.json({ error: true, message: error.message });
    }
  },
};
