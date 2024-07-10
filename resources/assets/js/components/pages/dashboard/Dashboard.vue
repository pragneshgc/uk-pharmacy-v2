<template>
    <div>
        <div class="content">
            <Stats />
            <Orders />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'Stats': () => import('./Stats.vue'),
        'Orders': () => import('./Orders.vue')
    },
}
</script>
