<template>
  <div v-if="error" class="error">{{error}}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{playlist.title}}</h2>
      <p class="username">Created by {{playlist.userName}}</p>
      <p class="description">{{playlist.description}}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p v-if="!playlist.songs.length">No songs yet.</p>
      <div v-else class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <add-song v-if="ownership" :playlist="playlist"></add-song>
    </div>
  </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import {useRouter} from 'vue-router'
import AddSong from '../../components/AddSong.vue'

export default {
  components: { AddSong },
  props: ['id'],
  setup(props) {
    const {error, document:playlist} = getDocument('playlists', props.id)
    const {user} = getUser()
    const {deleteDoc, updateDoc} = useDocument('playlists', props.id)
    const {deleteImage} = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return playlist.value && user.value && (user.value.uid == playlist.value.userId)
    })

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({name: 'Home'})
    }

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id)
      await updateDoc({ songs })
    }

    return {error, playlist, ownership, handleDelete, handleClick}
  }
}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
  border: 2px solid white;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.2);
}
.cover img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #999;
  margin-bottom: 20px;
}
</style>