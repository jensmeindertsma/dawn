import type { Route } from "./+types/home";
import { useState } from "react";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Home" }];
}

export default function Home() {
  const [count, setCount] = useState(3);

  const handleClick = () => {
    setCount((previous) => previous + 1);
  };

  return (
    <>
      <title>Home</title>
      <p className="text-5xl">{"🍅".repeat(count)}</p>
      <button
        onClick={handleClick}
        className=":bg-neutral-800 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-neutral-800 p-5 font-mono font-bold text-white underline dark:bg-white dark:text-neutral-800"
      >
        click me
      </button>
    </>
  );
}
