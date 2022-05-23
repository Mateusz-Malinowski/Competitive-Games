<template>
  <div class="field"></div>
</template>

<style lang="scss" scoped>
@use '../../../../../shared/scss/variables/measurements.scss';

$field-color: rgb(75, 75, 75);

.field {
  background-color: $field-color;
  position: absolute;
  border-radius: measurements.$border-radius;
}
</style>