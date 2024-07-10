/**
run below sql to set phamarcy, inventory and shipping role id
*/
UPDATE PharmacyUser
INNER JOIN roles AS r ON r.value = PharmacyUser.role
SET pharmacy_role_id = r.id;

UPDATE PharmacyUser
INNER JOIN roles AS r ON r.value = PharmacyUser.inventory_role
SET inventory_role_id = r.id;

UPDATE PharmacyUser
INNER JOIN roles AS r ON r.value = PharmacyUser.shipping_role
SET shipping_role_id = r.id;
