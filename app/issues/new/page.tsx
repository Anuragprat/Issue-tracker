import IssueFormSkeleton from "@/app/components/IssueFormSkeleton";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssue = () => {
  return <IssueForm />;
};

export default NewIssue;
