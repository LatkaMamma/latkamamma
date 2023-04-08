import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Autoheight from 'embla-carousel-auto-height';
import { Carousel } from '@mantine/carousel';
import { MantineGradient, Title } from '@mantine/core';
import { useTheme } from '@emotion/react';

export default function Maincarousel() {
    const autoplay = useRef(Autoplay({ delay: 3000, playOnInit: true }));
    const autoheight = useRef(Autoheight());
    const theme= useTheme()

    return (
        <Carousel
            plugins={[autoplay.current, autoheight.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            mx="auto"
            sx={{ textAlign: 'center' }}
            loop
            withControls={false}
        >
            <Carousel.Slide>
                <Title

                color="pink"
                >
                    LätkäMamma
                </Title>
            </Carousel.Slide>
            <Carousel.Slide>
                <Title

                variant="gradient"
                >
                    Rakkaudesta Lajiin
                </Title>
            </Carousel.Slide>
            <Carousel.Slide>
                <Title

                variant="gradient"
                >
                    LätkäMamma
                </Title>
            </Carousel.Slide>
            <Carousel.Slide>
                <Title

                variant="gradient"
                >
                    Jokaisen Pelaajan Puolesta
                </Title>
            </Carousel.Slide>
        </Carousel>
    );
}
