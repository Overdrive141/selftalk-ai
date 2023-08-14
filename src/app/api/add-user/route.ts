import { db, sql } from "@/lib/kysely";
import { seed } from "@/lib/seed";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get("name");
//   const email = searchParams.get("email");

//   try {
//     if (!name || !email) throw new Error("User and email required");
//     await sql`INSERT INTO Users (Name, Email) VALUES (${name}, ${email});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const users = await sql`SELECT * FROM Users;`;
//   return NextResponse.json({ users }, { status: 200 });
// }

export async function POST(request: Request) {
  const { email } = await request.json();
  // const ip = request.headers["x-real-ip"] || request.connection.remoteAddress;
  try {
    if (!email) throw new Error("Email is missing");

    // TODO: Save ip too for preventing hijacking of waitlist
    console.log(email, typeof email, request.headers);

    const queryResponse = (await sql`SELECT COUNT(*) FROM users`.execute(db))
      .rows[0] as any;
    const total = queryResponse.count as number;
    // console.log("TOTAL ", total);
    if (total > 1000) {
      return NextResponse.json(
        {
          error:
            "Unfortunately, all 1000 spots on the waiting list have been redeemed, but don't be discouraged. We'll be opening more spots soon ",
        },
        { status: 403 }
      );
    }

    const response = await db
      .insertInto("users")
      .values({ name: "", email })
      .returningAll()
      .execute();
    console.log(response);

    // this should return 2 things if successful =>
    // created user object, count of total users for waitlist number

    cookies().set("email", email, { secure: true });
    cookies().set("registered", "true", { secure: true });

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    if (err.message === `relation "users" does not exist`) {
      console.log("Table does not exist, creating it now...");
      await seed();
      const response = await db
        .insertInto("users")
        .values({ name: "", email: email })
        .execute();
      return NextResponse.json({ users: response }, { status: 200 });
    }
    // console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
