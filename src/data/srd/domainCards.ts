import { arcana } from './domainCards/arcana'
import { blade } from './domainCards/blade'
import { bone } from './domainCards/bone'
import { codex } from './domainCards/codex'
import { dread } from './domainCards/dread'
import { grace } from './domainCards/grace'
import { midnight } from './domainCards/midnight'
import { sage } from './domainCards/sage'
import { splendor } from './domainCards/splendor'
import { valor } from './domainCards/valor'

export const domainCards = [
  ...arcana,
  ...blade,
  ...bone,
  ...codex,
  ...dread,
  ...grace,
  ...midnight,
  ...sage,
  ...splendor,
  ...valor,
] as const
