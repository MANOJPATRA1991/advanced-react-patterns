import * as userClient from '../../../user-client';
import { FAIL_UPDATE, FINISH_UPDATE, RESET, START_UPDATE } from "../reducers/types";

export async function updateUser (dispatch, user, updates) {
    dispatch({ type: START_UPDATE, updates });
    try {
        const updatedUser = await userClient.updateUser(user, updates);
        dispatch({ type: FINISH_UPDATE, updatedUser });
        return updatedUser;
    } catch (error) {
        dispatch({ type: FAIL_UPDATE, error });
        return Promise.reject(error);
    }
}

export function resetUser (dispatch) {
    dispatch({ type: RESET });
}