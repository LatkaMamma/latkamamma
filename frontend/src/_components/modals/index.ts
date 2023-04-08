import { Newsletter } from "./Newsletter";

export const modals = {
    newsletter: Newsletter
}
declare module '@mantine/modals' {
    export interface MantineModalsOverride {
        modals: typeof modals;
    }
}
