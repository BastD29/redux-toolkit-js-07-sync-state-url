import React from "react";
import { users } from "../../../../data/users";

export default function Users() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.age} - {user.city}
        </li>
      ))}
    </ul>
  );
}
