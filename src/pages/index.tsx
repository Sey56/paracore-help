import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import NewsletterSignup from '@site/src/components/NewsletterSignup';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to {siteConfig.title}:
          <br />
          Dynamic C# Revit API Automation
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/release-notes">
            What's New
          </Link>
          <Link
            className="button button--outline button--lg margin-left--md"
            style={{ color: 'white', borderColor: 'white' }}
            to="https://www.youtube.com/@Codarch46">
            Paracore YouTube
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Paracore brings the full power of the Revit API to a professional, dynamic C# execution environment with instant UI generation, VS Code integration, and an interactive REPL.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <NewsletterSignup />
      </main>
    </Layout>
  );
}
