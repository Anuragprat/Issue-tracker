import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((IssueId: number) =>
  prisma.issue.findUnique({ where: { id: IssueId } })
);

const IssueDescription = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issues = await fetchUser(parseInt(params.id));
  if (!issues) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4 ">
        <IssueDetails issues={issues} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issues} />
            <EditIssueButton IssueId={issues.id} />
            <DeleteIssueButton IssueId={issues.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of all the issue needed" + issue?.id,
  };
}
export default IssueDescription;
