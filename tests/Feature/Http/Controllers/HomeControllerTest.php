<?php

test('homepage redirects to updates', function () {
    $this->get(route('home'))
        ->assertRedirect(route('updates.index'));
});
