import {
  List,
  Card,
  Shimmer,
  Row,
  Avatar,
  Lines,
  Line,
  Block,
} from "./styles";

function FeedSkeleton({ count = 4 }) {
  const items = Array.from({ length: count });

  return (
    <List aria-hidden="true">
      {items.map((_, i) => (
        <Card key={i}>
          <Shimmer />
          <Row>
            <Avatar />
            <Lines>
              <Line $width="55%" />
              <Line $width="35%" />
            </Lines>
          </Row>
          <Line $width="88%" style={{ marginBottom: 10 }} />
          <Line $width="100%" style={{ marginBottom: 8 }} />
          <Block />
        </Card>
      ))}
    </List>
  );
}

export default FeedSkeleton;
