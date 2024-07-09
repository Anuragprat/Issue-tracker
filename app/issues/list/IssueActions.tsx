import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusList from "./IssueStatusList";

const IssueActions = () => {
  return (
    <Flex justify={"between"}>
      <IssueStatusList />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
