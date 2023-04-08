import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
    openGraph: {
        type: 'website',
        url: 'http://localhost:3000/',
        siteName: 'LätkäMamma',
    },
    titleTemplate: '%s | LätkäMamma',
};

export default config;