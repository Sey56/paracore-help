import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import GetInTouch from '@site/src/components/GetInTouch';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Dynamic C# automation inside Revit
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation">
            Install
          </Link>
          <Link
            className="button button--outline button--lg margin-left--md"
            style={{ color: 'white', borderColor: 'white' }}
            to="/docs/tutorials/one-line-wins">
            Try one line
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
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
      title="Paracore — dynamic C# automation for Revit"
      description="Run C# inside Autodesk Revit with instant results. No compile step, no restart.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <GetInTouch />
      </main>
    </Layout>
  );
}
