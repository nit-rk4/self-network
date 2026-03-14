import RootNodeTemplate from "./RootNodeTemplate";

export default function FamilyRootNode({ onClick }) {
  return (
    <RootNodeTemplate
      label="Family"
      onClick={onClick}
      hintText="< click to view inner network >"
      interactive
    />
  );
}
