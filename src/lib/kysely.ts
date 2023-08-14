// import { createKysely } from "@vercel/postgres-kysely";

// interface Database {
//   person: PersonTable; // see github.com/kysely-org/kysely
//   pet: PetTable;
//   movie: MovieTable;
// }

// const db = createKysely<Database>();

// const person = await db
//   .selectFrom('person')
//   .innerJoin('pet', 'pet.owner_id', 'person.id')
//   .select(['first_name', 'pet.name as pet_name'])
//   .where('person.id', '=', id)
//   .executeTakeFirst();

import { Generated, ColumnType } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";
import { UUID } from "crypto";

interface UserTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<number>;
  name: string;
  email: string;
  uuid: Generated<UUID>;

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `createdAt` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  createdAt: ColumnType<Date, string | undefined, never>;
}

// Keys of this interface are table names.
export interface Database {
  users: UserTable;
}

export const db = createKysely<Database>({
  connectionString:
    "postgres://default:OCQaIKEkS05i@ep-rough-cherry-09397422-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb",
});
export { sql } from "kysely";
