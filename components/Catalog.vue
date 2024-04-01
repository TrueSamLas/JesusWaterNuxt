<template>
    <div class="flex flex-col justify-center items-center gap-4">
        <div class="search_body flex items-center p-4">
            <div class="search_field flex basis-full items-center">
                <input type="text" placeholder="Поиск" class="search_bar" v-model="search"> 
                <img src="assets/search.svg" alt="" class="search_icon">
            </div>

            <button @click="sideModal = !sideModal" class="filters_btn flex basis-full justify-center items-center">Фильтрация</button> 
        </div>

        <div class="catalog flex flex-wrap">
            <div
                class="catalog-item"
                v-for="item in filteredCatalog"
                @click="
                    catalogView = item;
                    catalogModal = true;
                ">
                <img :src="item.image">
                <div>{{ item.name }}</div>
                <div>{{ item.price }} руб.</div>
            </div>
        </div>

        <USlideover v-model="sideModal">
            <div class="p-4 flex flex-col">
                <UFormGroup :label="`Цена (От): ${ filter.priceFrom } руб.`" class="mb-4">
                    <URange v-model="filter.priceFrom" min="0" max="10000"/>
                </UFormGroup>

                <UFormGroup :label="`Цена (До): ${ filter.priceTo } руб.`" class="mb-4">
                    <URange v-model="filter.priceTo" min="0" max="10000"/>
                </UFormGroup>

                <hr class="mb-4">
            </div>
        </USlideover>

        <UModal v-model="catalogModal">
            <div class="p-4">
                <div class="flex justify-center">
                    <img :src="catalogView.image" width="400">
                </div>

                <hr class="my-4">

                <h2>{{ catalogView.name }}</h2>
                <h2>{{ catalogView.price }} руб.</h2>

                <hr class="my-4">

                <div class="flex justify-end">
                    <UButton @click="
                        cart.set(catalogView.id, (cart.get(catalogView.id) ?? 0) + 1);
                        catalogModal = false;
                    ">
                        В корзину
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup>
    const { data: catalog } = await useFetch('/api/catalog');

    const search = ref('');
    const sideModal = ref(false);
    const filter = reactive({
        priceFrom: 0,
        priceTo: 10000,
    });

    const catalogView = ref(null);
    const catalogModal = ref(false);

    const filteredCatalog = computed(() => {
        return catalog.value
            .filter(item => (
                item.name.toLowerCase().includes(search.value.toLowerCase())
                &&
                item.price >= filter.priceFrom
                &&
                item.price <= filter.priceTo
            ));
    });

    const cart = useLocalStorage('cart', new Map());
</script>

<style lang="scss" scoped>

.search_body{
    width: 100%;
    background-color: #BD8484;
    height: 60px;

    .search_field{
        .search_bar{
            padding-left: 15px;
            padding-right: 46px;
            width: 100%;
            border-radius: 20px;
            height: 40px;
            border: 3px solid #FFC8D5;
            color: #9F7070;
        }

        .search_icon{
            margin-left: -46px;
            pointer-events: none;
        }
    }

    .filters_btn{
        font-weight: 700;
        font-size: 24px;
        color: #fff;
    }
}

.catalog{
    gap: 20px;
    width: 861px;

    .catalog-item{
        padding: 10px;
        width: 200px;
        height: 300px;
        flex: 0 0 200px;
        background: white;
        border-radius: 10px;
        cursor: pointer;

        > img{
            width: 100%;
            height: 200px;
            object-fit: contain;
        }
    }
}

</style>