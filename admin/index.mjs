import express from "express";

import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
import cors from "cors";
import { readdirSync } from "fs";

const PORT = process.env.PORT || 8001;
const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.resolve(__dirname, "./routes");
const routeFiles = readdirSync(routesPath);

routeFiles.map(async (file) => {
  const routeModule = await import(`./routes/${file}`);
  app.use("/", routeModule.default);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running ar http://localhost:${PORT}`);
});
