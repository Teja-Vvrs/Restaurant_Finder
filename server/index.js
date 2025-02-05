const express = require('express');
const connectDb = require("./db");
const cors = require('cors');
const restaurantRoutes = require("./routers/restaurantsRouter");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    await connectDb(); 

    app.use("/api", restaurantRoutes); 

    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });

  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); 
  }
};

startServer();
