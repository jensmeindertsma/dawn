import type { Route } from "./+types/home";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Home" }];
}

export default function Home() {
  return (
    <>
      <title>Home</title>
      <h1>Home</h1>
    </>
  );
}
