import Link from 'next/link';
import type { Metadata } from 'next';
import type { Todo } from '@nx-test/schemas';

export const metadata: Metadata = {
  title: 'Todos - NX Test App',
  description: 'Manage your todos',
};

// Placeholder data - will be replaced with API calls in Phase 2
const PLACEHOLDER_TODOS: Todo[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    text: 'Set up Supabase authentication',
    completed: false,
    userId: 'user-123',
    createdAt: new Date('2025-10-01T10:00:00Z'),
    updatedAt: new Date('2025-10-01T10:00:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    text: 'Create todo management UI',
    completed: true,
    userId: 'user-123',
    createdAt: new Date('2025-10-02T14:30:00Z'),
    updatedAt: new Date('2025-10-03T09:15:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    text: 'Implement real-time todo updates',
    completed: false,
    userId: 'user-123',
    createdAt: new Date('2025-10-03T16:45:00Z'),
    updatedAt: new Date('2025-10-03T16:45:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    text: 'Add todo filtering and sorting',
    completed: false,
    userId: 'user-123',
    createdAt: new Date('2025-10-04T11:20:00Z'),
    updatedAt: new Date('2025-10-04T11:20:00Z'),
  },
];

export default function TodosPage() {
  const completedCount = PLACEHOLDER_TODOS.filter((todo) => todo.completed).length;
  const totalCount = PLACEHOLDER_TODOS.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header with back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-600 mt-2">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>

        {/* Placeholder notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Placeholder Data
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                This page displays hardcoded sample todos. In Phase 2, this will be
                replaced with real data from the Supabase backend.
              </p>
            </div>
          </div>
        </div>

        {/* Todo list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {PLACEHOLDER_TODOS.map((todo) => (
              <li
                key={todo.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex items-center h-6 mt-0.5">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p
                      className={`text-base ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {todo.text}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>
                        Created:{' '}
                        {new Date(todo.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {todo.createdAt.getTime() !== todo.updatedAt.getTime() && (
                        <span>
                          Updated:{' '}
                          {new Date(todo.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty state (hidden when there are todos) */}
        {PLACEHOLDER_TODOS.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No todos yet
            </h3>
            <p className="text-gray-500">
              Get started by adding your first todo item.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
