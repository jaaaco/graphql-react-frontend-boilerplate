import URLS from '../../urls'
import { Route, Switch } from 'react-router-dom'
import AppointmentList from './list'
import AppointmentCreate from './create'

const Appointments = () => (
  <Switch>
    <Route path={URLS.NEW_APPOINTMENT} component={AppointmentCreate} />
    <Route path={URLS.APPOINTMENTS} component={AppointmentList} />
  </Switch>
)

export default Appointments
