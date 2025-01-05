<?php get_header(); ?>

<main class="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    <?php if (have_posts()): ?>
        <div class="container mx-auto px-6 py-24">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()): the_post(); ?>
                    <article class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <?php if (has_post_thumbnail()): ?>
                            <div class="aspect-[16/9] overflow-hidden">
                                <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500')); ?>
                            </div>
                        <?php endif; ?>
                        
                        <div class="p-6">
                            <div class="flex items-center gap-4 text-gray-600 mb-4">
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
                            
                            <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                <?php the_title(); ?>
                            </h2>
                            
                            <div class="text-gray-600 mb-4">
                                <?php the_excerpt(); ?>
                            </div>
                            
                            <a href="<?php the_permalink(); ?>" class="inline-flex items-center gap-2 text-blue-600 group/btn">
                                <span class="font-medium"><?php _e('Lire plus', 'voyage-deals'); ?></span>
                                <svg class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            
            <?php the_posts_pagination(); ?>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>