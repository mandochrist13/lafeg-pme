let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // 🔒 Liste précisément ton front, pas "*"
          { key: "Access-Control-Allow-Origin", value: "https://guide-numerique.lafeg.ga" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Les erreurs de types ne sont plus ignorées : ce drapeau masquait de vrais
    // bugs (signatures de routes, props de pages, props de composants).
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // `webpackBuildWorker`, `parallelServerCompiles` et `parallelServerBuildTraces`
    // sont retirés : sur Node 24 / Windows ils faisaient planter le worker de build
    // de façon intermittente (STATUS_STACK_BUFFER_OVERRUN / WasmHash). Ils
    // n'accéléraient que la compilation, sans effet sur le comportement du site.
    serverActions: {
      bodySizeLimit: '15mb',
    }
  },
  transpilePackages: ['swagger-ui-react'],
  
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
