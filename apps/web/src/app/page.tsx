import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NX Test App',
  description: 'A Next.js application with Nx monorepo',
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to NX Test</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          A modern full-stack application built with Next.js 15, React 19, and
          Nx
        </p>
        <div className="pt-4">
          <Link
            href="/todos"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            View Todos
          </Link>
        </div>
      </div>
    </main>
  );
}
