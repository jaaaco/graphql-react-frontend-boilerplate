import URLS from '../../urls'
import { Route, Switch } from 'react-router-dom'
import AppointmentList from './list'

const Appointments = () => (
  <Switch>
    <Route path={URLS.APPOINTMENTS} component={AppointmentList} />
  </Switch>
)

export default Appointments
