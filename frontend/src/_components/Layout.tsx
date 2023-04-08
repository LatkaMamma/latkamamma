import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import App from "./App";
import { modals } from "./modals";
import NewsletterButton from "./NewsletterButton";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ModalsProvider modals={modals}>
            <Notifications position="top-center" zIndex={100}>
                <App>
                    {children}
                    <NewsletterButton/>
                </App>
            </Notifications>
        </ModalsProvider>
    )
}
