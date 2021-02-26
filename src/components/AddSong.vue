<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>

    <form v-else @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song Title" required v-model="title">
      <input type="text" placeholder="Artist" required v-model="artist">
      <button v-if="isPending" disabled>Saving...</button>
      <button v-else>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const isPending = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)

    const handleSubmit = async () => {
      isPending.value = true
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      isPending.value = false
      title.value = ''
      artist.value = ''
    }

    return {title,artist,showForm,isPending,handleSubmit}
  }
}
</script>

<style scoped>
.add-song {
  margin-top: 40px;
  text-align: center;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>