import { ActionIcon, Avatar, Button, Card, CardProps, Drawer, FileInput, Grid, Group, Menu, Modal, ModalProps, Space, Stack, Tabs, Text, TextInput, Title, Tooltip, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconReceipt, IconSettings, IconUpload, IconUser, IconX } from '@tabler/icons-react';

import { notifications, PrismaPublicProfile } from '@consts';
import { useDisclosure, useHover, useShallowEffect } from '@mantine/hooks';
import { RandomUser } from '@util/randomUser';
import { useS3Upload } from "next-s3-upload";
import { useRouter } from 'next/router';
import { useRef } from 'react';

export interface FormValues {
    fname: string;
    lname: string;
    image?: string;
}

interface ProfileProps {
    profile?: PrismaPublicProfile | null;
    randomUser?: RandomUser | null;
    uid?: string;
}

export const ProfileForm = ({ profile, randomUser, uid }: ProfileProps) => {
    const theme = useMantineTheme();
    const { uploadToS3, files } = useS3Upload();
    const fileInputRef = useRef<HTMLButtonElement>(null);
    const [confirmOpen, { open: setConfirmOpen, close: setConfirmClose }] = useDisclosure(false);
    const [menuOpen, { toggle: toggleMenu }] = useDisclosure(false);
    const { push } = useRouter();


    const { ref: avatarRef, hovered: avatarHovered } = useHover();
    const form = useForm<FormValues>({
        initialValues: {
            fname: profile?.fname || '',
            lname: profile?.lname || '',
            image: profile?.image || undefined,
        },
        validate: {
            fname: (value) => {
                if (!value) return 'First name is required';
            },
            lname: (value) => {
                if (!value) return 'Last name is required';
            }
        }
    });
    const hoverAndImage = avatarHovered && (!!form.values.image || !!profile?.image)
    const handleSubmit = async () => {
        if (form.isValid()) {
            const url = !!profile ? `/api/profile?id=${profile.id}` : '/api/profile';
            const data: RequestInit = {
                method: !!profile ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    !!profile
                        ? { ...form.values }
                        : { ...form.values, user_id: uid }
                )
            };
            const response = await fetch(url, data);
            if (!response.ok) {
                console.error(response);
                showNotification(notifications.error());
            } else {
                showNotification(notifications.success(
                    !!profile
                        ? 'Profile updated successfully'
                        : 'Profile created successfully'
                ));
            }
        }
    };

    const handleUpload = async (file: File | null) => {
        if (!file) {
            form.setFieldValue('image', undefined);
            return;
        }
        const { url } = await uploadToS3(file);
        form.setFieldValue('image', url);
    };


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid
                justify="center"
                align="center"
                gutter={theme.spacing.md}
            >
                <Grid.Col span={12}>
                    <Group position="center">
                        <Menu
                            withArrow
                            transitionProps={{ transition: 'slide-down' }}
                            shadow="md"
                            opened={menuOpen || avatarHovered}
                            onChange={toggleMenu}
                            width={200}>
                            <Menu.Target>
                                <Avatar
                                    ref={avatarRef}
                                    src={form.values.image}
                                    size="xl"
                                    color={avatarHovered ? hoverAndImage ? "red" : "lime" : "grape"}
                                    variant="filled"
                                    onClick={() => hoverAndImage ? setConfirmOpen() : fileInputRef.current?.click()}
                                >
                                    {
                                        avatarHovered
                                            ? hoverAndImage
                                                ? <IconX size={40} />
                                                : <IconUpload size={40} />
                                            : <IconUser size={40} />
                                    }
                                </Avatar>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Avatar</Menu.Label>

                                <Menu.Item
                                    color="green"
                                    icon={<IconUpload size={14} />}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {(form.values.image || profile?.image) ? 'Change' : 'Upload'}
                                </Menu.Item>
                                <Menu.Item color="red" onClick={setConfirmOpen} icon={<IconX size={14} />}>
                                    Remove
                                </Menu.Item>
                                {
                                    confirmOpen && (
                                        <>
                                            <Menu.Divider />
                                            <Menu.Label>Confirm</Menu.Label>
                                            <Menu.Item
                                                component="div"
                                            >
                                                <Text>Remove?</Text>
                                                <Group position="right">
                                                    <ActionIcon color="green">
                                                        <IconCheck size={14} onClick={() => {
                                                            handleUpload(null)
                                                            setConfirmClose()
                                                        }} />
                                                    </ActionIcon>
                                                    <ActionIcon color="red">
                                                        <IconX size={14} onClick={setConfirmClose} />
                                                    </ActionIcon>
                                                </Group>
                                            </Menu.Item>
                                        </>

                                    )
                                }
                            </Menu.Dropdown>
                        </Menu>
                    </Group>

                </Grid.Col>
                <Grid.Col md={12} lg={6}>
                    <TextInput
                        label="First name"
                        placeholder={randomUser?.fname}
                        required
                        {...form.getInputProps('fname')}
                    />
                </Grid.Col>
                <Grid.Col md={12} lg={6}>
                    <TextInput
                        label="Last name"
                        placeholder={randomUser?.lname}
                        required
                        {...form.getInputProps('lname')}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <FileInput
                        ref={fileInputRef}
                        label="Profile image"
                        placeholder="Profile image"
                        onChange={handleUpload}
                    />
                </Grid.Col>


            </Grid>
            <Space h="md" />

            <Group position="apart">
                <Button
                    color="red"
                    onClick={() => push('/')}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    color="teal"
                    disabled={!form.isValid()}
                >
                    Create profile
                </Button>
            </Group>
        </form>)
}


