"use client";

import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Prop {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Prop) => {
  const container: { label: string; value: number; status: Status }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
    { label: "InProgress issues", value: inProgress, status: "IN_PROGRESS" },
  ];

  return (
    <Flex gap="2">
      {container.map((contain) => (
        <Card key={contain.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${contain.status}`}
            >
              {contain.label}
            </Link>
            <Text size="5" className="font-bold">
              {contain.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
