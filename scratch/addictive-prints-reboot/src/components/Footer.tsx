'use client';

import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
  isIcons?: boolean;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns: FooterColumn[] = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Ponçage', href: '#ponçage' },
        { label: 'Aspiration', href: '#aspiration' },
        { label: 'Essentiels', href: '#essentiels' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
        { label: 'Shipping', href: '#shipping' },
        { label: 'Returns', href: '#returns' },
      ],
    },
    {
      title: 'Follow',
      links: [
        { label: 'Instagram', href: '#instagram', icon: 'favorite' },
        { label: 'Twitter', href: '#twitter', icon: 'favorite' },
        { label: 'Facebook', href: '#facebook', icon: 'favorite' },
      ],
      isIcons: true,
    },
  ];

  return (
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h3 className="font-semibold text-on-surface mb-4 uppercase text-sm tracking-wider">
                {col.title}
              </h3>
              <div className="space-y-3">
                {col.links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-on-surface-variant hover:text-primary transition-colors text-sm block"
                  >
                    {col.isIcons ? (
                      <span className="material-symbols-outlined text-xl hover:scale-110 transition-transform inline-block">
                        {link.icon}
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-outline-variant pt-8">
          <p className="text-on-surface-variant text-center text-sm">
            © {currentYear} ADDICTIVE PRINTS // Où l'artisanat rencontre la technologie
          </p>
        </div>
      </div>
    </footer>
  );
}
