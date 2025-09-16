import type { Ref } from 'vue'
import { useState } from '#app'
import type { DirectusUser } from '../types'

export const useDirectusUser = <User extends DirectusUser = DirectusUser>(): Ref<User> =>
  useState<User>('directus.user')
