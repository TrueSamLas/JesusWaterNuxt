<template>
    <div class="test">
        <p>TEST</p>
        <div class="chipi"></div>
        <table>
            <tr v-for="item in catalog">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td><img :src="item.image" alt=""></td>
            </tr>
        </table>
    </div>
</template>


<script>
export default {
    data(){
        return {
            catalog: []
        }
    },
    methods: {
        async loadCatalog(){
            this.catalog = await $fetch('/api/catalog');
        }
    },
    created(){
        this.loadCatalog()
    }
}
</script>


<style>
.chipi {
    width: 300px;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif');
}
</style>