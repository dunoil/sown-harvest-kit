import {
  Canvas,
  Circle,
  Column,
  Heading,
  Path,
  Row,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { harvest } from "../src/data/harvest";
import type { HarvestWeek, ProduceItem } from "../src/data/harvest";
import { sownTheme } from "../src/theme";
import { HarvestMark } from "../src/components/shared";

/**
 * OUTPUT 4 — The weekly recipe card (Canvas root, 1080 x 1350 -> PNG).
 *
 * A portrait social card for the week's hero crop, rendered on the server
 * with renderImage() — no screenshot service, no browser, no network.
 * Fonts and images are passed in as bytes by scripts/render.tsx; when no
 * font files are present the script still writes this template's HTML via
 * render() and reports exactly what the PNG step needs.
 *
 * One card is generated per crop in the batch run (8 cards per week),
 * each carrying the same HarvestMark as the email, page and slip.
 * Content is grouped in three bands spread by justifyContent, so the
 * portrait frame is composed top-to-bottom with no dead space.
 */
export function RecipeCanvas({
  week = harvest,
  item = harvest.items[0],
}: {
  week?: HarvestWeek;
  item?: ProduceItem;
}) {
  return (
    <Canvas
      theme={sownTheme}
      width={1080}
      height={1350}
      title={`${item.recipe} — ${week.farm}`}
      lang="en"
      style={{ padding: 72, gap: 28, justifyContent: "space-between" }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <HarvestMark items={week.items} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text
            style={{
              fontFamily: token("fonts.heading"),
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            SOWN ACRES
          </Text>
          <Text style={{ fontSize: 20, color: token("colors.muted") }}>
            {week.weekLabel} · Recipe card
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 28 }}>
        <Svg width={936} height={300} viewBox="0 0 936 300" title="Crop rows at sunset">
          <Circle cx={760} cy={80} r={52} style={{ fill: "#e9a426" }} />
          <Path
            d="M0 200 Q 234 140 468 200 T 936 200 V300 H0 Z"
            style={{ fill: "#2e5a34" }}
          />
          <Path
            d="M0 240 Q 234 190 468 240 T 936 240 V300 H0 Z"
            style={{ fill: item.colour }}
          />
        </Svg>

        <Text style={{ apply: ["eyebrow"], fontSize: 20 }}>
          This week, cook the {item.name.toLowerCase()}
        </Text>
        <Heading level={1} style={{ fontSize: 64, lineHeight: 1.15 }}>
          {item.recipe}
        </Heading>
        <Text style={{ fontSize: 28 }}>
          {item.variety} · {item.quantity} in your box · {item.recipeTime}
        </Text>
        <Column
          style={{
            backgroundColor: token("colors.paper"),
            border: { width: 2, style: "solid", color: item.colour },
            borderRadius: 16,
            padding: 28,
            gap: 8,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 24 }}>Keep it well</Text>
          <Text style={{ fontSize: 24 }}>{item.storage}</Text>
        </Column>
      </Column>

      <Column style={{ gap: 16 }}>
        <HarvestMark items={week.items} cell={22} />
        <Text style={{ fontSize: 20, color: token("colors.muted") }}>
          Eight crops, eight cards — one for every crop in the box.{" "}
          {week.farm} · Picked {week.harvestDate} · One harvest file made
          this card, the email, the box page and the packing slip.
        </Text>
      </Column>
    </Canvas>
  );
}

RecipeCanvas.PreviewProps = { week: harvest, item: harvest.items[0] };
export default RecipeCanvas;
