import React from "react";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = (props) => {
  return (
    <div className="p-4 rounded-md max-w-sm mx-auto my-12 border flex flex-col dark:border-white dark:text-white">
      <h1 className="text-xl text-wrap">{props.quote}</h1>
      <p className="text-right text-base text-wrap">~ {props.author}</p>
    </div>
  );
};

export default QuoteCard;
