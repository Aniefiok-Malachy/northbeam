import { Sidebar } from '@/components/dashboard/Sidebar';
import { Providers } from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-8 py-8">{children}</div>
      </div>
    </Providers>
  );
}
