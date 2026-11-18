import {
  Button,
  Circle,
  Column,
  Grid,
  Heading,
  Page,
  Path,
  Row,
  Section,
  Svg,
  Text,
} from "@hyper-elements/react";
import { harvest } from "../src/data/harvest";
import type { HarvestWeek } from "../src/data/harvest";
import { sownTheme } from "../src/theme";
import { ProduceCard } from "../src/components/produce-card";
import {
  FieldNote,
  HarvestMark,
  KitFooter,
} from "../src/components/shared";

/**
 * OUTPUT 2 — The public box page (Page root, 1100px).
 *
 * The one output allowed to be lush: full Svg field art (Svg is not allowed
 * in an Email, so the art lives here and on the Canvas), a Grid of typed
 * ProduceCards, and phone styles throughout. No client-side JavaScript —
 * render() writes a complete responsive document.
 */
export function BoxPage({ week = harvest }: { week?: HarvestWeek }) {
  const [feature, ...rest] = week.items;
  return (
    <Page
      theme={sownTheme}
      width={1100}
      title={`This week's box — ${week.farm}`}
      description={`${week.weekLabel} at ${week.farm}: ${week.items.length} crops, one harvest, every box.`}
      lang="en"
    >
      <Section
        tokens={{ colors: { background: "#223d27", foreground: "#f7f3ea" } }}
        style={{ padding: [44, 32], gap: 18 }}
      >
        <Row style={{ gap: 24, alignItems: "center" }}>
          <Column style={{ gap: 14 }}>
            {/* Eyebrow in marigold here: the theme eyebrow green is 1.48:1
                on the moss band (lint-contrast) — the band needs the accent. */}
            <Text
              style={{
                color: "#e9a426",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {week.weekLabel}
            </Text>
            <Heading level={1} style={{ fontSize: 46, mobile: { fontSize: 30 } }}>
              One harvest. Every box.
            </Heading>
            <Text style={{ fontSize: 17 }}>
              {week.items.length} crops picked on {week.harvestDate}, packed
              into every subscriber box — and rendered from a single harvest
              file into this page, the weekly email, the packing slips and
              the recipe cards.
            </Text>
            <Row style={{ gap: 12 }}>
              <Button href="https://sownacres.example/subscribe">
                Join the harvest
              </Button>
              <Button
                href="https://sownacres.example/box/this-week#recipes"
                variant="secondary"
                style={{ color: "#1c2a1e" }}
              >
                This week's recipes
              </Button>
            </Row>
          </Column>
          <Column style={{ width: 300 }}>
            {/* Field art: sun over crop rows. Svg lives on Page/Canvas only. */}
            <Svg width={300} height={220} viewBox="0 0 300 220" title="Sun over crop rows">
              <Circle cx={228} cy={52} r={30} style={{ fill: "#e9a426" }} />
              <Path
                d="M0 150 Q 75 110 150 150 T 300 150 V220 H0 Z"
                style={{ fill: "#2e5a34" }}
              />
              <Path
                d="M0 175 Q 75 140 150 175 T 300 175 V220 H0 Z"
                style={{ fill: "#3e7c3a" }}
              />
              <Path
                d="M0 200 Q 75 172 150 200 T 300 200 V220 H0 Z"
                style={{ fill: "#c8432b", opacity: 0.85 }}
              />
            </Svg>
            <HarvestMark items={week.items} cell={14} />
            <Text style={{ fontSize: 12 }}>
              The harvest strip: one cell per crop, in harvest order — the
              same mark your email and packing slip carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 32], gap: 20 }}>
        <FieldNote harvest={week} />
        <Heading level={2}>In the box</Heading>
        <Grid columns={3} style={{ gap: 16, rowGap: 16 }}>
          <ProduceCard
            name={feature.name}
            variety={feature.variety}
            quantity={feature.quantity}
            colour={feature.colour}
            ink={feature.ink}
            storage={feature.storage}
            recipe={feature.recipe}
            recipeTime={feature.recipeTime}
            size="feature"
          />
          {rest.map((item) => (
            <ProduceCard
              key={item.id}
              name={item.name}
              variety={item.variety}
              quantity={item.quantity}
              colour={item.colour}
              ink={item.ink}
              storage={item.storage}
              recipe={item.recipe}
              recipeTime={item.recipeTime}
            />
          ))}
        </Grid>
      </Section>

      <Section style={{ padding: [8, 32, 36, 32] }}>
        <KitFooter harvest={week} />
      </Section>
    </Page>
  );
}

BoxPage.PreviewProps = { week: harvest };
export default BoxPage;
