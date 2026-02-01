import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Dynamic Script Execution',
    Svg: require('@site/static/img/play-icon.svg').default,
    description: (
      <>
        Execute C# scripts directly in Revit without compiling or reloading. Get instant feedback and see your changes live. Paracore streamlines your development workflow, making Revit automation faster and more interactive.
      </>
    ),
  },
  {
    title: 'Powerful VSCode Integration',
    Svg: require('@site/static/img/vscode-icon.svg').default,
    description: (
      <>
        Edit your scripts with the full power of VSCode. Paracore provides a seamless, one-click workflow to open your scripts in a fully configured environment with IntelliSense for the Revit API, code completion, and live-syncing of your changes back to Paracore.
      </>
    ),
  },
  {
    title: 'Instant UI Generation',
    Svg: require('@site/static/img/list-icon.svg').default,
    description: (
      <>
        Turn every script into a professional Revit add-in. Paracore's Parameter Engine automatically generates interactive UI controls like dropdowns, multi-select checkboxes, and sliders directly from your C# properties, giving your tools a polished interface with zero UI code.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
