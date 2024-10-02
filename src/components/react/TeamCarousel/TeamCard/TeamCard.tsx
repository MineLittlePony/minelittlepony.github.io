import { SocialLinks } from '~/data/socials';
import type { TeamMember } from '~/data/team/team';
import { SocialLink } from './SocialLink';
import { TeamPhoto } from './TeamPhoto/TeamPhoto';

export function TeamCard(props: TeamMember) {
  const { name, contacts, role } = props;

  return (
    <div className="flex h-full flex-col items-center gap-4 bg-white p-6 shadow-lg">
      <TeamPhoto {...props} />

      <div className="flex flex-col items-center gap-2 text-center">
        <h3>{name}</h3>

        {contacts && (
          <div className="flex items-center gap-2">
            {SocialLinks.map((link) => {
              const value = contacts?.[link.id];

              return (
                value && (
                  <SocialLink key={link.id} template={link} value={value} />
                )
              );
            })}
          </div>
        )}

        <p>{role}</p>
      </div>
    </div>
  );
}
