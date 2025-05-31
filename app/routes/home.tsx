import type { Route } from "./+types/home";
import { getDatabase } from "~/services/database.server";
import { useEffect, useRef } from "react";
import { Form, redirect, useNavigation } from "react-router";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Hom" }];
}

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
      <title>Home</title>
      {loaderData.tomatoes.map(({ id: n, name }) => (
        <p key={n} className="text-5xl">
          {name}: {"🍅".repeat(Math.min(n, 13))}
        </p>
      ))}
      <Form
        method="post"
        ref={formRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-amber-500 p-5 font-mono font-bold text-white underline dark:bg-white dark:text-neutral-800"
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Name your tomato!"
          className="mr-10 rounded-md bg-neutral-800 p-3 text-white placeholder-white dark:bg-neutral-700"
        />
        <button
          type="submit"
          className="rounded-md bg-white p-3 text-neutral-800 dark:bg-amber-500 dark:text-white"
        >
          more tomato!
        </button>
      </Form>
    </>
  );
}

export async function loader() {
  const database = getDatabase();
  const tomatoes = await database.tomato.findMany();

  return { tomatoes };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string") {
    throw new Response("Invalid form data", { status: 400 });
  }

  const database = getDatabase();
  await database.tomato.create({ data: { name } });

  return redirect("/");
}
