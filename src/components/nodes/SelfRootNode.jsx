import RootNodeTemplate from "./RootNodeTemplate";

export default function SelfRootNode({ label, onClick }) {
  return (
    <RootNodeTemplate
      label={label}
      onClick={onClick}
      hintText="< click to view their inner self >"
      interactive
    />
  );
}
