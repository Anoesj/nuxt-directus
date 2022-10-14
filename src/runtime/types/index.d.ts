type ArrayOfOrSingle<T> = T | T[];

export type DirectusUser = {
  auth_data?: unknown | null;
  description?: string | null;
  email?: string | null;
  email_notifications?: boolean | null;
  external_identifier?: string | null;
  first_name?: string | null;
  id: string;
  language?: string | null;
  last_access?: string | null;
  last_name?: string | null;
  last_page?: string | null;
  location?: string | null;
  password?: string | null;
  provider: string;
  status: string;
  tags?: unknown | null;
  tfa_secret?: string | null;
  theme?: string | null;
  title?: string | null;
  token?: string | null;
  [key: string]: any;
} | null;

export type DirectusCollections = Record<string, Record<string, any>>;

export interface DirectusQueryParamsMeta {
  total_count?: number;
  filter_count?: number;
}

export type DirectusQueryParamsMetaAll = '*';

export interface DirectusQueryParams {
  fields?: string[];
  sort?: ArrayOfOrSingle<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: ArrayOfOrSingle<string>;
  deep?: Record<string, unknown>;
  search?: string;
  meta?: keyof DirectusQueryParamsMeta | DirectusQueryParamsMetaAll;
}

export interface DirectusAuthCredentials {
  email: string;
  password: string;
  otp?: string;
}

export interface DirectusAuthResponse<User = DirectusUser> {
  user: User;
  access_token: string;
  expires: number;
  refresh_token: string;
}

export interface DirectusPasswordForgotCredentials {
  email: string;
  reset_url?: string;
}

export interface DirectusPasswordResetCredentials {
  token: string;
  password: string;
}

export type DirectusItemRequest<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    id?: T[C]['id'];
    params?: DirectusQueryParams;
  };
};

export type DirectusItemWithoutId<
  T extends Record<string, any> = Record<string, any>
> = {
  [C in keyof Omit<T, 'id'>]: T[C];
} & { id?: never; };

export type DirectusItemCreation<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    items: ArrayOfOrSingle<DirectusItemWithoutId<T[C]>>;
  };
};

export type DirectusItemUpdate<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    id: T[C]['id'];
    item: T[C];
  };
};

export type DirectusItemDeletion<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    items: ArrayOfOrSingle<T[C]['id']>;
  };
};

// User Interfaces
export interface DirectusUserRequest {
  id?: string;
  params?: DirectusQueryParams;
}

export interface DirectusUserCreation {
  users: Array<Object> | Object;
}

export interface DirectusUserUpdate {
  id: string;
  user: Object;
}

export interface DirectusUserDeletion {
  users: Array<string> | string;
}

export type DirectusThumbnailFormat = 'jpg' | 'png' | 'webp' | 'tiff' | 'avif';

export type DirectusThumbnailFit = 'cover' | 'contain' | 'inside' | 'outside';

export interface DirectusThumbnailOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: DirectusThumbnailFit;
  format?: DirectusThumbnailFormat;
  withoutEnlargement?: boolean;
  key?: string;
}

export interface DirectusRegisterCredentials {
  email: string;
  password: string;
}

export type DirectusFile = {
  charset?: string | null;
  description?: string | null;
  duration?: number | null;
  embed?: string | null;
  filename_disk?: string | null;
  filename_download: string;
  filesize?: number | null;
  folder?: string | DirectusFolders | null;
  height?: number | null;
  id: string;
  location?: string | null;
  metadata?: unknown | null;
  modified_by?: string | DirectusUser | null;
  modified_on: string;
  storage: string;
  tags?: unknown | null;
  title?: string | null;
  type?: string | null;
  uploaded_by?: string | DirectusUser | null;
  uploaded_on: string;
  width?: number | null;
  [key: string]: any;
} | null;

export type DirectusFolders = {
  id: string;
  name: string;
  parent?: string | DirectusFolders | null;
};

export interface DirectusFileRequest {
  id?: string;
  params?: DirectusQueryParams;
}

export interface DirectusNotificationObject {
  id?: number;
  timestamp?: string;
  status?: 'inbox' | 'archived';
  recipient: string[] | string;
  sender?: string[] | string;
  subject: string;
  message?: string;
  collection?: string;
  item?: string;
}

export interface DirectusCollectionMeta<T extends DirectusCollections, C extends keyof T> {
  collection?: C;
  icon?: string;
  note?: string;
  display_template?: string;
  hidden?: boolean;
  singleton?: boolean;
  translations?: [
    {
      language?: string;
      translation?: string;
    }
  ];
  archive_field?: string;
  archive_value?: string;
  unarchive_value?: string;
  archive_app_filter?: boolean;
  sort_field?: string;
  item_duplication_fields?: string[];
  sort?: number;
  collapse?: 'open' | 'closed' | 'locked';
}

export type DirectusCollectionInfo<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    collection: C;
    meta: DirectusCollectionMeta<T, C>;
    schema: {
      name: C;
      sql: string;
    };
  };
};

export interface DirectusCollectionCreation {
  collection: keyof DirectusCollections;
  meta?: DirectusCollectionMeta<DirectusCollections, keyof DirectusCollections>;
  schema?: {
    name?: string;
    comment?: string;
  };
}

export interface DirectusCollectionUpdate<T extends DirectusCollections, C extends keyof T> {
  meta: DirectusCollectionMeta<T, C>;
}

export interface DirectusRevision {
  id: number;
  activity?: any;
  collection: string; // FIXME:
  item?: string;
  data?: Object;
  delta?: Object;
  parent?: any;
}

export interface DirectusItemMetadata {
  total_count?: number;
  filter_count?: number;
};

export interface DirectusItems<T> {
  data: NonNullable<T[]>;
  meta?: DirectusItemMetadata;
};

export interface DirectusItem<T> {
  data: NonNullable<T>;
};

export interface DirectusInviteCreation {
  email: string;
  role: string;
  invite_url?: string
};

export interface DirectusAcceptInvite {
  token: string;
  password: string
};
