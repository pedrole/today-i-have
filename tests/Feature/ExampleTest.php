<?php

test('home redirects to updates', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect(route('updates.index'));
});
