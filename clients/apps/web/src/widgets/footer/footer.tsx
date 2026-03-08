import { Footer as GravityFooter } from '@gravity-ui/navigation';

import styles from './footer.module.scss';
import { projectConfig } from '~infra/system';

export const Footer = () => (
    <GravityFooter
        className={styles.footer}
        withDivider={true}
        copyright={`© ${new Date().getFullYear()} TheWitcher1991`}
        logo={{
            iconSize: 22,
            textSize: 16,
            icon: projectConfig.icon,
            text: projectConfig.name,
            className: styles.text,
            iconClassName: styles.aside,
        }}
    />
);