export interface MemberInfo {
  name: string
  description: string
  nickname?: string
  avatar: string
  social?: {
    github?: string
    twitter?: string
    vk?: string
  }
}

const Team: MemberInfo[] = [
  {
    name: 'Matthew Messinger',
    description: 'Mod Development Lead',
    nickname: 'JoyJoy',
    avatar: '/about/team/killjoy.jpeg',
    social: {
      github: 'killjoy1221',
      twitter: 'killjoy1221_'
    }
  },
  {
    name: 'Sollace',
    description: 'Mod Developer',
    nickname: 'Sollace',
    avatar: '/about/team/sollace.png',
    social: {
      github: 'Sollace',
      twitter: 'SollaceTheBeard'
    }
  },
  {
    name: 'RollingTheOC',
    description: 'Discord Server Moderator',
    avatar: '/about/team/rolling.png',
    social: {
      twitter: 'RollingTheOC'
    }
  },
  {
    name: 'Tiki Bat',
    description: 'Website Maintainer',
    avatar: '/about/team/tikibat.jpg',
    social: {
      twitter: 'TikiBat'
    }
  },
  {
    name: 'Ivan Sokolov',
    description: 'Website Maintainer',
    nickname: 'Keupoz',
    avatar: '/about/team/keupoz.jpeg',
    social: {
      github: 'keupoz',
      twitter: 'keupoz',
      vk: 'keupoz'
    }
  },
  {
    name: 'Yury Polyacov',
    description: 'QA/Quality Assurance',
    avatar: '/about/team/poly.png'
  }
]

export default Team
