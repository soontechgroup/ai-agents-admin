"use client";

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumb-item">
          {item.current ? (
            <span className="breadcrumb-current">{item.label}</span>
          ) : (
            <>
              <Link href={item.href || '#'} className="breadcrumb-link">
                {item.label}
              </Link>
              {index < items.length - 1 && (
                <span className="breadcrumb-separator">/</span>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
}