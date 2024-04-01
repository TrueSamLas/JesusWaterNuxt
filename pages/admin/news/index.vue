<template>
    <div>
        <div class="flex justify-end mb-4">
            <NuxtLink to="/admin/news/create">
                <UButton>Создать</UButton>
            </NuxtLink>
        </div>

        <div>
            <UTable
                class="bg-white"
                :columns="[
                    ...Object.keys(news?.[0] ?? {})
                        .map(prop => ({
                            key: prop,
                            label: prop,
                        })),

                    {
                        key: 'actions',
                    },
                ]"
                :rows="news ?? []">

                <template #image-data="{ row }">
                    <img class="preview" :src="row.image">
                </template>

                <template #date-data="{ row }">
                    <span>{{ new Date(row.date * 1000) }}</span>
                </template>
                
                <template #actions-data="{ row }">
                    <UDropdown
                        :items="[[
                            {
                                label: 'Изменить',
                                icon: 'i-heroicons-pencil-square-20-solid',
                                to: `/admin/news/edit/${ row.id }`,
                            },
                            {
                                label: 'Удалить',
                                icon: 'i-heroicons-trash-20-solid',
                                click: () => remove(row.id),
                            },
                        ]]">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>

            </UTable>
        </div>
    </div>
</template>

<script setup>
    const { data: news, refresh } = useFetch('/api/news');

    const remove = async (id) => {
        const success = await $fetch(`/api/news/delete/${ id }`, {
            method: 'DELETE',
        });

        if( success )
            alert('Deleted');
        else
            alert('Error!');

        await refresh();
    }
</script>

<style lang="scss" scoped>

.preview{
    width: 50px;
    height: 50px;
    object-fit: contain;
}

</style>