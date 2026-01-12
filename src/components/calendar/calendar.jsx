import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { useContext } from "react";
import { AppContext } from "../context/appcontext";

export default function ScheduleCalendar() {
    const [date, setDate] = useState();
    const {isLogged} = useContext(AppContext);

    return (
        <div className="d-flex justify-content-center" style={{height: '350px'}}>
            <Calendar value={date} onChange={(e) => setDate(e.value)} minDate={new Date()} maxDate={new Date(new Date().getFullYear(), 12, 31)} disabled={!isLogged} monthNavigator={false} yearNavigator={false} inline />
        </div>
    )
}
        