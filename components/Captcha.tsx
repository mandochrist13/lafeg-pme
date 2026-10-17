"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";

type Props = {
  /** Reçoit le jeton Turnstile à vérifier côté serveur. */
  onVerify?: (token: string) => void;
};

export default function Captcha({ onVerify }: Props) {
  const [token, setToken] = useState("");

  return (
    <div>
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
        theme="light"
        execution="render"
        onVerify={(t) => {
          setToken(t);
          onVerify?.(t);
        }}
      />
      <p className="mt-2 hidden text-sm">Token : {token || "Aucun"}</p>
    </div>
  );
}
