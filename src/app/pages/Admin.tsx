import { Studio } from 'sanity';
import config from '../../sanity/sanity.config';

export function Admin() {
    return (
        <div style={{ height: '100vh', zIndex: 9999, position: 'relative' }}>
            <Studio config={config} />
        </div>
    );
}
