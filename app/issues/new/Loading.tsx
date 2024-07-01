import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const NewIssueLoading = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default NewIssueLoading;
