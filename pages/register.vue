<template>
    <UForm :state="$data" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="ФИО" name="name">
            <UInput v-model="name" />
        </UFormGroup>

        <UFormGroup label="Почта" name="email">
            <UInput v-model="login" />
        </UFormGroup>

        <UFormGroup label="Пароль" name="password">
            <UInput v-model="password" type="password" />
        </UFormGroup>

        <UFormGroup label="Повторите пароль" name="repeatpass">
            <UInput v-model="repeatpass" type="password" />
        </UFormGroup>

        <UButton type="submit">
            Регистрация
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

    const name = ref('')
    const login = ref('')
    const password = ref('')
    const repeatpass = ref('')

    const onSubmit = async () => {
        if( password.value != repeatpass.value )
            return alert('Ошибка: Пароли не совпадают!');

        const { success } = await $fetch('/api/user/register', {
            method: 'POST',
            body: {
                name: name.value,
                login: login.value,
                password: password.value,
            }
        });

        if( success ){
            alert('Пользователь создан!');
            return navigateTo('/login');
        }else
            alert('Ошибка на сервере!');
    }
</script>