<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => ['required', 'string'],
            'posted_on' => [
                'required',
                'date',
                Rule::unique('updates')->where(function ($query) {
                    return $query
                        ->where('user_id', $this->user()->id)
                        ->whereDate('posted_on', $this->input('posted_on'));
                }),
            ],
            'tags' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Please provide a title.',
            'description.required' => 'Please provide a description.',
            'posted_on.required' => 'Please provide the update date.',
            'posted_on.unique' => 'You can only post one update per day.',
        ];
    }
}
