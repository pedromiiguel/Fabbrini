const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cursojs.e2nu7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(URI)
  .then(() => console.log("DB is up"))
  .catch((err) => console.log(err));
