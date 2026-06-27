import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

const port = process.env.PORT;

app.listen(port || 4000, () => {
  console.log(`Server is running on port ${port || 4000}`);
});




