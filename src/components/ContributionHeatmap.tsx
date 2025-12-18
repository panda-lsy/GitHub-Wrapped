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
}

export default function ContributionHeatmap({ data, labels, blockSize = 12, blockMargin = 4 }: Props) {
  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-full [&>svg]:w-full [&>svg]:h-auto">
        <ActivityCalendar
          data={data}
          theme={theme}
          labels={{
            totalCount: labels?.totalCount || "{{count}} contributions in the last year",
          }}
          colorScheme="dark"
          blockSize={blockSize}
          blockMargin={blockMargin}
          fontSize={12}
          showWeekdayLabels
          showColorLegend={false}
        />
      </div>
      
      <div className="w-full flex justify-end items-center gap-2 mt-2 text-xs text-[#9ca3af]">
        <span>{labels?.less || "Less"}</span>
        <div className="flex gap-1">
          {theme.dark.map((color, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>{labels?.more || "More"}</span>
      </div>
    </div>
  );
}
