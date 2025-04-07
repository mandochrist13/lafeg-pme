"use client";

import { useEffect, useState } from "react";
import Turnstile from "react-turnstile";

export default function Captcha() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
        onVerify={(token) => {
          setToken(token);
          console.log("Token reçu : ", token);
        }}
        options={{ theme: "light", execution: "render" as "render",  }}
      />
      <p className="mt-2 hidden text-sm">Token : {token || "Aucun"}</p>
    </div>
  );
}
