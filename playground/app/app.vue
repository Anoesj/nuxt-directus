<template>
  <div>
    Nuxt module playground!
    <button style="margin-top: 25px" @click="onSubmit">
      Login with Directus
    </button>
    <button style="margin-top: 25px" @click="loginWithProvider('discord')">
      Login with OAuth
    </button>
    <button style="margin-top: 25px" @click="logout">
      Logout
    </button>
    <button style="margin-top: 25px" @click="fetchSingleArticle">
      Fetch Single Article
    </button>
    <button style="margin-top: 25px" @click="fetchArticles">
      Fetch Articles
    </button>
    <button style="margin-top: 25px" @click="fetchArticle">
      Fetch Article
    </button>
    <button style="margin-top: 25px" @click="createArticles">
      Create Articles
    </button>
    <button style="margin-top: 25px" @click="deleteArticles">
      Delete Articles
    </button>
    <button style="margin-top: 25px" @click="fetchCollections">
      Fetch Collections
    </button>
    <button style="margin-top: 25px" @click="fetchCollection">
      Fetch Collection
    </button>
    <button style="margin-top: 25px" @click="logUser">
      Log User
    </button>

    <div>
      <!-- User Composable Tests -->
      <button :disabled="(createdUserId !== '')" style="margin-top: 25px" @click="createUser">
        Create User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="updateCreatedUser">
        Update User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="fetchSingleUser">
        Fetch Single User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="deleteUser">
        Delete User
      </button>
      <button style="margin-top: 25px" @click="fetchAllUsers">
        Fetch All Users
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusUser, DirectusUserRequest, DirectusUserUpdate } from '../../src/runtime/types'

type News = {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

// TODO: I cannot reach the backend at this moment, so I cannot check what Collections exist in there
type Books = {
  id?: string | number;
  title: string;
  pages: number;
}

type Collections = {
  news: News;
  books: Books;
};

type DirectusCollections = {
  directus_fields: {
    id?: number;
    collection?: string;
    field?: string;
  };
  directus_users: {
    id?: number;
    email?: string;
  };
};

type AllCollections = Collections & DirectusCollections;

const { login, loginWithProvider, logout } = useDirectusAuth()
const user = useDirectusUser()
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems<AllCollections>()
const { getCollections, getCollection } = useDirectusCollections<AllCollections>()
const router = useRouter()

const {
  createUsers,
  deleteUsers,
  getUserById,
  getUsers,
  updateUser,
} = useDirectusUsers()

let articleIds: (string | number | undefined)[] = []

const onSubmit = async () => {
  await login({
    email: 'admin@example.com',
    password: 'd1r3ctu5'
  })

  router.push('/authenticated-page')
}

const logUser = () => {
  console.log(user.value?.email ?? 'No user logged in')
}

const createArticles = async () => {
  const articles = await createItems('news', {
    items: [
      {
        title: 'testitem',
        content: 'testcontent',
        status: 'published'
      },
      {
        title: 'testitem2',
        content: 'testcontent2',
        status: 'published'
      }
    ]
  })
  articleIds = articles.map(article => article.id)
}

const deleteArticles = async () => {
  await deleteItems('news', {
    items: [
      'c7480ee3-4be1-4562-87af-9dfa692a56bb',
      'a2f6b5e7-b151-42a1-9d9b-b6ccf1ae87ff'
    ]
  })
}

const fetchArticles = async () => {
  const items = await getItems('news', {
    params: {
      filter: {
        content: 'yyeeet',
        title: 'Test1'
      },
      meta: '*'
    }
  })
  console.log(items)

  router.push('/d')
}

const fetchSingleArticle = async () => {
  const items = await getItemById('news', {
    id: articleIds[0]
  })
  console.log(items)
}

const fetchArticle = async () => {
  const item = await getItemById('news', {
    id: '4776864a-75ee-4746-9ef4-bd5c2e38cc66'
  })
  console.log(item)

  router.push('/d')
}

const fetchCollections = async () => {
  const collections = await getCollections()
  console.log(collections)

  router.push('/d')
}

const fetchCollection = async () => {
  const collection = await getCollection('news')
  console.log(collection.meta.collection)

  router.push('/d')
}

// User Composable Tests

type User = DirectusUser & {
  id?: string | number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const createdUserId = ref()

const createUser = async () => {
  const userResponse = await createUsers<User>({
    users: [
      {
        email: 'abraham@lincoln.gov',
        password: 'password',
        first_name: 'Abraham',
        last_name: 'Lincoln'
      }
    ]
  })
  console.log(userResponse)
  createdUserId.value = (userResponse as User[])[0]?.id
}

const updateCreatedUser = async () => {
  const request: DirectusUserUpdate = {
    id: createdUserId.value,
    user: {
      first_name: 'John'
    }
  }

  const userResponse = await updateUser<User>(request)
  console.log(userResponse)
}

const fetchSingleUser = async () => {
  const request: DirectusUserRequest = {
    id: createdUserId.value
  }

  const userResponse = await getUserById<User>(request)
  console.log(userResponse)
}

const deleteUser = async () => {
  try {
    await deleteUsers({ users: [createdUserId.value] })
    createdUserId.value = ''
  } catch (e) { console.error(e) }
}

const fetchAllUsers = async () => {
  const userResponse = await getUsers<User>()
  console.log(userResponse)
}
</script>
