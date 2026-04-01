import { Container } from "./styles";

import { getActiveBranding } from "../../theme/branding";

function Loading() {
  const { logo, logoAlt } = getActiveBranding();
  return (
    <Container>
      <img
        src={logo}
        alt={logoAlt}
        width={96}
        height={96}
        decoding="async"
      />
      Carregando...
    </Container>
  );
}

export default Loading;
