<footer class="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-16">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div class="space-y-4">
                <?php if (has_custom_logo()): ?>
                    <?php the_custom_logo(); ?>
                <?php else: ?>
                    <div class="flex items-center gap-3">
                        <div class="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                            </svg>
                        </div>
                        <span class="text-xl font-bold"><?php bloginfo('name'); ?></span>
                    </div>
                <?php endif; ?>
                <p class="text-gray-400 leading-relaxed">
                    <?php bloginfo('description'); ?>
                </p>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4"><?php _e('Menu', 'voyage-deals'); ?></h3>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'footer',
                    'container' => false,
                    'menu_class' => 'space-y-3 text-gray-400'
                ));
                ?>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4"><?php _e('Contact', 'voyage-deals'); ?></h3>
                <?php if (is_active_sidebar('footer-contact')): ?>
                    <?php dynamic_sidebar('footer-contact'); ?>
                <?php endif; ?>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4"><?php _e('Newsletter', 'voyage-deals'); ?></h3>
                <?php if (is_active_sidebar('footer-newsletter')): ?>
                    <?php dynamic_sidebar('footer-newsletter'); ?>
                <?php endif; ?>
            </div>
        </div>

        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('Tous droits réservés.', 'voyage-deals'); ?></p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>