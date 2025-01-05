<?php
/**
 * Template part for displaying posts
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('card mb-8'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="card-media">
            <?php the_post_thumbnail('large', array('class' => 'w-full h-48 object-cover')); ?>
        </div>
    <?php endif; ?>

    <div class="card-content p-6">
        <header class="entry-header mb-4">
            <?php
            if (is_singular()) :
                the_title('<h1 class="entry-title text-2xl font-bold">', '</h1>');
            else :
                the_title('<h2 class="entry-title text-xl font-bold"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
            endif;

            if ('post' === get_post_type()) :
                ?>
                <div class="entry-meta text-sm text-gray-600 mt-2">
                    <?php
                    voyage_deals_posted_on();
                    voyage_deals_posted_by();
                    ?>
                </div>
            <?php endif; ?>
        </header>

        <div class="entry-content">
            <?php
            if (is_singular()) :
                the_content();
            else :
                the_excerpt();
                ?>
                <a href="<?php echo esc_url(get_permalink()); ?>" class="button button-primary mt-4">
                    <?php _e('Read More', 'voyage-deals'); ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</article>