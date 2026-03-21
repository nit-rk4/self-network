import RootNodeTemplate from "./RootNodeTemplate";

export default function FamilyRootNode({ onClick, titleText = "Family", titleFontSize }) {
  return (
    <RootNodeTemplate
      label={titleText}
      onClick={onClick}
      titleFontSize={titleFontSize}
      interactive
    />
  );
}
