<?php get_header(); ?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php
        if (have_posts()) :
            if (is_home() && !is_front_page()) :
                ?>
                <header>
                    <h1 class="text-3xl font-bold mb-8"><?php single_post_title(); ?></h1>
                </header>
                <?php
            endif;

            echo '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
            
            while (have_posts()) :
                the_post();
                get_template_part('template-parts/content', get_post_type());
            endwhile;

            echo '</div>';

            the_posts_navigation(array(
                'prev_text' => __('← Older posts', 'voyage-deals'),
                'next_text' => __('Newer posts →', 'voyage-deals'),
                'class' => 'flex justify-between mt-8',
            ));

        else :
            get_template_part('template-parts/content', 'none');
        endif;
        ?>
    </div>
</main>

<?php get_footer(); ?>