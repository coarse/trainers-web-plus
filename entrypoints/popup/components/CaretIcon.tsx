interface CaretIconProps extends React.SVGProps<SVGSVGElement> {
  direction: "up" | "down";
}

function CaretIcon({ direction, ...props }: CaretIconProps) {
  return (
    <svg
      className={`dropdown-arrow ${direction === "up" ? "rotated" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export default CaretIcon;
