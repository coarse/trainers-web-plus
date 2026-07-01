import clsx from "clsx/lite";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  subtitle: string;
}

function StatCard({
  label,
  value,
  subtitle,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={clsx("relative flex flex-col overflow-hidden", className)}
      {...props}
    >
      <div className="bg-[#efefef] text-xs font-medium p-2 rounded-t-md">
        {label}
      </div>
      <div className="flex justify-end items-baseline gap-2 bg-[#f7f7f7] p-2 rounded-b-md">
        <div className="text-base font-extrabold">{value}</div>
        <div className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
