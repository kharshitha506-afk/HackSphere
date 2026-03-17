const app = require("./app");

const PORT = 5000;
console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});