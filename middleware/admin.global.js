export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getSession } = useAuth()
    const session = await getSession();

    if( to.path.startsWith('/admin/') && session?.user?.role !== 'admin' )
        return navigateTo('/');
})