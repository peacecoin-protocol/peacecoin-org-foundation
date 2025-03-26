import i18next from '@/i18next.server'
import type { Route } from './+types/developers'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import {
  DiscordIcon,
  GithubIcon,
  WhitePaperIcon,
  CircleArrowIcon,
} from '@/components/ui/icon'
import type { FC, SVGProps } from 'react'
import { PageBreadcrumb } from '@/components/composite/page-breadcrumb'
import { LINKS } from '@/constants'

const list: {
  key: string
  Icon: FC<SVGProps<SVGSVGElement>>
  href: string
}[] = [
  {
    key: 'github',
    Icon: GithubIcon,
    href: LINKS.github,
  },
  { key: 'discord', Icon: DiscordIcon, href: LINKS.discord },
  {
    key: 'whitePaper',
    Icon: WhitePaperIcon,
    href: LINKS.whitePaper,
  },
]

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'developers')
  const title = t('metaTitle')
  return { title }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'developers'],
}

export default function Developers() {
  const { t } = useTranslation('developers')
  const { t: commonT } = useTranslation('common')

  return (
    <main className="container mx-auto px-6 pt-(--gh) grid gap-16 md:gap-[7.5rem] md:pt-[calc(var(--gh)+3.5rem)]">
      <PageBreadcrumb
        list={[
          { label: commonT('navigation.home'), href: '/' },
          { label: commonT('navigation.developers'), href: '/developers' },
        ]}
      />
      <SectionTitle subtitle="Welcome to the PEACE COIN Docs">
        {t('title')}
      </SectionTitle>
      <ul className="flex gap-10 max-md:flex-col">
        {list.map(({ key, Icon, href }) => (
          <li
            key={key}
            className="bg-primary/7 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center gap-6"
          >
            <h2 className="flex items-center justify-center gap-2">
              <Icon className="text-foreground size-8" />
              <span className="text-primary font-bold text-2xl">
                {t(`${key}.title`)}
              </span>
            </h2>
            <p className="text-sm leading-[1.8]">{t(`${key}.description`)}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <CircleArrowIcon className="transition-colors group-hover:text-primary-foreground group-hover:bg-primary" />
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
