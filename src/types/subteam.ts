export type Subteam =
  | "General"
  | "Decorations"
  | "Photograph"
  | "Music"
  | "Graphic Design"
  | "Computer Related"
  | "Food Related"
  | "Table Service";

export const isOfTypeSubteam = (subteam: string): subteam is Subteam => {
  return [
    "General",
    "Decorations",
    "Photograph",
    "Music",
    "Graphic Design",
    "Computer Related",
    "Food Related",
    "Table Service",
  ].includes(subteam);
};
