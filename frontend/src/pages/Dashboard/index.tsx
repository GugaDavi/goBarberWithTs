import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  addDays,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import pt from "date-fns/locale/pt";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import api from "~/services/api";

import { Container, Time } from "./styles";

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

interface ISchedule {
  appointments: IAppointment[];
}

interface IAppointment {
  id: number;
  user: {
    name: string;
  };
  provider_id: number;
  date: string;
  canceled_at: boolean;
}

interface IScheduleItem {
  time: string;
  past: boolean;
  appointment: IAppointment | undefined;
}

export default function Dashboard() {
  const [schedule, setSchedule] = useState<IScheduleItem[]>([]);
  const [date, setDate] = useState(new Date());
  const dataFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const resp = await api.get<ISchedule>("/schedule", {
        params: { date }
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data: IScheduleItem[] = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: resp.data.appointments.find(apt =>
            isEqual(parseISO(apt.date), compareDate)
          )
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, []);

  function handleAddDay() {
    setDate(addDays(date, 1));
  }

  function handleSubDay() {
    setDate(subDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleSubDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dataFormatted}</strong>
        <button type="button" onClick={handleAddDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : "Em Aberto"}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
