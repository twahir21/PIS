import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getApi } from "./api/get.api";
import { createApi } from "./api/create.api";
import { deleteApi } from "./api/delete.api";
import { updateApi } from "./api/update.api";

// overview Data 
export const useOverview = routeLoader$(async ({ redirect, cookie, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await getApi.overview(token!);
});

// buses Data 
export const useBuses = routeLoader$(async ({ redirect, cookie, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await getApi.buses(token!);
});

export const useCreateBuses = routeAction$(async (data, { cookie, redirect, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await createApi.buses(data, token!);
});

export const useDeleteBuses = routeAction$(async (id, { cookie, redirect, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await deleteApi.buses(id, token!);
});

export const useUpdateBuses = routeAction$(async (body, { cookie, redirect, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await updateApi.buses(body, token!);
});


// users Data 
export const useUsers = routeLoader$(async ({ redirect, cookie, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await getApi.users(token!);
});

export const useCreateUsers = routeAction$(async (data, { cookie, redirect, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");    
   return await createApi.users(data, token!);
});

export const useDeleteUsers = routeAction$(async (id, { cookie, redirect, pathname}) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await deleteApi.users(id, token!);
})


// activity Data
export const useActivity = routeLoader$(async({ cookie, redirect, pathname }) => {
    const token = cookie.get("jwtToken")?.value;
    if (!token && pathname.startsWith("/admin")) throw redirect(302, "/auth");
    return await getApi.activity(token!);
});


// get username and role
export const useusernameRole = routeLoader$(({ cookie }) => {
    return {
        username: cookie.get("username")?.value || null,
        role: cookie.get("role")?.value || null
    }
});

// login
export const useLogin = routeAction$(async(data, { cookie, redirect }) => {
    const result = await createApi.login(data);

    if (result.success) {
        cookie.set("jwtToken", result.token, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        cookie.set("username", result.username, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        cookie.set("role", result.role, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
        throw redirect(302, "/admin")
    }
    throw redirect(302, "/auth");

},  zod$({
    username: z.string().min(2),
    password: z.string().min(3)
  })
)
