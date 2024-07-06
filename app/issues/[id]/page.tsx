import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
interface Props {
  params: {
    id: string;
  };
}
const IssueDescription = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issues = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issues) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4 ">
        <IssueDetails issues={issues} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueButton IssueId={issues.id} />
            <DeleteIssueButton IssueId={issues.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDescription;
