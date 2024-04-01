<template>
    <div>
        <UTable
            class="bg-white"
            :loading="loading && !cartView.length"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Загрузка...' }"
            :empty-state="{ icon: 'i-fa6-solid-cart-shopping', label: 'Корзина пуста' }"
            :columns="[
                {
                    label: 'Изображение',
                    key: 'image',
                },
                {
                    label: 'Наименование',
                    key: 'name',
                },
                {
                    label: 'Цена за шт.',
                    key: 'price',
                },
                {
                    label: 'Количество',
                    key: 'count',
                },
                {
                    label: 'Цена',
                    key: 'total',
                },
                {
                    label: 'Удалить',
                    key: 'delete',
                },
            ]"
            :rows="cartView">

            <template #image-data="{ row }">
                <img :src="row.image" width="50">
            </template>

            <template #price-data="{ row }">
                <span>{{ row.price }} руб.</span>
            </template>

            <template #count-data="{ row }">
                <div class="flex items-center">
                    <UButton
                        size="xs"
                        variant="ghost"
                        icon="i-fa6-solid-caret-down"
                        :disabled="row.count <= 1"
                        @click="cart.set(row.id, cart.get(row.id) - 1)" />

                    <span class="p-1">{{ row.count }}</span>

                    <UButton
                        size="xs"
                        variant="ghost"
                        icon="i-fa6-solid-caret-up"
                        @click="cart.set(row.id, cart.get(row.id) + 1)" />
                </div>
            </template>

            <template #total-data="{ row }">
                <span>{{ row.price * row.count }} руб.</span>
            </template>
            
            <template #delete-data="{ row }">
                <UButton
                    variant="ghost"
                    icon="i-heroicons-trash-20-solid"
                    @click="cart.delete(row.id)" />
            </template>

        </UTable>

        <ClientOnly>
            <div v-if="!!cart.size" class="flex justify-end bg-white">
                <div class="flex flex-col items-end">
                    <h2 class="text-xl mb-2">Итого: {{ cartTotal }} руб.</h2>

                    <UButton @click="cart.clear()">
                        <span class="text-lg">Оформить заказ</span>
                    </UButton>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup>
    const loading = ref(true);

    const { data: catalog, refresh } = useFetch('/api/catalog');

    const cart = useLocalStorage('cart', new Map());

    const cartView = computed(() => (
        [ ...cart.value.entries() ]
            .map(([ id, count ]) => ({
                ...catalog.value.find(item => item.id === id),
                count,
            }))
    ));

    const cartTotal = computed(() => (
        cartView.value.reduce((accu, value) => accu + ( value.price * value.count ), 0)
    ));

    setTimeout(() => {
        loading.value = false;
    }, 2000);
</script>