import { db, sql } from "@/lib/kysely";

export async function seed() {
  const createTable = await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("name", "varchar(255)", (cb) => cb.notNull())
    .addColumn("email", "varchar(255)", (cb) => cb.notNull().unique())
    .addColumn("uuid", "uuid", (cb) => cb.defaultTo(sql`uuid_generate_v4()`))
    .addColumn("createdAt", sql`timestamp with time zone`, (cb) =>
      cb.defaultTo(sql`current_timestamp`)
    )
    .execute();

  console.log("Created users table");

  const addUsers = await db
    .insertInto("users")
    .values({ name: "Farhan", email: "farhan@gmail.com" })
    .execute();
  console.log("Seeded with 1 user");
  return {
    createTable,
    addUsers,
  };
}
