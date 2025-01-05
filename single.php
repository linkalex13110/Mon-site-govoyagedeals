<?php get_header(); ?>

<main class="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-24">
    <?php while (have_posts()): the_post(); ?>
        <article class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <?php if (has_post_thumbnail()): ?>
                    <div class="aspect-video overflow-hidden">
                        <?php the_post_thumbnail('full', array('class' => 'w-full h-full object-cover')); ?>
                    </div>
                <?php endif; ?>
                
                <div class="p-8">
                    <div class="flex items-center gap-4 text-gray-600 mb-6">
                        <?php
                        $categories = get_the_category();
                        if ($categories): ?>
                            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                <?php echo esc_html($categories[0]->name); ?>
                            </span>
                        <?php endif; ?>
                        
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span class="text-sm"><?php echo get_the_date(); ?></span>
                        </div>
                    </div>
                    
                    <h1 class="text-4xl font-bold text-gray-900 mb-6">
                        <?php the_title(); ?>
                    </h1>
                    
                    <div class="prose prose-lg max-w-none">
                        <?php the_content(); ?>
                    </div>
                    
                    <?php
                    $tags = get_the_tags();
                    if ($tags): ?>
                        <div class="mt-8 pt-8 border-t border-gray-200">
                            <div class="flex flex-wrap gap-2">
                                <?php foreach ($tags as $tag): ?>
                                    <a href="<?php echo get_tag_link($tag->term_id); ?>" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                                        #<?php echo $tag->name; ?>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <?php
            if (comments_open() || get_comments_number()):
                comments_template();
            endif;
            ?>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>