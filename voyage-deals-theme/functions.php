<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Theme Setup
function voyage_deals_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Add support for responsive embeds
    add_theme_support('responsive-embeds');

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'voyage-deals'),
        'footer'  => esc_html__('Footer Menu', 'voyage-deals'),
    ));
}
add_action('after_setup_theme', 'voyage_deals_setup');

// Register Custom Post Types
function voyage_deals_register_post_types() {
    // Hotels
    register_post_type('hotel', array(
        'labels' => array(
            'name'               => __('Hotels', 'voyage-deals'),
            'singular_name'      => __('Hotel', 'voyage-deals'),
            'add_new'           => __('Add New', 'voyage-deals'),
            'add_new_item'      => __('Add New Hotel', 'voyage-deals'),
            'edit_item'         => __('Edit Hotel', 'voyage-deals'),
            'new_item'          => __('New Hotel', 'voyage-deals'),
            'view_item'         => __('View Hotel', 'voyage-deals'),
            'search_items'      => __('Search Hotels', 'voyage-deals'),
            'not_found'         => __('No hotels found', 'voyage-deals'),
            'not_found_in_trash'=> __('No hotels found in Trash', 'voyage-deals'),
        ),
        'public'              => true,
        'has_archive'         => true,
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'           => 'dashicons-building',
        'show_in_rest'        => true,
    ));

    // Flights
    register_post_type('flight', array(
        'labels' => array(
            'name'               => __('Flights', 'voyage-deals'),
            'singular_name'      => __('Flight', 'voyage-deals'),
            'add_new'           => __('Add New', 'voyage-deals'),
            'add_new_item'      => __('Add New Flight', 'voyage-deals'),
            'edit_item'         => __('Edit Flight', 'voyage-deals'),
            'new_item'          => __('New Flight', 'voyage-deals'),
            'view_item'         => __('View Flight', 'voyage-deals'),
            'search_items'      => __('Search Flights', 'voyage-deals'),
            'not_found'         => __('No flights found', 'voyage-deals'),
            'not_found_in_trash'=> __('No flights found in Trash', 'voyage-deals'),
        ),
        'public'              => true,
        'has_archive'         => true,
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'           => 'dashicons-airplane',
        'show_in_rest'        => true,
    ));

    // Vacation Packages
    register_post_type('package', array(
        'labels' => array(
            'name'               => __('Vacation Packages', 'voyage-deals'),
            'singular_name'      => __('Package', 'voyage-deals'),
            'add_new'           => __('Add New', 'voyage-deals'),
            'add_new_item'      => __('Add New Package', 'voyage-deals'),
            'edit_item'         => __('Edit Package', 'voyage-deals'),
            'new_item'          => __('New Package', 'voyage-deals'),
            'view_item'         => __('View Package', 'voyage-deals'),
            'search_items'      => __('Search Packages', 'voyage-deals'),
            'not_found'         => __('No packages found', 'voyage-deals'),
            'not_found_in_trash'=> __('No packages found in Trash', 'voyage-deals'),
        ),
        'public'              => true,
        'has_archive'         => true,
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'           => 'dashicons-palmtree',
        'show_in_rest'        => true,
    ));
}
add_action('init', 'voyage_deals_register_post_types');

// Register Custom Taxonomies
function voyage_deals_register_taxonomies() {
    // Destinations
    register_taxonomy('destination', array('hotel', 'flight', 'package'), array(
        'labels' => array(
            'name'              => __('Destinations', 'voyage-deals'),
            'singular_name'     => __('Destination', 'voyage-deals'),
            'search_items'      => __('Search Destinations', 'voyage-deals'),
            'all_items'         => __('All Destinations', 'voyage-deals'),
            'edit_item'         => __('Edit Destination', 'voyage-deals'),
            'update_item'       => __('Update Destination', 'voyage-deals'),
            'add_new_item'      => __('Add New Destination', 'voyage-deals'),
            'new_item_name'     => __('New Destination Name', 'voyage-deals'),
            'menu_name'         => __('Destinations', 'voyage-deals'),
        ),
        'hierarchical'        => true,
        'show_ui'            => true,
        'show_in_rest'       => true,
        'show_admin_column'  => true,
    ));

    // Amenities for Hotels
    register_taxonomy('amenity', 'hotel', array(
        'labels' => array(
            'name'              => __('Amenities', 'voyage-deals'),
            'singular_name'     => __('Amenity', 'voyage-deals'),
            'search_items'      => __('Search Amenities', 'voyage-deals'),
            'all_items'         => __('All Amenities', 'voyage-deals'),
            'edit_item'         => __('Edit Amenity', 'voyage-deals'),
            'update_item'       => __('Update Amenity', 'voyage-deals'),
            'add_new_item'      => __('Add New Amenity', 'voyage-deals'),
            'new_item_name'     => __('New Amenity Name', 'voyage-deals'),
            'menu_name'         => __('Amenities', 'voyage-deals'),
        ),
        'hierarchical'        => false,
        'show_ui'            => true,
        'show_in_rest'       => true,
        'show_admin_column'  => true,
    ));
}
add_action('init', 'voyage_deals_register_taxonomies');

// Enqueue scripts and styles
function voyage_deals_scripts() {
    // Enqueue theme stylesheet
    wp_enqueue_style('voyage-deals-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
    
    // Enqueue Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);
    
    // Enqueue theme JavaScript
    wp_enqueue_script('voyage-deals-navigation', get_template_directory_uri() . '/js/navigation.js', array(), wp_get_theme()->get('Version'), true);
    
    // Enqueue Leaflet for maps
    if (is_singular(array('hotel', 'package'))) {
        wp_enqueue_style('leaflet', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', array(), '1.9.4');
        wp_enqueue_script('leaflet', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', array(), '1.9.4', true);
    }
}
add_action('wp_enqueue_scripts', 'voyage_deals_scripts');

// Register widget areas
function voyage_deals_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'voyage-deals'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'voyage-deals'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Widget Area', 'voyage-deals'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'voyage-deals'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'voyage_deals_widgets_init');