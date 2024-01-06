<template>
  <PageSet>
    <page>
      <pageElement>
        1
        <img />
      </pageElement>
    </page>
    <page>
      <pageElement>
        2
        <img />
      </pageElement>
    </page>
    <page>
      <pageElement>
        3
        <img />
      </pageElement>
    </page>
  </PageSet>
</template>

// PageSetは、いくつのpageをもっているかしりたい ok //
PageSetは、どのpageが表示されていて(currentPage)、スクロールの状態が何パーセントか知りたい(scrollPosition/ratio) ok //
PageSetの子要素は、それらの情報をもちたい(currentPage, scrollPosition/ratio) ok // Pageは自分が何番目の要素か知りたい

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
});
</script>
