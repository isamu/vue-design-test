<template>
  <div class="layout">
    <div class="bg-warmgray-400 flex min-h-screen flex-col bg-opacity-20">
      <div class="w-full flex-1">
        <div class="top-0 w-full sm:relative" ref="root">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";

import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";

import { useI18nParam } from "@/i18n/utils";
import { useStore } from "@/store/index";

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: "AppLayout",
  components: {},
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });

    const menu = ref(false);
    const root = ref();

    useI18nParam();

    onMounted(() => {
      auth.onAuthStateChanged((fbuser) => {
        if (fbuser) {
          console.log("authStateChanged:");
          user.user = fbuser;
          store.setUser(fbuser);
        } else {
          store.setUser(null);
        }
      });
    });

    const toggleMenu = () => {
      menu.value = !menu.value;
    };
    return {
      user,

      menu,
      toggleMenu,
      root,
    };
  },
});
</script>
