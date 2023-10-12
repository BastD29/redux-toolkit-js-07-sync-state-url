import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";

function GreetingComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const greeting = searchParams.get("greeting");
  // const [greeting, setGreeting] = useSearchParamsState("greeting", "hello");

  return (
    <div>
      <p>{greeting || "Hello"}</p>{" "}
    </div>
  );
}

export default GreetingComponent;
