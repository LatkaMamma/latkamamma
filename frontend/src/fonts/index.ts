import { Yrsa, Rochester }from '@next/font/google';

export const yrsa = Yrsa({
    variable: '--font-yrsa',
    weight: 'variable',
    subsets: ['latin'],
});

export const rochester = Rochester({
    variable: '--font-rochester',
    weight: '400',
    subsets: ['latin'],
});

export const yrsaStyle = {'@font-face': yrsa.style}

export const rochesterStyle = {'@font-face': rochester.style}

const fonts = {
    yrsa,
    rochester,
}

export default fonts;
