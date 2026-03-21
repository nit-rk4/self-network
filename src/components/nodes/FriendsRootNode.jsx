import RootNodeTemplate from "./RootNodeTemplate";

export default function FriendsRootNode({ onClick, titleText = "Friends", titleFontSize }) {
  return (
    <RootNodeTemplate
      label={titleText}
      onClick={onClick}
      titleFontSize={titleFontSize}
      interactive
    />
  );
}
