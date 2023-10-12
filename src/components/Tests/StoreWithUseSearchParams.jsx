import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_ITEMS = ["Computer", "Book", "Bike", "Keyboard", "Cup"];

export default function StoreWithUseSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    onlyComputerItems: false,
  });

  const q = searchParams.get("q") || "";
  const onlyComputerItems = searchParams.get("onlyComputerItems") === "true";

  const items = DEFAULT_ITEMS.filter((item) => {
    return (
      item.toLowerCase().includes(q.toLowerCase()) &&
      (!onlyComputerItems ||
        (onlyComputerItems && (item === "Computer" || item === "Keyboard")))
    );
  });

  return (
    <>
      <h1>Store</h1>
      <div>
        <label htmlFor="q">Title</label>
        <input
          type="text"
          id="q"
          value={q}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("q", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
      </div>
      <div>
        <label htmlFor="onlyComputerItems">Only computer items</label>
        <input
          type="checkbox"
          id="onlyComputerItems"
          checked={onlyComputerItems}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("onlyComputerItems", e.target.checked);
                return prev;
              },
              { replace: true }
            )
          }
        />
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
