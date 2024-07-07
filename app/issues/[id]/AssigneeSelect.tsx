"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 100,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue.assignedUserId || "unassigned"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedUserId: userId === "unassigned" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {user?.map((user) => (
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
