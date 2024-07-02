import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ButtonIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issues.title}</Heading>
        <Flex gap={"4"} my={"4"}>
          <StatusBadge status={issues.status} />
          <Text>{issues.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issues.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issues.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDescription;
