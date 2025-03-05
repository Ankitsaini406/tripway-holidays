// @/components/Breadcrumbs.js
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/components/breadcrumb.module.css';

export default function Breadcrumbs({ title }) {
    const pathname = usePathname();
    
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    const crumbs = pathSegments.map((segment, index) => {
        let href = '/' + pathSegments.slice(0, index + 1).join('/');
        let label = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
            
        // Special handling for "Cabs" segment
        if (segment.toLowerCase() === 'cabs' && title) {
            href = `/cabs/${title.toLowerCase()}`;
            label = "Cabs";
        }
        
        return { href, label };
    });

    return (
        <nav aria-label="breadcrumb">
            <ol className={styles.breadcrumb}>
                <li className={styles.breadcrumbItem}>
                    <Link href="/">Home</Link>
                </li>
                
                {crumbs.map((crumb, index) => (
                    <li key={crumb.href} className={styles.breadcrumbItem}>
                        <span className={styles.separator}>&gt;</span>
                        {index === crumbs.length - 1 ? (
                            <span aria-current="page">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href}>{crumb.label}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}