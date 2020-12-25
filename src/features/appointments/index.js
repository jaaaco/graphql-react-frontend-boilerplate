import URLS from '../../urls'
import { Route, Switch } from 'react-router-dom'
import AppointmentList from './list'
import AppointmentDetails from './details'

const Appointments = () => (
  <Switch>
    <Route path={URLS.APPOINTMENT_DETAILS} component={AppointmentDetails} />
    <Route path={URLS.APPOINTMENTS} component={AppointmentList} />
  </Switch>
)

export default Appointments
