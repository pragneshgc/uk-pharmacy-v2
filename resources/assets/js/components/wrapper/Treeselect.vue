<template>
    <Treeselect v-bind="$attrs" v-on="$listeners">
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData || {}" />
        </template>
    </Treeselect>
</template>

<style>
@import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
</style>

<script>
import Treeselect from "@zanmato/vue3-treeselect";

export default {
    components: {
        Treeselect
    }
}
</script>
