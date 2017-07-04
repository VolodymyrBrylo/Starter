<?php

function load_contactform7_on_specific_page(){
    if(! is_page(74) ) // <-- Page
    {
        wp_dequeue_script('contact-form-7');
        wp_dequeue_style('contact-form-7');
    }
}

add_action( 'wp_enqueue_scripts', 'load_contactform7_on_specific_page' );