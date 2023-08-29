<template>
    <button :class="[$style['button'],
    bold ? $style['button__bold'] : '',
     $style[`button__${buttonType}`], disabled? $style['button__disabled'] : '']"
            @click="click">
        {{ label }}
    </button>
</template>

<script lang="ts" setup>
interface IProps {
    label: string,
    disabled?: boolean,
    bold?: boolean,
    buttonType?: 'info'| 'danger',
}
const props = withDefaults(defineProps<IProps>(), {
    buttonType: 'info',
    bold: false,
    disabled: false,
})

const emit = defineEmits<{
    (e: 'click'): void
}>();

const click = () => !props.disabled && emit('click');
</script>

<style lang="scss" module>
.button {
  width: 100%;
    padding: 6px 28px;

  border: 1px solid #0D6EFD;
  border-radius: 8px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: $blue-500;
  text-transform: capitalize;

    &__disabled {
        cursor: not-allowed;
    }

  &__bold {
    font-weight: 700;
  }

    &:not(.button__disabled):hover {
        background: #0D6EFD;
        color: white;
    }

  &__danger{
    border-color: $danger;
    color: $danger;

    &:not(.button__disabled):hover{
      background: $danger;
      color: white;
    }
  }
}
</style>