<template>
    <div :class="$style['home']">
        <app-home-sidebar :documents="documents"
                          v-model:selected-document="selectedDocument"
                          :search="search"
                          @update:search="updateSearch"
        />
        <app-home-main :doc="selectedDocument" :text="textDisplayed"/>
    </div>
</template>

<script setup lang="ts">
import AppHomeSidebar from '@/components/AppHomeSidebar.vue';
import AppHomeMain from '@/components/AppHomeMain.vue';
import {onBeforeMount, ref} from 'vue';
import {type RejectedRequest} from '@/interfaces/rejectedRequest';
import {useStore} from "@/store/store";
import {type Document} from '@/interfaces/document';

const TEXT_DISPLAYED_DEFAULT = 'Выберите документ, чтобы посмотреть его содержиое';

const store = useStore();
const {fetchDocuments: fetch} = store;


const documents = ref<Document[]>([]);
const selectedDocument = ref<Document | null>(null);
const search = ref<string>('');
const textDisplayed = ref<string>(TEXT_DISPLAYED_DEFAULT);

const updateSearch = async (val: string) => {
    search.value = val;
    selectedDocument.value = null;
    await fetchDocuments(search.value);
};

const fetchDocuments = async (search?: string): Promise<void> => {
    const resp: RejectedRequest | Document[] = await fetch(search ? {search: search} : {});
    if ((<RejectedRequest>resp)?.failed) {
        textDisplayed.value = (<RejectedRequest>resp).error;
        return;
    }
    documents.value = <Document[]>resp;
};

onBeforeMount(() => {
    fetchDocuments();
});


</script>

<style lang="scss" module>
.home {
  @include form-border;
  display: flex;
  height: 575px;
  overflow: hidden;
}
</style>