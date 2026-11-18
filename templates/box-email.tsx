import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Text,
} from "@hyper-elements/react";
import { harvest, sampleSubscriber } from "../src/data/harvest";
import type { HarvestWeek, Subscriber } from "../src/data/harvest";
import { sownTheme } from "../src/theme";
import {
  BoxContentsTable,
  FieldNote,
  KitFooter,
  PickupDetails,
  StorageList,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1 — The weekly box email (Email root, 600px).
 *
 * Email-safe by construction: tables underneath, no Svg, no remote images,
 * no reliance on justifyContent. A subscriber whose client blocks images
 * still sees the full HarvestMark, because it is a Grid of Columns.
 * MergeTag carries the subscriber's name in the sending provider's syntax.
 */
export function BoxEmail({
  week = harvest,
  subscriber = sampleSubscriber,
}: {
  week?: HarvestWeek;
  subscriber?: Subscriber;
}) {
  return (
    <Email
      theme={sownTheme}
      width={600}
      previewText={`Your ${week.weekLabel} box is packed — ${week.items.length} crops, picked ${week.harvestDate}.`}
      title={`Your Sown Acres box — ${week.weekLabel}`}
      lang="en"
      style={{ gap: 16 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark harvest={week} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Your box is packed, <MergeTag name="first_name" />
        </Heading>
        <FieldNote harvest={week} />
        <PickupDetails subscriber={subscriber} />
        <BoxContentsTable items={week.items} />
        <Button href="https://sownacres.example/box/this-week">
          See this week's box &amp; recipes
        </Button>
        <Text style={{ apply: ["quiet"] }}>
          Need to swap something or skip a week? Reply to this email before
          Thursday noon and we will sort the box, not a ticket queue.
        </Text>
      </Column>

      <Column style={{ apply: ["card"] }}>
        <StorageList items={week.items} />
      </Column>

      <KitFooter harvest={week} />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You are receiving this because you subscribe to Sown Acres.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

BoxEmail.PreviewProps = { week: harvest, subscriber: sampleSubscriber };
export default BoxEmail;
