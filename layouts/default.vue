<template>
    <div>
        <div class="flex justify-end gap-1 p-1">
            <template v-if="status === 'unauthenticated'">
                <NuxtLink to="/login">
                    <UButton>Login</UButton>
                </NuxtLink>

                <NuxtLink to="/register">
                    <UButton>Register</UButton>
                </NuxtLink>
            </template>

            <template v-if="status === 'authenticated'">
                <NuxtLink to="/profile">
                    <UButton>Profile</UButton>
                </NuxtLink>

                <NuxtLink to="/logout">
                    <UButton>Logout</UButton>
                </NuxtLink>
            </template>

            <template v-if="status === 'loading'">
                <UIcon name="i-svg-spinners-blocks-shuffle-3" />
            </template>
        </div>

        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    const { status } = useAuth()
</script>