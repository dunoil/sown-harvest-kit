import {
  Column,
  Divider,
  Grid,
  Heading,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { HarvestWeek, ProduceItem, Subscriber } from "../data/harvest";

/**
 * Shared components — the reason the emailed box, the web box, the printed
 * packing slip and the recipe card are THE SAME box, not four lookalikes.
 * Every component here returns built-in elements only, so it renders
 * identically under Email, Page, Document and Canvas roots.
 */

export function Wordmark({ harvest }: { harvest: HarvestWeek }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <HarvestMark items={harvest.items} cell={9} />
      <Column style={{ gap: 0 }}>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          SOWN ACRES
        </Text>
        <Text style={{ apply: ["quiet"] }}>{harvest.weekLabel}</Text>
      </Column>
    </Row>
  );
}

/**
 * HarvestMark — the SOWN signature.
 * An 8-cell harvest strip, one cell per crop, in harvest order.
 *
 * Built from layout primitives ON PURPOSE: an Email cannot hold an Svg,
 * so the mark is a Grid of coloured Columns. The same component therefore
 * survives in every inbox — even with remote images blocked — and flips
 * unchanged into the Page, the packing slip and the recipe card.
 */
export function HarvestMark({
  items,
  cell = 12,
}: {
  items: ProduceItem[];
  cell?: number;
}) {
  return (
    <Grid columns={4} stackOnMobile={false} style={{ gap: 3, width: cell * 4 + 9 }}>
      {items.map((item) => (
        <Column
          key={item.id}
          style={{
            backgroundColor: item.colour,
            width: cell,
            height: cell,
            borderRadius: 2,
          }}
        />
      ))}
    </Grid>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

export function FieldNote({ harvest }: { harvest: HarvestWeek }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>From the field</Eyebrow>
      <Text style={{ fontSize: token("fontSizes.lead"), lineHeight: 1.55 }}>
        {harvest.fieldNote}
      </Text>
      <Text style={{ apply: ["quiet"] }}>
        Harvested {harvest.harvestDate} · {harvest.farmLine}
      </Text>
    </Column>
  );
}

/** The box contents as data — shared by the email, the page and the slip. */
export function BoxContentsTable({ items }: { items: ProduceItem[] }) {
  return (
    <Table style={{ cellPadding: [9, 0], rowBorder: "1px solid #ddd6c2" }}>
      <TableRow header>
        <TableCell>In your box</TableCell>
        <TableCell>Variety</TableCell>
        <TableCell style={{ textAlign: "right" }}>Qty</TableCell>
      </TableRow>
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <Span style={{ fontWeight: 700, color: item.ink }}>{item.name}</Span>
          </TableCell>
          <TableCell>{item.variety}</TableCell>
          <TableCell style={{ textAlign: "right" }}>{item.quantity}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export function PickupDetails({ subscriber }: { subscriber: Subscriber }) {
  return (
    <Column
      style={{
        backgroundColor: token("colors.background"),
        padding: 18,
        gap: 6,
        borderRadius: token("radii.card"),
      }}
    >
      <Row style={{ gap: 12 }} stackOnMobile={false}>
        <Column>
          <Text style={{ fontWeight: 700 }}>Your box {subscriber.boxId}</Text>
          <Text>
            {subscriber.boxSize} box · {subscriber.pickupPoint}
          </Text>
        </Column>
        <Column style={{ alignItems: "end" }}>
          <Text style={{ apply: ["stamp"] }}>Packed</Text>
        </Column>
      </Row>
      <Text style={{ apply: ["quiet"] }}>Pickup: {subscriber.pickupWindow}</Text>
      {subscriber.swaps.length > 0 ? (
        <Text style={{ apply: ["quiet"] }}>
          Swaps applied: {subscriber.swaps.join(", ")}
        </Text>
      ) : null}
    </Column>
  );
}

export function StorageList({ items }: { items: ProduceItem[] }) {
  return (
    <Column style={{ gap: 10 }}>
      <Heading level={2}>Keep it well</Heading>
      {items.map((item) => (
        <Row key={item.id} style={{ gap: 10 }} stackOnMobile={false}>
          <Column
            style={{
              backgroundColor: item.colour,
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <Column>
            <Text>
              <Span style={{ fontWeight: 700 }}>{item.name} — </Span>
              {item.storage}
            </Text>
          </Column>
        </Row>
      ))}
    </Column>
  );
}

export function KitFooter({ harvest }: { harvest: HarvestWeek }) {
  return (
    <Column style={{ gap: 8, alignItems: "center" }}>
      <Divider />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        {harvest.farm} · Grown without sprays · Packed in paper, never plastic
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One harvest file rendered this — email, page, packing slip and recipe
        card — with Hyper Elements.
      </Text>
    </Column>
  );
}
