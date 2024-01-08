<template>
  <PageSet>
    <Page class="bg-gray-200">
      <pageElement> base page </pageElement>
    </Page>
    <Page :sticky="true">
      <PageElement :animatedStyle="{ width: 100 }" class="w-30 m-auto">
        <img src="/a.jpg" class="w-full" />
      </PageElement>
    </Page>
    <Page :sticky="true" :animatedStyle="{ opacity: 100 }" class="bg-red-200">
      <pageElement> 2 </pageElement>
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
      <PageElement
        :animatedStyle="{ left: 70, opacity: 100 }"
        :loadingAnimatedStyle="{ left: 70, opacity: 100 }"
        class="relative">
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
