import db from "../config/database";

//db接続テスト
export const testDatabaseConnection = async () => {
  try {
    const result = await db.one("SELECT $1 AS message", "Hello world!");
    console.log("データベースの接続に成功", result.message);
  } catch (error) {
    console.error("データベースの接続に失敗", error);
  }
};
