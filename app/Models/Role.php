<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property string $name
 */
class Role extends Model
{
    use HasFactory;

    public function modules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class)->using(ModuleRole::class);
    }

    public function apps(): BelongsToMany
    {
        return $this->belongsToMany(App::class)->using(AppRole::class);
    }
}
