import React from "react";

export default function Search() {
  return (
    <>
      <label>
        Search by name:
        <input type="text" value={""} onChange={(e) => e.target.value} />
      </label>
    </>
  );
}
