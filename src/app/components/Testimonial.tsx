interface TestimonialProps {
    quote: string;
    author: string;
  }
  
  export function Testimonial({ quote, author }: TestimonialProps) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="italic mb-4">"{quote}"</p>
        <p className="font-semibold text-right">- {author}</p>
      </div>
    )
  }