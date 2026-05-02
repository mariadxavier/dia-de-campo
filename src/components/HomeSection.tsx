import { SectionTitle } from "@/src/components";
import { redirect } from "next/navigation";
import { HomeSectionContent } from "../types";

type HomeSectionProps = {
    sectionTitle: string;
    sectionLink: string;
    sectionContent: HomeSectionContent;
}

export default function HomeSection({
  sectionTitle,
  sectionLink,
  sectionContent,
}: HomeSectionProps) {
  return (
    <>
      <SectionTitle
        title={sectionTitle}
        hasAction={!!sectionLink}
        action={redirect(sectionLink)}
      />
    </>
  );
}
