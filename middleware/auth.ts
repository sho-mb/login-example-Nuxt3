export default defineNuxtRouteMiddleware(async (to, from) => {
  if (await isAuthenticated() === false) {
    return navigateTo('/login')
  }
})

async function isAuthenticated() {
  const { data, error } = await useFetch('/api/session');
  if (!data.value) {
    return false
  }
  return true
}
