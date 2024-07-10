<?php
namespace App\Library;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Undocumented class
 */
class User
{
    private string $table = 'PharmacyUser';

    /**
     * Get a list of pharmacists, except the currently authenticated one
     *
     * @return Collection
     */
    public function getPharmacist()
    {
        $data = DB::table('PharmacyUser')
            ->select(['PharmacyUser.id', 'PharmacyUser.esa_user_id', 'PharmacyUser.name', 'PharmacyUser.surname'])
            ->selectRaw("(SELECT COUNT(*) FROM Tray WHERE UserID = PharmacyUser.id AND Status = 1) AS count")
            ->whereIn('role', [29, 30, 35])
            ->where('id', '!=', Auth::id());

        if (Auth::user()->role < 50) {
            $data = $data->whereRaw("(DATE(`last_login_at`) = CURDATE() OR (SELECT COUNT(*) FROM Tray WHERE UserID = PharmacyUser.id AND Status = 1) > 0)");
        }

        $data = $data->get();

        return $data;
    }

    public function getDispenser(): Collection
    {
        $data = DB::table('PharmacyUser')
            ->select(['PharmacyUser.id', 'PharmacyUser.esa_user_id', 'PharmacyUser.name', 'PharmacyUser.surname'])
            ->selectRaw("(SELECT COUNT(*) FROM DispenserPool WHERE UserID = PharmacyUser.esa_user_id) AS count")
            ->where('role', 20)->where('id', '!=', Auth::id());

        if (Auth::user()->role < 50) {
            $data = $data->whereRaw("DATE(`last_login_at`) = CURDATE()");
        }

        $data = $data->get();

        return $data;
    }

    /**
     * Update a user by id
     *
     * @param int $id
     * @param array<mixed, mixed> $input
     * @return int
     */
    public function update($id, $input)
    {
        return DB::table($this->table)->where('id', $id)->update($input); // 0 on no changes, 1 on success
    }

    /**
     * Insert a user array
     *
     * @param array<mixed, mixed> $user
     * @return int
     */
    public function insert($user, bool $withId = false)
    {
        $query = DB::table($this->table); // 0 on no changes, 1 on success

        return $withId ? $query->insertGetId($user) : $query->insert($user);
    }

    /**
     * Get user details by ID
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|object|static|null
     */
    public function getUserDetails($id)
    {
        return DB::table($this->table)
            ->select(
                'name',
                'surname',
                'email',
                'role',
                'inventory_role',
                'shipping_role',
                'default_app',
                'esa_user_id',
                'code',
                'two_factor_secret'
            )->where('id', '=', $id)
            ->first();
    }

    /**
     * Get a collection of ESA users
     *
     * @return \Illuminate\Support\Collection
     */
    public function getESAUsers()
    {
        return DB::table('User')->select('UserID', 'Username')->get();
    }
}