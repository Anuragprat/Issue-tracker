import { Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueLoading = () => {
  return (
    <div>
      <Box className="max-w-xl">
        <Skeleton />
        <Flex gap={"4"} my={"4"}>
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose" mt="4">
          <Skeleton count={3} />
        </Card>
      </Box>
    </div>
  );
};

export default IssueLoading;