export const ProfileCreateModal = ({ uid, profile, ...modalProps }: ModalProps & ProfileProps) => {
    return (
        <Modal {...modalProps}>
            <ProfileForm {...{ uid, profile }} />
        </Modal>
    );
}

export const ProfileCreateCard = ({ uid, profile, randomUser, ...cardProps }: Omit<CardProps, 'children'> & ProfileProps) => {
    return (
        <Card {...cardProps}>
            <ProfileForm {...{ uid, profile, randomUser }} />
        </Card>
    );
}

export const Profile = ({ profile, ...rest }: ProfileProps) => {
    const { push, query } = useRouter();
    useShallowEffect(() => {
        if (!query.view) {
            push(`/user?view=profile`);
        }
    }, [query.view]);
    return (
        <Tabs
            variant="pills"
            radius="lg"
            orientation="vertical"
            value={!!profile ? 'settings' : query.view as string}
            onTabChange={(value) => push(`/user?view=${value}`)}
        >
            <Tabs.List>
                {!!profile ? [
                    (<Tabs.Tab key="profile" value="profile" icon={<IconUser size={14} />} />),
                    (<Tabs.Tab value="orders" key="orders" icon={<IconReceipt size={14} />} />)
                ] : [
                    (<Tooltip key="profile" label="Please update your profile first" color="red">
                        <Tabs.Tab value="profile" disabled icon={<IconUser size={14} />} />
                    </Tooltip>),
                    (<Tooltip key="orders" label="Please update your profile first" color="red">
                        <Tabs.Tab value="orders" disabled icon={<IconReceipt size={14} />} />
                    </Tooltip>)
                ]}
                <Tabs.Tab key="settings" value="settings" icon={<IconSettings size={14} />} />
            </Tabs.List>
            {!!profile && [
                (<Tabs.Panel key="profilePanel" value="profile">
                    <Stack align="center" justify="center">
                        <Group align="right">
                            <ActionIcon onClick={() => push('/settings')} color="teal">
                                <IconSettings size={24} />
                            </ActionIcon>
                        </Group>
                        <Avatar src={profile.image} size="xl">
                            <IconUser size={42} />
                        </Avatar>
                        <Title>{profile.fname} {profile.lname}</Title>
                    </Stack>
                </Tabs.Panel>),
                (<Tabs.Panel key="orderPanel" value="orders">
                    <Text>Orders</Text>
                </Tabs.Panel>)
            ]}
            <Tabs.Panel value="settings">
                <ProfileForm {...{ profile, ...rest }} />
            </Tabs.Panel>
        </Tabs>
    );
}

interface ProfileSettingsProps extends Required<Omit<ProfileProps, 'randomUser'>> {
    open: boolean;
    onClose: () => void;
    profile: PrismaPublicProfile;
}

export const ProfileSettings = ({ open, onClose, ...profile }: ProfileSettingsProps) => {
    return (
        <Drawer position="right" opened={open} onClose={onClose}>
            <ProfileForm {...profile} />
        </Drawer>
    );
}
