'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Bell,
  Settings,
  ChevronsLeft,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/api';

const items = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: ArrowLeftRight, label: 'Transactions' },
  { icon: Wallet, label: 'Wallet' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-line bg-ink-raised/40 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && <span className="font-display text-lg">Northbeam</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
          className="rounded p-1 text-paper/50 hover:text-paper"
        >
          <ChevronsLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-2">
        {items.map((item, i) => (
          <button
            key={item.label}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-paper/70 transition-colors hover:bg-white/5 hover:text-paper',
              i === 0 && 'bg-white/5 text-paper',
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {!collapsed && item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-line px-2 py-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-paper/60 transition-colors hover:bg-white/5 hover:text-clay"
        >
          <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {!collapsed && 'Log out'}
        </button>
      </div>
    </aside>
  );
}
