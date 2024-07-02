import { StatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issues }: { issues: Issue }) => {
  return (
    <>
      <Heading>{issues.title}</Heading>
      <Flex gap={"4"} my={"4"}>
        <StatusBadge status={issues.status} />
        <Text>{issues.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issues.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
