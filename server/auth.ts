import { defineNuxtRouteMiddleware } from '#app';
import { betterAuth } from 'better-auth';

const auth = betterAuth({
  // Add your auth configuration here
});

import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  
  const session = await auth.api.getSession({ headers: new Headers() });

  if (to.meta.requiresAuth && !session?.user && to.path !== '/login' && to.path !== '/register') {
    return { path: '/login' };
  }
});