type Props = {
  size: number;
};

export default function SkeletonTeams({ size }: Props) {
  return (
    <div
      role="status"
      className="grid grid-cols-1 lg:grid-cols-2 gap-5  md:w-7/12 w-11/12 mx-auto md:py-14 py-32"
    >
      {[...Array(size)].map((_, i) => (
        <div
          key={i}
          className="bg-greenis opacity-25 h-14  w-full rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
