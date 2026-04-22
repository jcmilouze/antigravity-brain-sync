'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function CategoriesBento() {
  const categories = [
    {
      name: 'Ponçage',
      image: '/images/ponçage.jpg',
    },
    {
      name: 'Aspiration',
      image: '/images/aspiration.jpg',
    },
    {
      name: 'Essentiels',
      image: '/images/essentiels.jpg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map(cat => (
            <motion.div
              key={cat.name}
              className="card h-64 relative overflow-hidden cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="img-grayscale w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-on-surface uppercase font-bold text-lg">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
