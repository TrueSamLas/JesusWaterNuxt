<template>
    <UVerticalNavigation
        class="m-4"
        :links="[
            {
                label: 'Каталог',
                icon: 'i-fa6-solid-wine-bottle',
                to: '/admin/catalog'
            },
            {
                label: 'Новости',
                icon: 'i-fa6-solid-newspaper',
                to: '/admin/news'
            },
        ]" />
</template>