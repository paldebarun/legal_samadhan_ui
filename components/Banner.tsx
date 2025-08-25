
type BannerProps = {
  image: string;
  text: string;
};

export default function BannerComponent({ image, text }: BannerProps) {
  return (
    <section
      className="hero-section relative w-full flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <p className="relative text-white text-center text-3xl md:text-6xl leading-normal font-bold w-7/12">
        {text}
      </p>
    </section>
  );
}
