import type { ReactNode } from 'react';
import styles from './styles.module.css';

// Helper to track events in Google Analytics
function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

/**
 * The homepage's only call to action: custom automation enquiries.
 *
 * An email-signup card was removed on 2026-11-08; do not add it back.
 * The YouTube channel and the release notes are the update channels.
 */
export default function GetInTouch(): ReactNode {
  return (
    <section className={styles.consultingSection}>
      <div className={styles.consultingCard}>
        <h3 className={styles.consultingTitle}>
          🏗️ Need Custom Revit Automation?
        </h3>
        <p className={styles.consultingText}>
          We build tailored C# automation solutions for architecture and engineering firms.
          Clash detection, model auditing, bulk operations, and more — delivered fast.
        </p>
        <a
          href="mailto:codarch46@gmail.com?subject=Custom%20Revit%20Automation%20Inquiry"
          className={styles.consultingLink}
          onClick={() => trackEvent('consulting_inquiry', { source: 'homepage' })}
        >
          Get in Touch →
        </a>
      </div>
    </section>
  );
}
