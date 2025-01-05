<?php
/**
 * The template for displaying the footer
 */
?>

    <footer id="colophon" class="site-footer">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 class="text-xl font-bold text-white mb-4"><?php bloginfo('name'); ?></h3>
                    <p class="text-gray-400"><?php bloginfo('description'); ?></p>
                </div>
                
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="widget-area">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>

                <div>
                    <h3 class="text-xl font-bold text-white mb-4"><?php _e('Quick Links', 'voyage-deals'); ?></h3>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class'     => 'footer-menu text-gray-400',
                        'container'      => false,
                    ));
                    ?>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 text-center">
                <p class="text-gray-400">
                    © <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. 
                    <?php _e('All rights reserved.', 'voyage-deals'); ?>
                </p>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?></body>
</html>