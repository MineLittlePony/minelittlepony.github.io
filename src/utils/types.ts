import type { IconName, IconStyle } from '@fortawesome/fontawesome-common-types'

export type FirstLetter<T extends string> = T extends `${infer L}${string}` ? L : never

export type FontAwesomeIcon = `fa${FirstLetter<IconStyle>} fa-${IconName}`
