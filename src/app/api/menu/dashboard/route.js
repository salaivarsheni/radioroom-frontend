import { NextResponse } from 'next/server';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'dashboard',
            type: 'collapse',
            icon: 'dashboard',
            children: [
                {
                    id: 'default',
                    title: 'default',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'dashboard',
                    breadcrumbs: false
                },
                {
                    id: 'analytics',
                    title: 'analytics',
                    type: 'item',
                    url: '/dashboard/analytics',
                    icon: 'stories',
                    breadcrumbs: false
                },
                {
                    id: 'authors',
                    title: 'authors',
                    type: 'item',
                    url: '/dashboard/authors',
                    icon: 'authors',
                    breadcrumbs: false
                },
                {
                    id: 'promoCode',
                    title: 'Promo code',
                    type: 'item',
                    url: '/dashboard/promo-code',
                    icon: 'promoCode'
                },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/dashboard/users',
                    icon: 'users'
                }
            ]
        }
    ]
};

export async function GET() {
    // Force cache bust
    console.log(NextResponse.json({ dashboard }));
    return NextResponse.json({ dashboard });
}
