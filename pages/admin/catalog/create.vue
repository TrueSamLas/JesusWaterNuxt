<template>
    <div class="p-4">
        <UFormGroup label="Name: " class="mb-4">
            <UInput v-model="form.name" />
        </UFormGroup>

        <UFormGroup label="Price: " class="mb-4">
            <UInput v-model="form.price" type="number" />
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

        <UFormGroup>
            <UButton @click="create()">
                <span>Создать</span>
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
                    name: '',
                    price: '',
                    image: '',
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
            async create()
            {
                const success = await $fetch('/api/catalog/create', {
                    method: 'POST',
                    body: {
                        form: this.form,
                    },
                });

                if( success )
                    return navigateTo('/admin/catalog');
                else
                    alert('Error!');
            },
        },
    }
</script>

<style>

</style>