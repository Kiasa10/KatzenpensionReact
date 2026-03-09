interface CareSectionProps {
  children: React.ReactNode;
  header: string;
  text: string;
}

export default function CareSection({ header, text, children }: CareSectionProps) {
  return (
    <div>
      <h2>{header}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}
