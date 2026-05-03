import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * Newsletter signup component using Mailchimp Embedded Forms
 * 
 * Setup:
 * 1. Log in to mailchimp.com
 * 2. Go to Audience → Signup forms → Embedded forms
 * 3. Copy the form action URL and paste it in MAILCHIMP_ACTION below
 * 4. Copy the hidden input name for "u" and "id" values
 * 
 * Your subscriber list is managed at:
 *   mailchimp.com → Audience → All contacts
 * 
 * To send a campaign:
 *   mailchimp.com → Campaigns → Create Campaign → Email
 */

// ─── MAILCHIMP CONFIGURATION ─────────────────────────────────────────
// Replace these with your actual Mailchimp values from Audience → Signup forms → Embedded forms
const MAILCHIMP_ACTION = 'https://github.us5.list-manage.com/subscribe/post';
const MAILCHIMP_U = '0554edde781e60336895a89db';
const MAILCHIMP_ID = 'cb80781e09';
// ─────────────────────────────────────────────────────────────────────

// Helper to track events in Google Analytics
function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

export default function NewsletterSignup(): ReactNode {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <span className={styles.icon}>✅</span>
          <h3 className={styles.title}>You're In!</h3>
          <p className={styles.subtitle}>
            Thank you for subscribing. You'll receive Paracore updates, 
            automation tips, and new script announcements directly in your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="subscribe" className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <span className={styles.icon}>📬</span>
          <h3 className={styles.title}>Stay in the Loop</h3>
          <p className={styles.subtitle}>
            Get notified about new releases, Revit automation tips, and ready-to-use 
            scripts. Join the Paracore community — no spam, unsubscribe anytime.
          </p>
          <form
            className={styles.form}
            action={`${MAILCHIMP_ACTION}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`}
            method="POST"
            target="_blank"
            onSubmit={() => {
              trackEvent('newsletter_signup', { method: 'mailchimp' });
              setSubmitted(true);
            }}
          >
            {/* Mailchimp bot protection — do not remove */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="b_0554edde781e60336895a89db_cb80781e09" tabIndex={-1} defaultValue="" />
            </div>
            
            <input
              type="email"
              name="EMAIL"
              className={styles.emailInput}
              placeholder="your@email.com"
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.submitButton}>
              Subscribe
            </button>
          </form>
          <p className={styles.privacy}>
            🔒 Your email is safe. We never share it with anyone.
          </p>
        </div>
      </section>

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
    </>
  );
}
