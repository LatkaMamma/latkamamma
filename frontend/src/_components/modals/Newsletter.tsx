import { notifications } from '@consts';
import { Anchor, Box, Button, Checkbox, Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconAt, IconMailFast } from '@tabler/icons-react';


interface FormValues {
    email: string;
    fname: string;
    lname: string;
    privacyConsent: boolean;
}



export function Newsletter({ context, id, innerProps }: ContextModalProps) {

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            fname: '',
            lname: '',
            privacyConsent: false
        },
        validate: {
            email: (value) => {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
            },
            privacyConsent: (value) => {
                if (!value) return 'Please accept the privacy policy';
            },
            fname: (value) => {
                if (!value) return 'Please enter your first name';
            },
            lname: (value) => {
                if (!value) return 'Please enter your last name';
            }
        }
    });

    const handleSubmit = async () => {
        if (form.isValid()) {
            const response = await fetch('/api/mail/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form.values)
            });
            if (!response.ok) {
                console.error(response);
                showNotification(notifications.error());
            } else {
                const json = await response.json();
                console.log(json);
                showNotification(notifications.success('Thank you for subscribing!'));
                context.closeModal(id);
            }
        }
    };
    return (
        <>

            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Grid justify="center" align={"center"}>
                        <Grid.Col span={12}>
                            <TextInput
                                icon={<IconAt />}
                                placeholder='example@email.com'
                                radius="lg"
                                withAsterisk
                                {...form.getInputProps('email')}
                                onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder='First Name'
                                withAsterisk
                                radius="lg"
                                {...form.getInputProps('fname')}
                                onChange={(e) => form.setFieldValue('fname', e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder='Last Name'
                                withAsterisk
                                radius="lg"
                                {...form.getInputProps('lname')}
                                onChange={(e) => form.setFieldValue('lname', e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span="content">
                            <Checkbox
                                {...form.getInputProps('privacyConsent')}
                                onChange={(e) => form.setFieldValue('privacyConsent', e.currentTarget.checked)}
                                color='pink'
                                label={
                                    <>
                                        I have read and agree to the{' '}
                                        <Anchor href="/privacy" target="_blank" color="blue">
                                            Privacy Policy
                                        </Anchor>
                                    </>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span="content">
                            <Button leftIcon={<IconMailFast />} variant="gradient" gradient={{ from: 'pink', to: 'violet' }} type='submit'>Send</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Box>

        </>
    );
}

