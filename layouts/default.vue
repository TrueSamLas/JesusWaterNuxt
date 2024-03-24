<template>
    <div>
        <div class="flex justify-center items-center header px-4">
            <div class="flex basis-full justify-start items-center gap-1 p-1">
                <template v-if="session?.user?.role === 'admin'">
                    <NuxtLink to="/admin">
                        <UButton class="header-btn">Admin Panel</UButton>
                    </NuxtLink>
                </template>
            </div>

            <div class="nav flex justify-center items-center gap-1 p-1">
                <NuxtLink class="header-link" to="/">
                    <span>Главная</span>
                </NuxtLink>

                <NuxtLink class="header-link" to="/about">
                    <span>О нас</span>
                </NuxtLink>

                <NuxtLink class="logo header-link" to="/">
                    <img src="~/assets/Logo.svg" alt="">
                </NuxtLink>

                <NuxtLink class="header-link" to="/news">
                    <span>Новости</span>
                </NuxtLink>

                <NuxtLink class="header-link" to="/cart">
                    <span>Корзина</span>
                </NuxtLink>
            </div>

            <div class="flex basis-full justify-end items-center gap-1 p-1">
                <template v-if="status === 'unauthenticated'">                
                    <NuxtLink to="/login">
                        <UButton class="header-btn">Вход</UButton>
                    </NuxtLink>

                    <NuxtLink to="/register">
                        <UButton class="header-btn">Регистрация</UButton>
                    </NuxtLink>
                </template>

                <template v-if="status === 'authenticated'">
                    <NuxtLink to="/profile">
                        <UButton class="header-btn">Профиль</UButton>
                    </NuxtLink>

                    <NuxtLink to="/logout">
                        <UButton class="header-btn">Выход</UButton>
                    </NuxtLink>
                </template>

                <template v-if="status === 'loading'">
                    <UIcon name="i-svg-spinners-blocks-shuffle-3" />
                </template>
            </div>
        </div>

        <!-- <h2 class="page_name">Главная</h2> -->
        
        <div class="main_body py-4">
            <slot></slot>
        </div>

        <!-- footer -->
        <div class="footer">
            <div class="nav_menu">
                <ul>Соц. сети
                    <img src="assets/instagram_logo.svg" alt="">
                    <img src="assets/vk_logo.svg" alt="">
                    <img src="assets/facebook_logo.svg" alt="">
                </ul>
                <ul>Наша почта
                    <li>example@gmail.com</li>
                </ul>
            </div>
            <span>Copyright © (2023-2024)</span>
        </div>
    </div>
</template>

<script setup>
    const { status, getSession } = useAuth()
    const session = await getSession()
</script>

<style lang="scss" scoped>
    * {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    
    .header{
        height: 150px;
        background-color: #BD8484;
        
        .logo{
            flex: 0 0 180px;
        }

        .nav{
            position: relative;
            z-index: 2;
        }

        .header-link{
            font-size: 24px;
            color: #ffffff;
            font-weight: 700;
            padding: 15px;
            white-space: nowrap;
        }

        .header-btn{
            background-color: #9A6E6E;
            border-radius: 20px;
            min-width: 200px;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            min-height: 45px;
        }
    }

    .main_body{
        background-color: #FFC8D5;
    }

    .footer {
        background-color: #BD8484;
        height: 400px;

        .nav_menu{
            
        }
    }
</style>