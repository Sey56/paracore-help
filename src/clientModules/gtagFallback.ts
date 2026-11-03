/**
 * Keeps `window.gtag` callable so client-side navigation never throws.
 *
 * WHY THIS EXISTS
 * `@docusaurus/plugin-google-gtag` registers a client module whose `onRouteDidUpdate`
 * calls `window.gtag('set', 'page_path', …)` and `window.gtag('event', 'page_view')`
 * inside a `setTimeout` — on EVERY route change. The tag itself is injected as a head
 * script (`function gtag(){dataLayer.push(arguments);}` plus the googletagmanager
 * loader). When that script is not on the page — `docusaurus start`, or any browser or
 * extension that blocks googletagmanager — the call throws
 * `TypeError: window.gtag is not a function` as an UNCAUGHT error, which the dev overlay
 * presents as a page-level crash on every click. A refresh clears it only because the
 * failing call is a route update, not a render, so the first paint is unaffected.
 *
 * WHAT IT DOES
 * Defines a queueing no-op, which is exactly what Google's own snippet is before the
 * library arrives: events are pushed onto `dataLayer` and sent if the real library loads.
 *
 * ⚠ It is a fallback, not a replacement. Client modules run AFTER head scripts, so when
 * the real gtag is present this guard sees a function and leaves it untouched — analytics
 * behave exactly as before on a page where the tag loads.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
}

export {};
