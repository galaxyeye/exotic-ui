import { BrowserRouter as Router, Route } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import withTracker from '../withTracker';

// ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//     return useRoutes([MainRoutes, LoginRoutes]);
// }

const routes = [LoginRoutes, MainRoutes];
console.log(routes);

export default () => (
    <Router basename={process.env.REACT_APP_BASENAME || ''}>
        <div>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={withTracker((props) => {
                            return (
                                <route.layout {...props}>
                                    <route.component {...props} />
                                </route.layout>
                            );
                        })}
                    />
                );
            })}
        </div>
    </Router>
);
