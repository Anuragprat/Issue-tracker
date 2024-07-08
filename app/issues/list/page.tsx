import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Link, StatusBadge } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Prop {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "CreatedAt", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Prop) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });
  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
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
