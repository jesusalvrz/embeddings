import { db } from '$lib/server/db';

export async function load() {
    const users = await db.query.usersTable.findMany();
    return users;
}

export const actions = {
    register: async function({ cookies, request }) {
        const data = await request.formData();
        const fullName = data.get('fullName');
        const phone = data.get('phone');

        const newUser = await db.insert(usersTable).values({ fullName, phone });

        return {succes: true, newUser};
    }
};