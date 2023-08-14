"use server";

import { InsertResult } from "kysely";
import { db } from "./kysely";
import { seed } from "./seed";

type ErrorResponse = {
  error: string;
};

import { headers } from "next/headers";

export async function joinWaitlist(
  email: string
): Promise<InsertResult[] | ErrorResponse> {
  // if (!name || !email) throw Error("Invalid Params");

  console.log(headers().get("x-forwarded-for"));

  try {
    const response = await db
      .insertInto("users")
      .values({ name: "", email: email })
      .execute();
    console.log(response);
    return response;
  } catch (err: any) {
    if (err.message === `relation "users" does not exist`) {
      console.log("Table does not exist, creating it now...");
      await seed();
      const response = await db
        .insertInto("users")
        .values({ name: "", email: email })
        .execute();
      return response;
    }
    // console.log(err.message);
    return {
      error: err.message,
    };
  }
}
