import app from "./app";
import { testDatabaseConnection } from "./lib/dbUtils";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`ポート番号は${PORT}`);
  testDatabaseConnection();
});
