<template>
    <div :class="$style['sidebar']">
        <div :class="$style['sidebar_search']">
            <h3>Поиск документа</h3>
            <app-input :value="searchDisplayed"
                       :is-disabled="isRequestProcess"
                       @update:value="updateSearch"
                       placeholder="Введите ID документа"/>

        </div>
        <div :class="[$style['sidebar_results'], $style['results']]">
            <h3 :class="$style['results_title']">Результаты</h3>
            <div :class="[$style['sidebar_documents'], 'scrollbar-y', $style['scrollbar-y__hidden']]">
                <document-card v-for="doc in documents"
                               :doc="doc"
                               :is-active="doc.id===selectedDocumentDisplayed?.id"
                               @click="selectDocument(doc)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHomeSidebar'
};
</script>
<script setup lang="ts">
import AppInput from '@/components/UI/AppInput.vue';
import DocumentCard from '@/components/UI/DocumentCard.vue';
import {computed, ref} from 'vue';
import {type Document} from '@/interfaces/document';
import {DEBOUNCE_TIMEOUT_MS} from '@/constants/constants';
import {useStore} from "@/store/store";
import {storeToRefs} from "pinia";
import debounce from 'lodash.debounce';

interface IProps {
    documents?: Document[],
    search?: string,
    selectedDocument?: Document | null,
}

const store = useStore();
const {isRequestProcess} = storeToRefs(store);

const props = withDefaults(defineProps<IProps>(), {
    search: '',
    selectedDocument: null,
    documents: () => []
})

const emit = defineEmits<{
    (e: 'update:selectedDocument', doc: Document): void,
    (e: 'update:search', search: string): void,
}>();

const searchDisplayed = ref<string>('');

const selectedDocumentDisplayed = computed({
    get: (): Document | null => props.selectedDocument,
    set: (doc: Document | null): void => emit('update:selectedDocument', doc!),
});

const updateSearch = debounce((val: string): void => {
    searchDisplayed.value = val;
    emit('update:search', val);
}, DEBOUNCE_TIMEOUT_MS);

const selectDocument = (doc: Document): void => {
    if (!isRequestProcess.value) selectedDocumentDisplayed.value = doc;
};

</script>

<style lang="scss" module>
.sidebar {
  width: 282px;
  min-width: 282px;
  padding: 27px 0 60px 0px;

  &_search {
    margin-bottom: 29px;
    padding-right: $sidebar-right-padding;
    padding-left: $sidebar-left-padding;
  }

  &_results {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    padding-bottom: 120px;
  }

  &_documents {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-height: 100%;
    padding: 5px $sidebar-right-padding 5px $sidebar-left-padding;
  }

  .results {
    &_title {
      padding-left: $sidebar-left-padding;
      margin-bottom: 13px;
    }
  }
}
</style>