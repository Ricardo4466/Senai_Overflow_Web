import { useEffect, useRef, useCallback } from "react";
import { GoogleSignInShell, GoogleButtonHost } from "./styles";

const SCRIPT_ID = "google-gsi-client";

/**
 * @param {{ onCredential: (jwt: string) => void }} props
 */
function GoogleSignInButton({ onCredential }) {
  const shellRef = useRef(null);
  const hostRef = useRef(null);
  const handlerRef = useRef(onCredential);
  handlerRef.current = onCredential;

  const gsiReadyRef = useRef(false);
  const lastWidthRef = useRef(0);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const renderGoogleButton = useCallback(() => {
    const host = hostRef.current;
    const shell = shellRef.current;
    if (!host || !shell || !clientId) return;

    const g = window.google;
    if (!g?.accounts?.id) return;

    const innerW = Math.max(0, shell.clientWidth - 8);
    const w = Math.min(400, Math.max(240, Math.floor(innerW)));
    if (innerW < 100) return;

    if (
      host.childNodes.length > 0 &&
      Math.abs(w - lastWidthRef.current) < 6
    ) {
      return;
    }
    lastWidthRef.current = w;
    host.innerHTML = "";

    if (!gsiReadyRef.current) {
      g.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => {
          if (res.credential) handlerRef.current(res.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      gsiReadyRef.current = true;
    }

    g.accounts.id.renderButton(host, {
      type: "standard",
      theme: "filled_black",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      width: w,
      locale: "pt-BR",
      logo_alignment: "left",
    });
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return undefined;

    const hostNode = hostRef.current;
    let canceled = false;
    let resizeObserver;

    const attachResize = () => {
      if (!shellRef.current || canceled) return;
      renderGoogleButton();
      resizeObserver = new ResizeObserver(() => {
        if (!canceled) renderGoogleButton();
      });
      resizeObserver.observe(shellRef.current);
    };

    const onGsiLoaded = () => {
      if (canceled) return;
      gsiReadyRef.current = false;
      lastWidthRef.current = 0;
      attachResize();
    };

    if (window.google?.accounts?.id) {
      onGsiLoaded();
    } else {
      let script = document.getElementById(SCRIPT_ID);
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = onGsiLoaded;
        document.body.appendChild(script);
      } else {
        script.addEventListener("load", onGsiLoaded, { once: true });
      }
    }

    return () => {
      canceled = true;
      resizeObserver?.disconnect();
      gsiReadyRef.current = false;
      lastWidthRef.current = 0;
      if (hostNode) hostNode.innerHTML = "";
    };
  }, [clientId, renderGoogleButton]);

  if (!clientId) return null;

  return (
    <GoogleSignInShell ref={shellRef}>
      <GoogleButtonHost ref={hostRef} />
    </GoogleSignInShell>
  );
}

export default GoogleSignInButton;
