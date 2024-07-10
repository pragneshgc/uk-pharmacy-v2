export function getItemByKeyValue(object, key, value) {
    return Object.values(object).filter(
        (item) => {
            if (item[key] == value) {
                return item;
            }
        },
        key,
        value
    );
}

export function isItemExist(object, key, value) {
    let item = getItemByKeyValue(object, key, value);
    return item.length;
}

export function isValueExist(json, value) {
    return Object.values(json).includes(value);
}

export function getKeyByValue(json, value) {
    return Object.keys(json).find((key) => json[key] === value);
}

export function canUserAccessModule(
    active_modules,
    module_roles,
    module,
    role_id
) {
    if (role_id == 1 || role_id == 2) {
        return true;
    }
    let ind = getKeyByValue(active_modules, module);
    if (ind !== undefined) {
        return module_roles[ind]?.includes(role_id);
    }
    return false;
}
