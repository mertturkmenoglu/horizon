'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import data from './data';
import Item from './item';

const TIMEOUT_DURATION = 250;
let timeout: NodeJS.Timeout | null = null;
let categoryChangeTimeout: NodeJS.Timeout | null = null;

export default function CategoryNavigation() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const category = useMemo(() => {
    return categories.at(index)!;
  }, [index, categories]);

  const img = data.find((v) => v.category === category.category)?.img ?? null;

  return (
    <div
      onMouseEnter={() => {
        timeout = setTimeout(() => {
          if (timeout !== null) {
            setOpen(true);
          }
        }, TIMEOUT_DURATION);
      }}
      onMouseLeave={() => {
        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }
        setTimeout(() => {
          setOpen(false);
          setIndex(0);
        }, TIMEOUT_DURATION);
      }}
      onFocus={() => {
        setTimeout(() => {
          setOpen(true);
        }, TIMEOUT_DURATION);
      }}
    >
      <ScrollArea>
        <ul className="flex items-center justify-center space-x-4">
          {data.map((item, i) => (
            <Item
              {...item}
              key={item.href}
              onMouseEnter={() => {
                categoryChangeTimeout = setTimeout(() => {
                  setIndex(i);
                }, TIMEOUT_DURATION);
              }}
              onMouseLeave={() => {
                if (categoryChangeTimeout !== null) {
                  clearTimeout(categoryChangeTimeout);
                  timeout = null;
                }
              }}
              onFocus={() => {
                setTimeout(() => {
                  setIndex(i);
                }, TIMEOUT_DURATION);
              }}
            />
          ))}
        </ul>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div
        className={cn(
          'mt-2 grid-cols-2 gap-8 rounded-md border p-4 lg:grid-cols-3',
          {
            hidden: !(open && category),
            grid: open && category,
          }
        )}
      >
        <div className="relative col-span-2 lg:col-span-2">
          <img
            src={img ? img + '?q=80&w=768&auto=format&fit=crop' : ''}
            className="h-full rounded object-cover lg:aspect-[2] lg:h-auto lg:w-full"
            alt=""
            loading="eager"
          />
          <Link
            href={`/categories/${encodeURIComponent(
              category.category
            )}?id=${category.category}`}
            className="absolute bottom-2 left-8 ml-2 rounded-md bg-sky-100 px-2 py-1 text-xl font-bold text-sky-500"
          >
            {category.category}
          </Link>
        </div>

        <div className="col-span-2 mx-auto grid grid-cols-3 gap-4 lg:col-span-1 lg:mx-0">
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/categories/${encodeURIComponent(subcategory.title)}?id=${
                subcategory.id
              }`}
              className="flex aspect-square items-center justify-center rounded px-2 py-2 text-center text-sm text-muted-foreground hover:bg-muted"
            >
              {subcategory.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
