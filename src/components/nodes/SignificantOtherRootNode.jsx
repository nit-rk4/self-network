import RootNodeTemplate from "./RootNodeTemplate";

export default function SignificantOtherRootNode({
  onClick,
  titleText = "Significant Other",
  titleFontSize,
}) {
  return (
    <RootNodeTemplate
      label={titleText}
      onClick={onClick}
      titleFontSize={titleFontSize}
      interactive
    />
  );
}
