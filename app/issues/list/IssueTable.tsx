import { Link, StatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Prop {
  searchParams: IssueQuery;
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Prop) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "CreatedAt", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
