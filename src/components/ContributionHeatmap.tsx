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
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-x-auto pb-2 custom-scrollbar" data-scrollable="true">
        <div className="min-w-fit">
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
      
      <div className="w-full flex justify-end items-center gap-2 mt-2 text-gray-500" style={{ fontSize: fontSize }}>
        <span className="text-xs md:text-sm">Less</span>
        <div className="flex gap-1">
          {theme.dark.map((color, i) => (
            <div
              key={i}
              className="rounded-[1px] border border-gray-700/50"
              style={{ 
                backgroundColor: color,
                width: blockSize * 0.9,
                height: blockSize * 0.9
              }}
            />
          ))}
        </div>
        <span className="text-xs md:text-sm">More</span>
      </div>
    </div>
  );
}
