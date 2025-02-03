import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  
} from "@/components/ui/chart";
import { useEffect } from "react";
import { useFetchChart } from "@/hooks/company";
export const description = "An area chart with gradient fill";
const chartData = [
  { month: "January", desktop: 186, mobile: 80, total: 266 },
  { month: "February", desktop: 305, mobile: 200, total: 505 },
  { month: "March", desktop: 237, mobile: 120, total: 357 },
  { month: "April", desktop: 73, mobile: 190, total: 263 },
  { month: "May", desktop: 209, mobile: 130, total: 339 },
  { month: "June", desktop: 214, mobile: 140, total: 254 },
  { month: "July", desktop: 0, mobile: 0, total: 0 },
  { month: "August", desktop: 0, mobile: 0, total: 0 },
  { month: "September", desktop: 0, mobile: 0, total: 0 },
  { month: "October", desktop: 0, mobile: 0, total: 0 },
  { month: "November", desktop: 0, mobile: 0, total: 0 },
  { month: "December", desktop: 0, mobile: 0, total: 0 },
];
const chartConfig = {
  desktop: {
    label: "Successful Verifications",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Failed Verifications",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "Total Verifications",
    color: "var(--sroke-clr)",
  },
} satisfies ChartConfig;

export default function DashboardChart() {
  const {fetchChart} = useFetchChart();

  useEffect(()=> {
    const getCardData = async () => {
      try {
        const data = await fetchChart();
          console.log(data);
          
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };
    getCardData();
  }, [fetchChart])
  
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="total"
          type="linear"
          fill="var(--stroke-clr)"
          fillOpacity={0.4}
          stroke="var(--stroke-clr)"
        />
        <Area
          dataKey="desktop"
          type="linear"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
        <Area
          dataKey="mobile"
          type="linear"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
