import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { harvest, sampleSubscriber } from "../src/data/harvest";
import type { HarvestWeek, Subscriber } from "../src/data/harvest";
import { sownTheme } from "../src/theme";
import {
  BoxContentsTable,
  HarvestMark,
  PickupDetails,
} from "../src/components/shared";

/**
 * OUTPUT 3 — Packing slips + box invoice (Document root, A4 -> PDF).
 *
 * A real print job, not a screenshot of a web page:
 * - PageHeader / PageFooter with PageNumber on every sheet
 * - one Document.Page per subscriber box in the batch run
 * - dashed "packed" stamp, collation code (box id) large enough to read
 *   across a packing barn, and the same HarvestMark as the email
 * render() gives print HTML; renderPdf() (scripts/render.ts) gives the PDF
 * with no browser involved.
 */
export function PackingDocument({
  week = harvest,
  boxes = [sampleSubscriber],
}: {
  week?: HarvestWeek;
  boxes?: Subscriber[];
}) {
  return (
    <Document
      theme={sownTheme}
      size="A4"
      orientation="portrait"
      margin={42}
      title={`Sown Acres packing slips — ${week.weekLabel}`}
      lang="en"
    >
      <PageHeader style={{ padding: [0, 0, 8, 0], gap: 8 }}>
        <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
          <HarvestMark items={week.items} cell={7} />
          <Text style={{ fontWeight: 700 }}>
            {week.farm} — Packing run · {week.weekLabel}
          </Text>
        </Row>
      </PageHeader>

      <PageFooter style={{ padding: [8, 0, 0, 0] }}>
        <Text style={{ fontSize: 10, color: "#546354" }}>
          Slip <PageNumber /> of <PageNumber total /> · Check the box against
          the table before sealing · {week.farmLine}
        </Text>
      </PageFooter>

      {boxes.map((box) => (
        <Document.Page key={box.boxId} style={{ gap: 16 }}>
          {/* No Wordmark here: the PageHeader already carries the mark
              and the farm line on every sheet. */}
          <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
            <Column>
              <Heading level={1} style={{ fontSize: 30 }}>
                Packing slip
              </Heading>
              <Text>
                For {box.firstName} · {box.boxSize} box · Pickup{" "}
                {week.pickupDate}
              </Text>
            </Column>
            <Column style={{ alignItems: "end" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {box.boxId}
              </Text>
              <Text style={{ apply: ["stamp"] }}>Check · Weigh · Seal</Text>
            </Column>
          </Row>

          <PickupDetails subscriber={box} />
          <BoxContentsTable items={week.items} />

          <Column style={{ gap: 6 }}>
            <Heading level={2} style={{ fontSize: 15 }}>
              Packer notes
            </Heading>
            <Text>
              Basil travels upright on top. Corn goes in first, husk on.
              Tomatoes never under potatoes. If a crop runs short, substitute
              from the extras crate and write the swap on this slip — the
              subscriber's email is corrected from the same file.
            </Text>
            <Text>
              Packed by __________ · Weight ______ kg · Sealed: [ ]
            </Text>
          </Column>

          <Column
            style={{
              border: { top: "1px dashed #546354" },
              padding: [12, 0, 0, 0],
              gap: 4,
            }}
          >
            <Text style={{ fontWeight: 700 }}>
              Thank you, {box.firstName}.
            </Text>
            <Text>
              Everything in this box was picked on {week.harvestDate}. Your
              recipe card this week: {week.items[0].recipe} (
              {week.items[0].recipeTime}).
            </Text>
          </Column>
        </Document.Page>
      ))}
    </Document>
  );
}

PackingDocument.PreviewProps = {
  week: harvest,
  boxes: [sampleSubscriber],
};
export default PackingDocument;
