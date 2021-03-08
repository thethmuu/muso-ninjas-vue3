<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <list-view :playlists="playlists"></list-view>
    </div>
    <div v-else style="padding: 20px;">loading...</div>

    <router-link class="btn" :to="{ name: 'CreatePlaylist' }">Create New Playlist</router-link>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import ListView from '../../components/ListView.vue'

export default {
  components: { ListView },
  setup() {
    const {user} = getUser()
    const { documents: playlists } = getCollection(
      'playlists',
      ['userId', '==', user.value.uid]
    )

    return { playlists }
  }
}
</script>

<style>

</style>