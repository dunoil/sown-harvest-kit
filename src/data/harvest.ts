/**
 * The single source of truth for SOWN.
 *
 * One harvest record drives every output. A real farm replaces this file
 * (or the CSV beside it) each week; nothing else in the kit changes.
 * All data below is original sample data for a fictional farm.
 */

export interface ProduceItem {
  id: string;
  name: string;
  variety: string;
  quantity: string;
  /** Harvest colour. Used by the email-safe Grid swatch AND the Svg art. */
  colour: string;
  /** Darkened ink for text on paper — kept >= 4.5:1 against the card. */
  ink: string;
  storage: string;
  recipe: string;
  recipeTime: string;
}

export interface Subscriber {
  firstName: string;
  boxId: string;
  boxSize: "Small" | "Family";
  pickupPoint: string;
  pickupWindow: string;
  swaps: string[];
}

export interface HarvestWeek {
  farm: string;
  farmLine: string;
  weekLabel: string;
  harvestDate: string;
  pickupDate: string;
  fieldNote: string;
  items: ProduceItem[];
}

export const harvest: HarvestWeek = {
  farm: "Sown Acres",
  farmLine: "Sown Acres · Willow Creek Road · Est. 2016",
  weekLabel: "Week 34 — Late Summer",
  harvestDate: "Thursday 20 November 2026",
  pickupDate: "Saturday 22 November 2026",
  fieldNote:
    "The tomatoes finally outran us this week — in the best way. Every box carries more than the plan said, the basil was cut at dawn so it travels upright, and the first sweetcorn of the season is in. Eat the corn tonight if you can. It is never better than on day one.",
  items: [
    {
      id: "tomato",
      name: "Tomatoes",
      variety: "Oxheart, vine-ripened",
      quantity: "800 g",
      colour: "#c8432b",
      ink: "#9c2f1d",
      storage: "Counter, never the fridge. 4–5 days.",
      recipe: "Slow tomatoes on toast with basil oil",
      recipeTime: "25 min",
    },
    {
      id: "corn",
      name: "Sweetcorn",
      variety: "Golden Bantam, first pick",
      quantity: "4 cobs",
      colour: "#e9b44c",
      ink: "#8a6414",
      storage: "Fridge in its husk. Eat within 2 days.",
      recipe: "Charred corn with smoked salt",
      recipeTime: "15 min",
    },
    {
      id: "carrot",
      name: "Carrots",
      variety: "Nantes, bunched",
      quantity: "1 bunch",
      colour: "#e07a2c",
      ink: "#9a4d12",
      storage: "Tops off, wrapped, fridge. 2 weeks.",
      recipe: "Carrot-top pesto (uses the whole bunch)",
      recipeTime: "20 min",
    },
    {
      id: "greens",
      name: "Rainbow chard",
      variety: "Bright Lights",
      quantity: "300 g",
      colour: "#3e7c3a",
      ink: "#2e5a34",
      storage: "Damp cloth, fridge. 4 days.",
      recipe: "Chard stems pickled, leaves wilted",
      recipeTime: "30 min",
    },
    {
      id: "aubergine",
      name: "Aubergine",
      variety: "Black Beauty",
      quantity: "2 fruit",
      colour: "#5b3a6e",
      ink: "#4a2d5c",
      storage: "Cool cupboard. 5 days.",
      recipe: "Whole-roast aubergine, tahini, herbs",
      recipeTime: "45 min",
    },
    {
      id: "beetroot",
      name: "Beetroot",
      variety: "Detroit Dark Red",
      quantity: "500 g",
      colour: "#8e2a4a",
      ink: "#7c2140",
      storage: "Tops off, fridge. 3 weeks.",
      recipe: "Beetroot & lentil salad, horseradish cream",
      recipeTime: "40 min",
    },
    {
      id: "basil",
      name: "Basil",
      variety: "Genovese, cut at dawn",
      quantity: "1 bunch",
      colour: "#4c9a4c",
      ink: "#2f6b2f",
      storage: "Stems in water on the counter. 3 days.",
      recipe: "Basil oil for everything above",
      recipeTime: "10 min",
    },
    {
      id: "potato",
      name: "Potatoes",
      variety: "Nicola, freshly dug",
      quantity: "1 kg",
      colour: "#b99b5f",
      ink: "#77603a",
      storage: "Dark, dry, paper bag. 4 weeks.",
      recipe: "Crushed Nicola potatoes, chard-stem pickle",
      recipeTime: "35 min",
    },
  ],
};

/** The subscriber shown in the committed examples. */
export const sampleSubscriber: Subscriber = {
  firstName: "Ada",
  boxId: "S34-001",
  boxSize: "Family",
  pickupPoint: "Willow Creek Farm Gate",
  pickupWindow: "Saturday 9:00–13:00",
  swaps: [],
};

const FIRST_NAMES = [
  "Ada", "Bram", "Cleo", "Dario", "Elif", "Felix", "Greta", "Hugo",
  "Ines", "Jonas", "Kira", "Liam", "Mira", "Noah", "Opal", "Piotr",
  "Rosa", "Stefan", "Tara", "Umar", "Vera", "Wim", "Yara", "Zola",
];
const PICKUP_POINTS = [
  "Willow Creek Farm Gate",
  "North Market Hall, Stall 12",
  "Library Steps, Old Town",
];
const PICKUP_WINDOWS = [
  "Saturday 9:00–13:00",
  "Saturday 14:00–17:00",
  "Sunday 9:00–12:00",
];

/**
 * Deterministic subscriber list for the batch run.
 * Same count in -> same boxes out, every time (no clock, no randomness),
 * so a corrections run only ever re-renders the boxes that changed.
 */
export function makeSubscribers(count: number): Subscriber[] {
  return Array.from({ length: count }, (_, i) => ({
    firstName: FIRST_NAMES[i % FIRST_NAMES.length],
    boxId: `S34-${String(i + 1).padStart(3, "0")}`,
    boxSize: i % 3 === 2 ? "Small" : "Family",
    pickupPoint: PICKUP_POINTS[i % PICKUP_POINTS.length],
    pickupWindow: PICKUP_WINDOWS[i % PICKUP_WINDOWS.length],
    swaps: [],
  }));
}
