const REMOVE_GROUP = "groups/REMOVE_GROUP"


// action creator
const removeGroup = (groupId) => ({
    type: REMOVE_GROUP,
    groupId,
})

// thunk
export const deleteGroup = (groupId) => async (dispatch) => {
    const res = await fetch('/api/groups/${groupId}', {
        method: "DELETE",
    })

    if (res.ok) {
        dispatch(removeGroup(groupId))
    }
}


// reducer

const groupsReducer = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_GROUP:
            const newState = { ...state }
            delete newState[Action.groupId]
            return newState

        default:
            return state
    }
}

export default groupsReducer
