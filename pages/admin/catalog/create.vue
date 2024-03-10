<template>
    <div>
        <div>
            <label>
                <span>Name: </span>
                <input type="text" v-model="form.name">
            </label>
        </div>

        <div>
            <label>
                <span>Price: </span>
                <input type="number" v-model="form.price">
            </label>
        </div>

        <div>
            <label>
                <span>Image: </span>
                <input type="text" v-model="form.image">
            </label>
        </div>

        <div>
            <button
                @click="create()"
                type="button">
                <span>Создать</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
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
                    alert('Done!');
                else
                    alert('Error!');
            },
        },
    }
</script>

<style>

</style>