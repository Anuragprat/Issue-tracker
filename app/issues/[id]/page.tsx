import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}
const IssueDescription = async ({ params }: Props) => {
  const issues = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issues) notFound();
  return (
    <div>
      <Heading>{issues.title}</Heading>
      <Flex gap={"4"} my={"4"}>
        <StatusBadge status={issues.status} />
        <Text>{issues.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issues.description}</p>
      </Card>
    </div>
  );
};

export default IssueDescription;
