import RootNodeTemplate from "./RootNodeTemplate";

export default function SignificantOtherRootNode({ onClick }) {
  return (
    <RootNodeTemplate
      label="Significant Other"
      onClick={onClick}
      hintText="< click to view inner network >"
      interactive
    />
  );
}
