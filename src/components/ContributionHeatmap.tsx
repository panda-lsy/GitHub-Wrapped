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
    <div className="w-full flex flex-col items-center" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }}>
      <div className="w-full overflow-x-auto pb-2 custom-scrollbar" data-scrollable="true" style={{ width: '100%', overflowX: 'auto', paddingBottom: '16px' }}>
        <div className="min-w-fit" style={{ minWidth: 'fit-content', padding: '10px' }}>
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
      
      <div className="w-full flex justify-end items-center gap-4 mt-4" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '16px', color: '#8b949e' }}>
        <span style={{ fontSize: `${fontSize}px`, fontWeight: 500 }}>{labels?.less || "Less"}</span>
        <div className="flex gap-1" style={{ display: 'flex', gap: '6px' }}>
          {theme.dark.map((color, i) => (
            <div
              key={i}
              style={{ 
                backgroundColor: color,
                width: blockSize,
                height: blockSize,
                borderRadius: '3px',
                border: '1px solid rgba(240, 246, 252, 0.1)'
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: `${fontSize}px`, fontWeight: 500 }}>{labels?.more || "More"}</span>
      </div>
    </div>

  );
}
