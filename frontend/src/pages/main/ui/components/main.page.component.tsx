import {
    Box,
    Button,
    Center,
    Container,
    Group,
    Image,
    Paper,
    Stack,
    Text,
    Title
} from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    RawKeysWidget,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    SubscriptionLinkWidget,
    TimelineBlockRenderer
} from '@widgets/main'
import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'
import { Page } from '@shared/ui'

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

const BLOCK_RENDERERS = {
    cards: CardsBlockRenderer,
    timeline: TimelineBlockRenderer,
    accordion: AccordionBlockRenderer,
    minimal: MinimalBlockRenderer
} as const

const SUBSCRIPTION_INFO_BLOCK_RENDERERS = {
    cards: SubscriptionInfoCardsWidget,
    collapsed: SubscriptionInfoCollapsedWidget,
    expanded: SubscriptionInfoExpandedWidget,
    hidden: null
} as const

const TELEGRAM_COPY = {
    ru: {
        eyebrow: 'БЕРЕГ В TELEGRAM',
        title: 'Всё управление — в одном месте',
        description:
            'Оформляйте и продлевайте подписку в боте. Если что-то не подключается — поддержка рядом.',
        bot: 'Открыть бот',
        support: 'Написать в поддержку'
    },
    en: {
        eyebrow: 'BEREG ON TELEGRAM',
        title: 'Everything you need in one place',
        description:
            'Manage and renew your subscription in the bot. If something does not connect, support is one tap away.',
        bot: 'Open bot',
        support: 'Contact support'
    },
    zh: {
        eyebrow: 'TELEGRAM 上的 BERег',
        title: '所有管理都在一个地方',
        description: '在机器人中管理和续订订阅。如遇连接问题，可直接联系支持。',
        bot: '打开机器人',
        support: '联系支持'
    }
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

    const brandName = config.brandingSettings.title || 'Берег'
    const telegramCopy = TELEGRAM_COPY[currentLang as keyof typeof TELEGRAM_COPY] ?? TELEGRAM_COPY.ru

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    const SubscriptionInfoBlockRenderer =
        SUBSCRIPTION_INFO_BLOCK_RENDERERS[config.uiConfig.subscriptionInfoBlockType]

    return (
        <Page>
            <Box className="header-wrapper" py="md">
                <Container maw={1200} px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                    <Group justify="space-between">
                        <Group gap="sm" style={{ userSelect: 'none' }} wrap="nowrap">
                            <Image
                                alt="Берег"
                                fit="contain"
                                src="/assets/bereg-mark.svg"
                                style={{
                                    width: '34px',
                                    height: '34px',
                                    flexShrink: 0
                                }}
                            />
                            <Title c="white" fw={700} order={4} size="lg">
                                {brandName}
                            </Title>
                        </Group>

                        <SubscriptionLinkWidget
                            hideGetLink={config.baseSettings.hideGetLinkButton}
                            supportUrl="https://t.me/PribrezhnySupport"
                        />
                    </Group>
                </Container>
            </Box>

            <Container
                maw={1200}
                px={{ base: 'md', sm: 'lg', md: 'xl' }}
                py="xl"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Stack gap="xl">
                    {SubscriptionInfoBlockRenderer && (
                        <SubscriptionInfoBlockRenderer isMobile={isMobile} />
                    )}

                    <Paper className="bereg-telegram-card" p={{ base: 'lg', sm: 'xl' }} radius="xl">
                        <Stack gap="sm">
                            <Text className="bereg-eyebrow" fw={700} size="xs">
                                {telegramCopy.eyebrow}
                            </Text>
                            <Title order={3}>{telegramCopy.title}</Title>
                            <Text c="dimmed" maw={720} size="sm">
                                {telegramCopy.description}
                            </Text>
                            <Group gap="sm" mt="xs">
                                <Button
                                    component="a"
                                    href="https://t.me/PribrezhnyBot"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {telegramCopy.bot}
                                </Button>
                                <Button
                                    color="gray"
                                    component="a"
                                    href="https://t.me/PribrezhnySupport"
                                    rel="noreferrer"
                                    target="_blank"
                                    variant="light"
                                >
                                    {telegramCopy.support}
                                </Button>
                            </Group>
                        </Stack>
                    </Paper>

                    {atLeastOnePlatformApp && (
                        <InstallationGuideConnector
                            BlockRenderer={
                                BLOCK_RENDERERS[config.uiConfig.installationGuidesBlockType]
                            }
                            hasPlatformApps={hasPlatformApps}
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}

                    <RawKeysWidget isMobile={isMobile} />

                    <Center>
                        <LanguagePicker
                            currentLang={currentLang}
                            locales={config.locales}
                            onLanguageChange={setLanguage}
                        />
                    </Center>
                </Stack>
            </Container>
        </Page>
    )
}
