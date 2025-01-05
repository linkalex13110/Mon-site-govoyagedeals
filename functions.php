<?php
// Register Custom Post Types and Taxonomies
function voyage_deals_setup() {
    // Register Deal Tags Taxonomy
    register_taxonomy('deal_tags', ['deals', 'post'], [
        'labels' => [
            'name' => 'Tags des offres',
            'singular_name' => 'Tag',
            'add_new_item' => 'Ajouter un nouveau tag',
            'new_item_name' => 'Nom du nouveau tag',
            'menu_name' => 'Tags'
        ],
        'hierarchical' => false,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'tag-offre'],
        'show_in_rest' => true
    ]);

    // Register Deal Categories Taxonomy
    register_taxonomy('deal_categories', ['deals', 'post'], [
        'labels' => [
            'name' => 'Catégories',
            'singular_name' => 'Catégorie',
            'add_new_item' => 'Ajouter une nouvelle catégorie',
            'new_item_name' => 'Nom de la nouvelle catégorie',
            'menu_name' => 'Catégories'
        ],
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'categorie-offre'],
        'show_in_rest' => true
    ]);

    // Register Deals Custom Post Type
    register_post_type('deals', [
        'labels' => [
            'name' => 'Offres',
            'singular_name' => 'Offre',
            'add_new' => 'Ajouter une offre',
            'add_new_item' => 'Ajouter une nouvelle offre',
            'edit_item' => 'Modifier l\'offre',
            'new_item' => 'Nouvelle offre',
            'view_item' => 'Voir l\'offre',
            'search_items' => 'Rechercher des offres',
            'not_found' => 'Aucune offre trouvée',
            'not_found_in_trash' => 'Aucune offre trouvée dans la corbeille',
            'menu_name' => 'Offres de voyage'
        ],
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-airplane',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'taxonomies' => ['deal_tags', 'deal_categories'],
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'offres']
    ]);
}
add_action('init', 'voyage_deals_setup');

// Add Custom Meta Boxes for Deals
function voyage_deals_add_meta_boxes() {
    add_meta_box(
        'deal_details',
        'Détails de l\'offre',
        'voyage_deals_meta_box_callback',
        'deals',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'voyage_deals_add_meta_boxes');

function voyage_deals_meta_box_callback($post) {
    wp_nonce_field('voyage_deals_save_meta_box', 'voyage_deals_meta_box_nonce');

    $price = get_post_meta($post->ID, '_deal_price', true);
    $original_price = get_post_meta($post->ID, '_deal_original_price', true);
    $location = get_post_meta($post->ID, '_deal_location', true);
    $start_date = get_post_meta($post->ID, '_deal_start_date', true);
    $end_date = get_post_meta($post->ID, '_deal_end_date', true);
    $duration = get_post_meta($post->ID, '_deal_duration', true);
    $featured = get_post_meta($post->ID, '_deal_featured', true);
    ?>
    <div class="deal-meta-box">
        <p>
            <label for="deal_price">Prix (€)</label>
            <input type="number" id="deal_price" name="deal_price" value="<?php echo esc_attr($price); ?>" step="0.01">
        </p>
        <p>
            <label for="deal_original_price">Prix initial (€)</label>
            <input type="number" id="deal_original_price" name="deal_original_price" value="<?php echo esc_attr($original_price); ?>" step="0.01">
        </p>
        <p>
            <label for="deal_location">Destination</label>
            <input type="text" id="deal_location" name="deal_location" value="<?php echo esc_attr($location); ?>">
        </p>
        <p>
            <label for="deal_start_date">Date de début</label>
            <input type="date" id="deal_start_date" name="deal_start_date" value="<?php echo esc_attr($start_date); ?>">
        </p>
        <p>
            <label for="deal_end_date">Date de fin</label>
            <input type="date" id="deal_end_date" name="deal_end_date" value="<?php echo esc_attr($end_date); ?>">
        </p>
        <p>
            <label for="deal_duration">Durée (jours)</label>
            <input type="number" id="deal_duration" name="deal_duration" value="<?php echo esc_attr($duration); ?>">
        </p>
        <p>
            <label for="deal_featured">
                <input type="checkbox" id="deal_featured" name="deal_featured" <?php checked($featured, 'yes'); ?>>
                Offre mise en avant
            </label>
        </p>
    </div>
    <?php
}

function voyage_deals_save_meta_box($post_id) {
    if (!isset($_POST['voyage_deals_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['voyage_deals_meta_box_nonce'], 'voyage_deals_save_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'deal_price',
        'deal_original_price',
        'deal_location',
        'deal_start_date',
        'deal_end_date',
        'deal_duration'
    ];

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }

    $featured = isset($_POST['deal_featured']) ? 'yes' : 'no';
    update_post_meta($post_id, '_deal_featured', $featured);
}
add_action('save_post_deals', 'voyage_deals_save_meta_box');

// Add Custom Columns to Deals Admin List
function voyage_deals_custom_columns($columns) {
    $new_columns = array();
    foreach ($columns as $key => $value) {
        if ($key === 'title') {
            $new_columns[$key] = $value;
            $new_columns['price'] = 'Prix';
            $new_columns['location'] = 'Destination';
            $new_columns['dates'] = 'Dates';
            $new_columns['featured'] = 'Mise en avant';
        } else {
            $new_columns[$key] = $value;
        }
    }
    return $new_columns;
}
add_filter('manage_deals_posts_columns', 'voyage_deals_custom_columns');

function voyage_deals_custom_columns_content($column, $post_id) {
    switch ($column) {
        case 'price':
            $price = get_post_meta($post_id, '_deal_price', true);
            echo $price ? esc_html($price) . '€' : '-';
            break;
        case 'location':
            $location = get_post_meta($post_id, '_deal_location', true);
            echo esc_html($location);
            break;
        case 'dates':
            $start = get_post_meta($post_id, '_deal_start_date', true);
            $end = get_post_meta($post_id, '_deal_end_date', true);
            echo $start ? date('d/m/Y', strtotime($start)) : '-';
            echo $end ? ' → ' . date('d/m/Y', strtotime($end)) : '';
            break;
        case 'featured':
            $featured = get_post_meta($post_id, '_deal_featured', true);
            echo $featured === 'yes' ? '⭐' : '-';
            break;
    }
}
add_action('manage_deals_posts_custom_column', 'voyage_deals_custom_columns_content', 10, 2);

// Add REST API Support for Custom Fields
function voyage_deals_register_rest_fields() {
    register_rest_field('deals', 'deal_meta', [
        'get_callback' => function($post) {
            return [
                'price' => get_post_meta($post['id'], '_deal_price', true),
                'original_price' => get_post_meta($post['id'], '_deal_original_price', true),
                'location' => get_post_meta($post['id'], '_deal_location', true),
                'start_date' => get_post_meta($post['id'], '_deal_start_date', true),
                'end_date' => get_post_meta($post['id'], '_deal_end_date', true),
                'duration' => get_post_meta($post['id'], '_deal_duration', true),
                'featured' => get_post_meta($post['id'], '_deal_featured', true) === 'yes'
            ];
        },
        'schema' => [
            'description' => 'Deal custom fields',
            'type' => 'object'
        ]
    ]);
}
add_action('rest_api_init', 'voyage_deals_register_rest_fields');

// Add Custom Dashboard Widget for Quick Stats
function voyage_deals_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'voyage_deals_dashboard_widget',
        'Statistiques des offres',
        'voyage_deals_dashboard_widget_content'
    );
}
add_action('wp_dashboard_setup', 'voyage_deals_add_dashboard_widget');

