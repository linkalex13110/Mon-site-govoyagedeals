<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="relative min-h-[80px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600">
    <nav class="relative z-10 container mx-auto px-6 py-6">
        <div class="flex justify-between items-center">
            <?php if (has_custom_logo()): ?>
                <?php the_custom_logo(); ?>
            <?php else: ?>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3">
                    <div class="glass-effect p-2 rounded-xl">
                        <svg class="w-8 h-8 text-white animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold text-white"><?php bloginfo('name'); ?></span>
                </a>
            <?php endif; ?>

            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => 'div',
                'container_class' => 'hidden md:flex items-center gap-8',
                'menu_class' => 'flex items-center gap-8',
                'link_class' => 'text-white/90 hover:text-white transition-colors relative group text-sm font-medium'
            ));
            ?>
        </div>
    </nav>
</header>