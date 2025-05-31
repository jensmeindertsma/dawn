import type { Route } from "./+types/home";
import { getDatabase } from "~/services/database.server";
import { useEffect, useRef } from "react";
import { Form, redirect, useNavigation } from "react-router";

export default function Home({ loaderData }: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "submitting") {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  return (
    <>
      <h1>Home</h1>
      <p>We currently have {loaderData.users.length} users!</p>

      <Form method="post" ref={formRef}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name the user..."
        />
        <button type="submit">Create User</button>
      </Form>

      <h2>Users</h2>
      <ul>
        {loaderData.users.map((user) => (
          <li key={user.id}>
            ID={user.id} NAME={user.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const database = getDatabase();

  return { users: await database.user.findMany() };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name != "string") {
    throw new Response("Invalid form data!", { status: 400 });
  }

  const database = getDatabase();

  await database.user.create({ data: { name } });

  return redirect("/");
}
