import type { Ref } from 'vue';
import type { DirectusUser } from '../types/index.js';
export declare const useDirectusUser: <User extends DirectusUser = DirectusUser>() => Ref<User>;
