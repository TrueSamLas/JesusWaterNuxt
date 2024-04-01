<template>
    <div class="flex flex-col justify-center items-center gap-4">
        <div class="news flex flex-wrap">
            <div
                class="news-item"
                v-for="item in reversedNews"
                @click="
                    newsView = item;
                    newsModal = true;
                ">
                <img :src="item.image">
                <div>{{ item.title }}</div>
                <div>{{ getDate(item.date) }}</div>
            </div>
        </div>

        <UModal v-model="newsModal">
            <div class="p-4">
                <div class="flex justify-center">
                    <img :src="newsView.image" width="400">
                </div>

                <hr class="my-4">

                <h2>{{ newsView.title }}</h2>
                <h4>{{ getDate(newsView.date) }}</h4>

                <hr class="my-4">

                <div v-html="newsView.text"></div>
            </div>
        </UModal>
    </div>
</template>

<script setup>
    const { data: news } = await useFetch('/api/news');

    const newsView = ref(null);
    const newsModal = ref(false);

    const reversedNews = computed(() => {
        return news.value.slice().reverse();
    });

    const getDate = date => {
        const d = new Date(date * 1000);

        return `${
            d.getDay().toString().padStart(2, '0')
        }.${
            d.getMonth().toString().padStart(2, '0')
        }.${
            d.getFullYear()
        }`;
    }
</script>

<style lang="scss" scoped>

.news{
    gap: 20px;
    width: 861px;

    .news-item{
        padding: 10px;
        width: 420px;
        height: 300px;
        flex: 0 0 420px;
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