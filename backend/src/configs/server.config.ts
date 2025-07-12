import { Express } from "express";
import { env } from "./env.config";

const serverConfig = (app: Express) => {
  const PORT = env.PORT;

  app.listen(PORT, () => {
    console.log(`Server Listening on Port : http://localhost:${PORT}`);
  });
};

export default serverConfig;
