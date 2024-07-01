import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import StatusBadge from "../components/StatusBadge";
import delay from "delay";
import IssueActions from "../IssueActions";
import Link from "../components/Link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <div>
      <IssueActions />
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
                  <Link href={`/issues/${issues.id}`}>{issues.title}</Link>
                  <div className="block md:hidden">
                    <StatusBadge status={issues.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <StatusBadge status={issues.status} />
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
