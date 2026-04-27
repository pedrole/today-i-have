<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    /** @use HasFactory<\Database\Factories\UpdateFactory> */
    use HasFactory;

    // mass assignable attributes
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'posted_on',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
