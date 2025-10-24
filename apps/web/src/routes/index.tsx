import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/components'
import { Home, Calculator, Results, Scenarios } from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>,
  },
  {
    path: '/calculator',
    element: <MainLayout><Calculator /></MainLayout>,
  },
  {
    path: '/results',
    element: <MainLayout><Results /></MainLayout>,
  },
  {
    path: '/scenarios',
    element: <MainLayout><Scenarios /></MainLayout>,
  },
  {
    path: '*',
    element: <MainLayout><div><h1>404 - Page Not Found</h1></div></MainLayout>,
  },
]

export const router = createBrowserRouter(routes)
