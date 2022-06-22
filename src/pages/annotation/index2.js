// material-ui
import {Grid, Typography} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AnnotationDefault2 = () => {
    return (
        <Grid container>
            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Recent Orders</Typography>
                    </Grid>
                    <Grid item/>
                </Grid>
                <MainCard sx={{mt: 2}} content={false}>
                    <OrdersTable/>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AnnotationDefault2;
