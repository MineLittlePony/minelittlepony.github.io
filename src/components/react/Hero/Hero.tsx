import { clsx } from 'clsx';
import Links from '~/data/links.json';
import { useKonami } from '~/hooks/useKonami';
import { ModrinthDownloads } from '../ModrinthDownloads/ModrinthDownloads';
import classes from './Hero.module.css';
import { HeroIconLink } from './HeroIconLink';

export function Hero() {
  const konamiResolved = useKonami();

  return (
    <div className={clsx(classes.Hero, {
      [classes.SecretSolved ?? '.SecretSolved']: konamiResolved,
    })}
    >
      {/* Hero content */}
      <div className={classes.Content}>
        {/* Info section */}
        <div className={classes.InfoSection}>
          {/* Description */}
          <div className={classes.Description}>
            <img
              className={classes.HeroImage}
              src="/assets/hero/banner.png"
              alt="Hero banner"
            />

            <h1>Minecraft mod to ponify your world</h1>

            <p>
              Play as a pony, communicate with other ponies, kill angry pony zombies
              and skeletons, trade with pony villagers and so on!
            </p>
          </div>

          <hr className={classes.Divider} />

          {/* Links */}
          <div className={classes.Links}>
            {/* Archive */}
            <HeroIconLink
              href={Links.cloudArchive}
              title="Legacy versions archive"
              icon="fas fa-file-zipper"
            />

            {/* GitHub */}
            <HeroIconLink
              href={Links.githubOrganization}
              title="Team page on GitHub"
              icon="fab fa-github"
            />

            {/* Discord */}
            <HeroIconLink
              href={Links.discordInvite}
              title="Join our Discord server"
            >
              <img
                className="h-8 w-auto"
                src="/assets/discord.svg"
                alt="Discord logo"
              />
            </HeroIconLink>
          </div>
        </div>

        {/* Downloads section */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <ModrinthDownloads />
        </div>
      </div>
    </div>
  );
}
