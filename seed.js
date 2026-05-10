import 'dotenv/config';
import db from "./app/models/index.js";

const Role = db.role;

db.sequelize.sync().then(() => {
  initial();
});

async function initial() {
  try {
    const count = await Role.count();
    if (count === 0) {
      await Role.create({ id: 1, name: "user" });
      await Role.create({ id: 2, name: "moderator" });
      await Role.create({ id: 3, name: "admin" });
      console.log("Roles agregados exitosamente a Neon Postgres.");
    } else {
      console.log("Los roles ya existen en Neon Postgres.");
    }
  } catch (error) {
    console.error("Error inicializando roles:", error);
  } finally {
    process.exit();
  }
}
