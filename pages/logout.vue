<template></template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    })

    const { signOut } = useAuth()

    signOut({ callbackUrl: '/' })
</script>