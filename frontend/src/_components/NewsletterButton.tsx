import { ModalsProvider, openContextModal } from '@mantine/modals';
import { Affix, Button, Flex, useMantineTheme } from "@mantine/core";
import { IconNews } from "@tabler/icons-react";

export default function NewsletterButton() {
    const theme = useMantineTheme();
    return (
        <Affix position={{ bottom: '20rem', right: '20rem' }}>
            <Button leftIcon={<IconNews />} variant="gradient" gradient={{ from: 'pink', to: 'violet' }} onClick={() => openContextModal({
                modal: 'newsletter',
                title: 'Subscribe to our newsletter',
                centered: true,
                overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                overlayOpacity: 0.55,
                overlayBlur: 3,
                transition: "pop-bottom-left",
                transitionDuration: 300,
                transitionTimingFunction: "ease",
                innerProps: {}
            })}>Subscribe</Button>
        </Affix>
    )
}