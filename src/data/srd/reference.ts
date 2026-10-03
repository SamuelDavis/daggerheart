import * as schemas from '../../types/srd'
import { adversaries } from './adversaries'
import { environments } from './environments'
import { collection } from '.'

export const reference = {
  adversaries: collection(schemas.Adversary, adversaries),
  environments: collection(schemas.Environment, environments),
}
