"use client";

import { Button, TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import React from "react";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit new Issue</Button>
    </div>
  );
};

export default newIssuePage;
