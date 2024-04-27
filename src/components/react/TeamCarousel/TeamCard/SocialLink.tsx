import type { SocialLink as SocialLinkTemplate } from '@/data/socials';

export interface SocialLinkProps {
  template: SocialLinkTemplate;
  value: string;
}

export function SocialLink({ template, value }: SocialLinkProps) {
  if (template.url) {
    const url
      = typeof template.url === 'string'
        ? template.url.replace('%s', value)
        : template.url(value);

    return (
      <a
        href={url}
        title={template.title}
        className="text-zinc-700 hover:text-primary"
      >
        <i className={template.icon} />
      </a>
    );
  }

  return (
    <div
      className="flex items-center gap-1 text-zinc-700"
      title={template.title}
    >
      <i className={template.icon} />

      <span>{value}</span>
    </div>
  );
}
