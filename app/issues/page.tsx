import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">new Issue</Link>
        </Button>
      </div>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                CreatedAt
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issues) => (
              <Table.Row key={issues.id}>
                <Table.Cell>
                  {issues.title}
                  <div className="block md:hidden">{issues.status}</div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issues.status}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issues.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;
