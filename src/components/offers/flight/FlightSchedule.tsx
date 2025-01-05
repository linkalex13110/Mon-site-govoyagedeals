import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleProps {
  date: string;
  time: string;
  airport: string;
  airline?: string;
}

export function Schedule({ date, time, airport, airline }: ScheduleProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <p className="text-xl font-bold">{time}</p>
      <p className="text-gray-700">{airport}</p>
      {airline && (
        <p className="text-sm text-gray-500 mt-1">{airline}</p>
      )}
    </div>
  );
}