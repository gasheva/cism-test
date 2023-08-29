<template>
    <div :class="[$style['doc-card'], props.active ? $style['doc-card__active'] : '']" @click="emit('click')">
        <div :class="[$style['doc-card_image image-block'], props.active ? $style['doc-card_image__active'] : '']">
            <img :class="$style['image-block_image']" :src="props.doc.image || defaultImage" alt="" width="70" height="70">
        </div>
        <div :class="$style['doc-card_info']">
            <div :class="[$style['doc-card_title'], props.active ? $style['doc-card_title__active'] : '']">
                {{ props.doc.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {type Document} from '@/interfaces/document';
import defaultImage from '../../assets/img/no-image-424x286.png'

interface IProps {
    doc: Document,
    active?: boolean,
}
const props = withDefaults(defineProps<IProps>(), {
    active: false,
})

const emit = defineEmits<{
    (e: 'click'): void
}>();

</script>

<style lang="scss" module>
.doc-card {
  display: flex;
  width: 240px;
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }

  &__active {
    background: $blue-500;
  }

  &_image {
    border-right: 1px solid #E0E0E0;

    &__active {
      border-right-color: $blue-500;
    }
  }

  &_info {
    padding: 15px;
  }

  &_title {
    margin-bottom: 6px;
    font-weight: 600;
    line-height: 17px;
    color: $dark;

    &__active {
      color: $light;
    }
  }
}
.image-block {
    &_image {
        object-fit: cover;
    }
}
</style>