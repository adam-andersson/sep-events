export type ProductionSubteam =
  | "General"
  | "Decorations"
  | "Photograph"
  | "Music"
  | "Graphic Design"
  | "Computer Related";

export type ServiceSubteam = "Food Related" | "Table Service";
export type Subteam = ProductionSubteam | ServiceSubteam;

export const isOfTypeProductionSubteam = (
  subteam: string
): subteam is ProductionSubteam => {
  return [
    "General",
    "Decorations",
    "Photograph",
    "Music",
    "Graphic Design",
    "Computer Related",
  ].includes(subteam);
};

export const isOfTypeServiceSubteam = (
  subteam: string
): subteam is ServiceSubteam => {
  return ["Food Related", "Table Service"].includes(subteam);
};

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
