import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from "../layout/MainLayout";

// render - login
const AnnotationDefault = Loadable(lazy(() => import('pages/annotation')));

// ==============================|| AUTH ROUTING ||============================== //

const AnnotationRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'annotation',
            element: <AnnotationDefault/>
        }
    ]
};

export default AnnotationRoutes;
