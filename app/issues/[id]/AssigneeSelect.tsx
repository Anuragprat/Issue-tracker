"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUser(data);
    };
    fetch();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {user.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
