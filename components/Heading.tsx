

interface HeadingProps{
    first_text:string,
    second_text:string
}



export default function Heading({ first_text, second_text }: HeadingProps){


    return (
        <div className="w-full flex flex-col sm:flex-row gap-3 lg:gap-6 py-6 px-6">
        <span className="text-4xl md:text-6xl lg:text-7xl font-bold">{first_text}</span>
        <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-900">
          {second_text}
        </p>
      </div>

    )
}