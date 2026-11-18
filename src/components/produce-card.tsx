import {
  Column,
  Heading,
  Text,
  defineElement,
  prop,
  token,
} from "@hyper-elements/react";

/**
 * sown.ProduceCard — a named, typed block made with defineElement().
 *
 * Validation checks its props like a built-in element's: a missing recipe
 * or a bad colour is a diagnostic with a path, before anything renders.
 * Because it expands into built-in elements before layout, the same card
 * works in the Page grid, the Document and the Canvas — and its colour
 * swatch (a plain Column, never an Svg) even survives inside an Email.
 */
export const ProduceCard = defineElement({
  type: "sown.ProduceCard",
  label: "Produce card",
  description:
    "One crop in the box: colour swatch, name, variety, quantity, storage and its recipe.",
  props: {
    name: prop.text({ label: "Name", required: true }),
    variety: prop.text({ label: "Variety", required: true }),
    quantity: prop.text({ label: "Quantity", required: true }),
    colour: prop.color({ label: "Harvest colour", required: true }),
    ink: prop.color({ label: "Text ink", default: "#1c2a1e" }),
    storage: prop.text({ label: "Storage", required: true }),
    recipe: prop.text({ label: "Recipe", required: true }),
    recipeTime: prop.text({ label: "Recipe time", default: "30 min" }),
    size: prop.choice(["compact", "feature"], {
      label: "Size",
      default: "compact",
    }),
  },
  render: ({
    name,
    variety,
    quantity,
    colour,
    ink,
    storage,
    recipe,
    recipeTime,
    size,
  }) => (
    <Column
      style={{
        backgroundColor: token("colors.paper"),
        border: { width: 1, style: "solid", color: token("colors.border") },
        borderRadius: token("radii.card"),
        padding: size === "feature" ? 24 : 16,
        gap: 8,
      }}
    >
      <Column
        style={{
          backgroundColor: colour,
          height: size === "feature" ? 14 : 8,
          borderRadius: 4,
        }}
      />
      <Heading
        level={3}
        style={{ color: ink, fontSize: size === "feature" ? 21 : 17 }}
      >
        {name}
      </Heading>
      <Text style={{ apply: ["quiet"] }}>
        {variety} · {quantity}
      </Text>
      <Text>{storage}</Text>
      <Text>
        Cook: {recipe} ({recipeTime})
      </Text>
    </Column>
  ),
});
