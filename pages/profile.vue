<template>
    <div>
        {{ JSON.stringify(data.user) }}
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    })

    const { data } = useAuth()
</script>