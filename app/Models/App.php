<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property string $name
 * @property string $slug
 */
class App extends Model
{
    use HasFactory;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = ['name', 'slug'];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->using(AppRole::class);
    }

    public function modules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class)->using(AppModule::class);
    }

    public function active_modules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class)->using(AppModule::class)->where('status', 1);
    }
}
