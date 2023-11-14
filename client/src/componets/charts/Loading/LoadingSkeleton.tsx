type Props = {
  size: number;
};

export default function LoadingSkeleton({ size }: Props) {
  return (
    <div
      role="status"
      className="grid grid-cols-1 lg:grid-cols-2 gap-14  md:w-7/12 w-11/12 mx-auto md:py-24 py-32"
    >
      {[...Array(size)].map((_, i) => (
        <div
          key={i}
          className="bg-greenis h-[400px] w-full rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
