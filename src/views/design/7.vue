<template>
  <PageSet>
    <Page class="bg-gray-200" :sticky="true">
      <pageElement class="m-auto" :animatedStyle="{ opacity: { from: 100, to: 50 }, width: { from: 100, to: 80 } }" :beforeStyle="{ opacity: 50 }">
        <img src="./mj.jpg" class="w-full" />
      </pageElement>
    </Page>
    <Page :sticky="true">
      <div class="relative">
        <PageElement class="top-0 w-full absolute" :animatedStyle="{ opacity: { from: 100, to: 0 } }">
          <div class="videoWrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/o-0ygW-B_gI?autoplay=1&mute=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </PageElement>
        <div class="absolute flex items-center justify-center text-center w-full h-[100vh]">
          <div class="m-auto">
            <span class="text-4xl font-bold text-white"> Welcome to the era of spatial computing. </span>
          </div>
        </div>
      </div>
    </Page>
    <Page class="bg-black">
      <pageElement>
        <div class="absolute flex items-center justify-center text-center w-full h-[100vh]">
          <div class="m-auto">
            <span class="text-4xl font-bold text-white"> Hello world.</span>
          </div>
        </div>
      </pageElement>
    </Page>
    <Page :sticky="true">
      <PageElement :animatedStyle="{ width: 100 }" class="w-30 m-auto">
        <img src="/a.jpg" class="w-full" />
      </PageElement>
    </Page>
    <Page :sticky="true" :animatedStyle="{ opacity: 100 }" class="bg-gray-400">
      <div class="absolute flex items-center justify-center text-center w-full h-[100vh]">
        <div class="m-auto">
          <span class="text-4xl font-bold text-white"> Second world. </span>
        </div>
      </div>
    </Page>
    <Page class="bg-black">
      <pageElement> 3 </pageElement>
    </Page>
    <Page class="bg-red-200" :sticky="true">
      <pageElement> 2 </pageElement>
    </Page>
    <Page :sticky="true">
      <PageElement :animatedStyle="style3" class="w-1/4 m-auto">
        <img src="/a.jpg" class="w-full" />
      </PageElement>
    </Page>
    <Page :sticky="true">
      <PageElement :animatedStyle="style3" class="w-1/4 m-auto h-[100vh]">
        <img src="/a.jpg" class="w-full" />
      </PageElement>
    </Page>
    <Page :sticky="true">
      <PageElement :animatedStyle="{ left: 70, opacity: 100 }" :loadingAnimatedStyle="{ left: 70, opacity: 100 }" class="relative">
        <div class="relative text-left text-8xl">Hello World</div>
      </PageElement>
    </Page>
    <Page :sticky="true"> </Page>
  </PageSet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSet from "./PageSet.vue";
import Page from "./Page.vue";
import PageElement from "./PageElement.vue";

export default defineComponent({
  components: {
    PageSet,
    Page,
    PageElement,
  },
  setup() {
    return {
      style3: {
        rotate: 5,
      },
    };
  },
});
</script>

<style>
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
