// app/admin/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminPage() {
    return (
        <ProtectedRoute requiredRole="admin">
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                        <p className="text-gray-600">This page is only accessible to admin users.</p>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}