<template>
    <div :class="$style['input']">
        <label :for="String(id)" v-if="label" :class="$style['input_label']">{{ label }}</label>
        <input :id="String(id)"
               :class="[$style['input_input'], !valid ? $style['input_input__invalid'] : '']"
               :placeholder="placeholder"
               :type="type"
               :disabled="disabled"
               v-model="valueDisplayed">
    </div>
</template>

<script lang="ts" setup>

import {computed} from 'vue';
import {useId} from "@/composable/useId";

interface IProps {
    value: string,
    label?: string,
    placeholder?: string,
    type?: 'text'| 'password'| 'email',
    disabled?: boolean,
    valid?: boolean,
}
const props = withDefaults(defineProps<IProps>(), {
    valid: true,
    type: 'text',
})

const emit = defineEmits<{
    (e: 'update:value', value: string): void
}>();

const {generateId} = useId();
const id = generateId();

const valueDisplayed = computed({
    get: (): string => props.value,
    set: (val): void => emit('update:value', val),
});


</script>

<style lang="scss" module>
.input {
  display: flex;
  flex-direction: column;

  &_label {
    line-height: 24px;
    letter-spacing: 0.25px;
    color: $dark;
    text-transform: capitalize;
  }

  &_input {
    border: 1.5px solid $gray-200;
    border-radius: 8px;
    padding: 16px 24px;
    background: white;
    line-height: 17px;
    color: $secondary;

    &:focus {
      box-shadow: inset 0 0 3px 0 $blue-500;
    }

    &__invalid {
      border-color: $danger;

      &:focus {
        box-shadow: inset 0 0 3px 0 $danger;
      }
    }
  }
}
</style>