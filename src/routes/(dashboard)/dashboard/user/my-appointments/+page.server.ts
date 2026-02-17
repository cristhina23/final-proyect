
import type { PageServerLoad } from './$types';
import { getClientAppointments } from '$lib/server/db/queries/appointments';

export const load: PageServerLoad = async ({ locals }) => {
    // Ensure user is logged in (locals.user should be populated by hooks)
    const userId = locals.user?.id;

    if (!userId) {
        return {
            appointments: []
        };
    }

    const appointments = await getClientAppointments(userId);

    return {
        appointments
    };
};
