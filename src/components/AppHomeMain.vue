<template>
    <div :class="$style['home-main']">
        <div v-if="doc && !isRequestProcess" :class="$style['home-card']">
            <div :class="[$style['home-card_image'], $style['card-image']]">
                <img :class="$style['card-image_image']"
                     :src="doc.image || defaultImage"
                     alt=""
                     width="430" height="290">
            </div>
            <div :class="$style['home-card_info']">
                <div :class="[$style['home-card_tools'], $style['tools']]">
                    <h3>{{ doc.name }}</h3>
                    <div :class="$style['tools_buttons']">
                        <span>
                            <app-button label="скачать" @click="onDownload"/>
                        </span>
                        <span>
                            <app-button button-type="danger" label="удалить" :disabled="!doc.image"/>
                        </span>
                    </div>
                </div>
                <div :class="$style['home-card_description, description']">
                    <h3>Описание:</h3>
                    <p :class="$style['description_text']">
                        {{ doc.description }}
                    </p>
                </div>
            </div>
        </div>
        <div v-show="!doc && !isRequestProcess" :class="$style['home-main__empty']">
            <span>{{ text }}</span>
        </div>
        <div v-show="isRequestProcess" :class="$style['home-main__empty']">
            <app-spinner/>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHomeMain'
};
</script>
<script setup lang="ts">
import AppButton from '@/components/UI/AppButton.vue';
import AppSpinner from '@/components/UI/AppSpinner.vue';
import {useStore} from "@/store/store";
import {storeToRefs} from 'pinia';
import {useFile} from "@/composable/useFile";
import {type Document} from '@/interfaces/document';
import defaultImage from '../assets/img/no-image-424x286.png'

interface IProps {
    doc?: Document | null,
    text?: string,
}

const store = useStore();
const {isRequestProcess} = storeToRefs(store);
const {generateTxtBlob, downloadBlobAsFile} = useFile();

const props = withDefaults(defineProps<IProps>(), {
    doc: null,
    text: '',
});

const onDownload = ()=>{
    const blob = generateTxtBlob(props.doc!.description);
    downloadBlobAsFile(blob, props.doc!.name);
}

</script>

<style lang="scss" module>
.home-main {
  width: 100%;
  height: 100%;
  padding: 30px;
  border-left: 1px solid #E0E0E0;

  &__empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home-card {
    display: flex;

    &_info {
      margin-left: 61px;
    }

    .tools {
      margin-bottom: 47px;

      &_buttons {
        display: flex;
        gap: 10px;
      }
    }
  }

  .card-image {
      &_image {
          border: 1px solid #E0E0E0;
      }
  }
}
.description{
    &_text {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: $secondary;
    }
}
</style>