import config from "./config/index.js";
import { initDB } from "./db/index.js";
import app from "./app.js";

const main = () =>{
    initDB();
    app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
}
main();