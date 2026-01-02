"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { ContributionDay } from "@/types";

interface Props {
  data: ContributionDay[];
  labels?: {
    less: string;
    more: string;
    totalCount: string;
  };
  blockSize?: number;
  blockMargin?: number;
  fontSize?: number;
}

export default function ContributionHeatmap({ data, labels, blockSize = 12, blockMargin = 3, fontSize = 11 }: Props) {
  // GitHub's authentic dark theme colors for contribution levels
  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="w-full flex flex-col items-center" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="w-full overflow-x-auto pb-2 custom-scrollbar" data-scrollable="true" style={{ width: '100%', overflowX: 'auto', paddingBottom: '8px' }}>
        <div className="min-w-fit" style={{ minWidth: 'fit-content' }}>
          <ActivityCalendar
            data={data}
            theme={theme}
            labels={{
              totalCount: labels?.totalCount || "{{count}} contributions in the last year",
              months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              weekdays: ["", "Mon", "", "Wed", "", "Fri", ""],
            }}
            colorScheme="dark"
            blockSize={blockSize}
            blockMargin={blockMargin}
            fontSize={fontSize}
            showWeekdayLabels
            showColorLegend={false}
          />
        </div>
      </div>
      
      <div className="w-full flex justify-end items-center gap-2 mt-2 text-gray-500" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#6b7280', fontSize: fontSize }}>
        <span style={{ fontSize: '12px' }}>{labels?.less || "Less"}</span>
        <div className="flex gap-1" style={{ display: 'flex', gap: '4px' }}>
          {theme.dark.map((color, i) => (
            <div
              key={i}
              style={{ 
                backgroundColor: color,
                width: blockSize * 0.9,
                height: blockSize * 0.9,
                borderRadius: '1px',
                border: '1px solid rgba(55, 65, 81, 0.5)'
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '12px' }}>{labels?.more || "More"}</span>
      </div>
    </div>
  );
}
