<template>
    <div class="p-4">
        <UFormGroup label="Title: " class="mb-4">
            <UInput v-model="form.title" />
        </UFormGroup>

        <UFormGroup label="Image (URL): " class="mb-4">
            <UButtonGroup class="w-full" orientation="horizontal">
                <UTextarea class="grow shrink-0" v-model="form.image" />

                <UButton
                    @click="pickFile()"
                    class="basis-0 grow-0 shrink"
                    icon="i-fa6-solid-file-image"
                    color="white">
                    Загрузить
                </UButton>
            </UButtonGroup>
        </UFormGroup>

        <UFormGroup label="Text: " class="mb-4">
            <UTextarea v-model="form.text" />
        </UFormGroup>

        <UFormGroup label="Date: " class="mb-4">
            <!-- <UInput disabled v-model="form.date" /> -->
            <span>{{ new Date(form.date * 1000) }}</span>
        </UFormGroup>

        <UFormGroup>
            <UButton @click="edit()">
                <span>Изменить</span>
            </UButton>
        </UFormGroup>
    </div>
</template>

<script>
    export default {
        setup()
        {
            const { files, open: pickFile } = useFileDialog({
                accept: 'image/*',
            });

            const file = computed(() => files.value?.[0]);

            const { base64: base64Image } = useBase64(file);

            return {
                pickFile,
                base64Image,
            }
        },
        data()
        {
            return {
                form: {
                    title: '',
                    image: '',
                    text: '',
                    date: Math.round(Date.now() / 1000),
                },
            };
        },
        watch: {
            base64Image(value)
            {
                this.form.image = value;
            },
        },
        methods: {
            async load()
            {
                const newsitem = await $fetch(`/api/news/find/${ this.$route.params.id }`);

                this.form = {
                    ...this.form,
                    ...newsitem,
                };
            },

            async edit()
            {
                const success = await $fetch(`/api/news/edit/${ this.$route.params.id }`, {
                    method: 'PUT',
                    body: {
                        form: this.form,
                    },
                });

                if( success )
                    return navigateTo('/admin/news');
                else
                    alert('Error!');
            },
        },
        mounted()
        {
            this.load();
        },
    }
</script>

<style>

</style>