import RootNodeTemplate from "./RootNodeTemplate";

export default function FriendsRootNode({ onClick }) {
  return (
    <RootNodeTemplate
      label="Friends"
      onClick={onClick}
      hintText="< click to view inner network >"
      interactive
    />
  );
}
