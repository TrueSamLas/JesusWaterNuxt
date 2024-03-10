<template>
    <UForm :state="$data" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Почта" name="email">
            <UInput v-model="login" />
        </UFormGroup>

        <UFormGroup label="Пароль" name="password">
            <UInput v-model="password" type="password" />
        </UFormGroup>

        <UButton type="submit">
            Вход
        </UButton>
    </UForm>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/'
        }
    })

    const { signIn } = useAuth()

    const login = ref('')
    const password = ref('')

    const onSubmit = async () => {
        const { error, url } = await signIn('credentials', {
            username: login.value,
            password: password.value,
            redirect: false,
        });

        if( !!error )
            return alert('Ошибка: Неверный логин/пароль');

        return navigateTo('/');
    }
</script>