function voyage_deals_dashboard_widget_content() {
    $total_deals = wp_count_posts('deals')->publish;
    $featured_deals = get_posts([
        'post_type' => 'deals',
        'meta_key' => '_deal_featured',
        'meta_value' => 'yes',
        'posts_per_page' => -1
    ]);
    $featured_count = count($featured_deals);

    echo '<ul>';
    echo '<li>Nombre total d\'offres : ' . $total_deals . '</li>';
    echo '<li>Offres mises en avant : ' . $featured_count . '</li>';
    echo '</ul>';
}

// Add Custom CSS for Admin
function voyage_deals_admin_styles() {
    ?>
    <style>
        .deal-meta-box {
            display: grid;
            gap: 1rem;
            padding: 1rem;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .deal-meta-box label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        .deal-meta-box input[type="text"],
        .deal-meta-box input[type="number"],
        .deal-meta-box input[type="date"] {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .column-price,
        .column-location,
        .column-dates,
        .column-featured {
            width: 15%;
        }
    </style>
    <?php
}
add_action('admin_head', 'voyage_deals_admin_styles');

// Add Theme Support
function voyage_deals_theme_support() {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    add_theme_support('customize-selective-refresh-widgets');
}
add_action('after_setup_theme', 'voyage_deals_theme_support');

// Register Navigation Menus
function voyage_deals_register_menus() {
    register_nav_menus([
        'primary' => 'Menu Principal',
        'footer' => 'Menu Footer'
    ]);
}
add_action('init', 'voyage_deals_register_menus');

// Register Widget Areas
function voyage_deals_widgets_init() {
    register_sidebar([
        'name' => 'Footer Contact',
        'id' => 'footer-contact',
        'description' => 'Zone de widgets pour les informations de contact dans le footer',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="text-lg font-semibold mb-4">',
        'after_title' => '</h4>'
    ]);

    register_sidebar([
        'name' => 'Footer Newsletter',
        'id' => 'footer-newsletter',
        'description' => 'Zone de widgets pour le formulaire newsletter dans le footer',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="text-lg font-semibold mb-4">',
        'after_title' => '</h4>'
    ]);
}
add_action('widgets_init', 'voyage_deals_widgets_init');

// Add Custom Image Sizes
function voyage_deals_image_sizes() {
    add_image_size('deal-thumbnail', 800, 600, true);
    add_image_size('blog-featured', 1200, 675, true);
    add_image_size('blog-thumbnail', 400, 300, true);
}
add_action('after_setup_theme', 'voyage_deals_image_sizes');

// Add Editor Styles
function voyage_deals_add_editor_styles() {
    add_editor_style('editor-style.css');
}
add_action('admin_init', 'voyage_deals_add_editor_styles');