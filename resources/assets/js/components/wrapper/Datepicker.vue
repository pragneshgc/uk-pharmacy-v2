<template>
    <Datepicker v-bind="$attrs" v-on="$listeners">
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData || {}" />
        </template>
    </Datepicker>
</template>

<style>
@import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
</style>

<script>
import Datepicker from 'vuejs3-datepicker'

export default {
    components: {
        Datepicker
    }
}
</script>
