<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $name
 * @property int $status
 */
class Module extends Model
{
    use HasFactory;

    public function app(): HasMany
    {
        return $this->hasMany(App::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->using(ModuleRole::class);
    }
}
