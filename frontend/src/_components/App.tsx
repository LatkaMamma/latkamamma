import { Header as MantineHeader, Flex, Menu, Button, MediaQuery, Burger, AppShell, Navbar, Text, Footer } from '@mantine/core';
import { useRouter } from 'next/router';
import { LogtoContext } from '@logto/next';
import useSWR from 'swr';
import { IconMenu } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { fetcher } from '@config/swr';

export default function App({ children }: { children: React.ReactNode }) {
    const { push } = useRouter();
    const { data } = useSWR<LogtoContext>('/api/auth/user', fetcher);
    const [opened, handlers] = useDisclosure(false);
    return (
        <AppShell
            fixed={false}
            navbarOffsetBreakpoint="sm"
            padding="md"
            header={
                <MantineHeader height={{ base: 50, md: 60 }} p="sm">
                    <Flex align="ceter" justify="center">
                        <div style={{ flexGrow: 1 }} />
                        <MediaQuery
                            smallerThan="sm"
                            styles={{
                                display: 'none',
                            }}
                        >
                            <div>

                                {
                                    data?.isAuthenticated ? (
                                        <Menu shadow="md" width={200}>
                                            <Menu.Target>
                                                <Button variant="light" color="grape">
                                                    Menu
                                                </Button>

                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item>Settings</Menu.Item>
                                                <Menu.Item onClick={() => push('/api/auth/sign-out')}>Sign out</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>

                                    ) : <Button onClick={() => push('/api/auth/sign-in')} variant="light" color="grape">Sign in</Button>
                                }
                            </div>
                        </MediaQuery>
                        <MediaQuery
                            largerThan="sm"
                            styles={{
                                display: 'none',
                            }}
                        >
                            <Burger opened={opened} onClick={handlers.toggle} />
                        </MediaQuery>

                    </Flex>
                </MantineHeader>
            }
            navbar={
                <MediaQuery
                    largerThan="sm"
                    styles={{
                        display: 'none',
                    }}
                >
                    <Navbar hidden={!opened} {...handlers}>
                        <Navbar.Section>
                            <Text>Menu</Text>
                        </Navbar.Section>
                        <Navbar.Section>
                            <Button onClick={data?.isAuthenticated ? () => push('/api/auth/sign-out') : () => push('/api/auth/sign-in')} variant="light" color="grape">{data?.isAuthenticated ? 'Sign out' : 'Sign in'}</Button>
                        </Navbar.Section>
                    </Navbar>
                </MediaQuery>
            }
            footer={
                <Footer
                    height={{ base: 50, md: 60 }}
                    p="md"
                    fixed
                >
                    <Flex h="100%" align="center" justify="space-between">
                        <Text>Footer</Text>
                        <Text>
                            &copy; {new Date().getFullYear()} LätkäMamma Oy
                        </Text>
                        <Text>Footer</Text>
                    </Flex>
                </Footer>
            }
        >
            {children}
        </AppShell>
    )
}
