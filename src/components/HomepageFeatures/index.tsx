import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  to: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Just looking',
    Svg: require('@site/static/img/play-icon.svg').default,
    to: '/docs/tutorials/one-line-wins',
    description: 'Ten copy-paste queries. See the answer in History, Analytics or the Revit view.',
  },
  {
    title: 'Teach me',
    Svg: require('@site/static/img/vscode-icon.svg').default,
    to: '/docs/tutorials',
    description: 'Eight REPL lessons, then eight Gallery lessons that build reusable tools.',
  },
  {
    title: 'I need a method',
    Svg: require('@site/static/img/list-icon.svg').default,
    to: '/docs/extension-methods',
    description: 'The full extension-method reference: signature, units and traps.',
  },
];

function Feature({title, Svg, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={to}><Svg className={styles.featureSvg} role="img" /></Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3"><Link to={to}>{title}</Link></Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
